// src/app/book-vip-darshan/book-vip-darshan.component.ts

import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DevoteeService } from '../services/devotee.service';
import { Pipe, PipeTransform } from '@angular/core';
import { RouterModule } from '@angular/router';

@Pipe({
  name: 'time12hr'
})
export class Time12hrPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';
    const [hour, minute] = value.split(':').map(Number);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minute.toString().padStart(2, '0')} ${suffix}`;
  }
}

// ** IMPORTANT **: Import CommonModule, FormsModule, and your Pipe
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { pipe } from 'rxjs';

interface Companion {
  name: string;
  phone: string;
  age: number | null;
}

@Component({
  selector: 'app-book-vip-darshan',
  standalone: true, // <-- Make the component standalone
  imports: [
    Time12hrPipe,
    RouterModule,
    
    CommonModule,    // <-- Import for *ngIf, *ngFor, etc.
    FormsModule,     // <-- Import for [(ngModel)]
         // <-- Import your custom pipe
  ],
  templateUrl: './book-vip-darshan.component.html',
  styleUrls: ['./book-vip-darshan.component.css']
})
export class BookVipDarshanComponent implements OnInit {
  @Input() title = 'Book VIP Darshan (Protocol)';
  @Input() subtitle = 'Select your protocol category to proceed.';
  @Input() sectionTitle = 'Book VIP Darshan';

devoteee_name: string | null = null;

  protocols = [
    { value: 'state-guest-class-1', label: 'State Guest - Class I', fee: 500 },
    { value: 'state-guest-class-2', label: 'State Guest - Class II', fee: 500 },
    { value: 'mp-govt-official', label: 'MP Govt. Official', fee: 500 },
  ];
  slotsFetched = false; // ✅ New flag to show "no slots" only after response
  selectedProtocolValue = '';
  companions: Companion[] = [];
  visitDate = '';
  selectedSlot: any = null;
  authorityLetterFile: File | null = null;
  saveAsDraft = true;
  loading = false;
  bookingSuccess = false;
  bookingId: string | number | null = null;
  slots_data: any[] = [];
  apiError: string | null = null;

  constructor(
    private devoteeService: DevoteeService,
    private router: Router
  ) {}

  // ngOnInit(): void {
    
  //   this.devoteeService.get_profile().subscribe((response: any) => {
  //     if (response && response.message) {
  //       this.devoteee_name = response.message.devoteee_name;
  //     }
  //   });
  // }

  ngOnInit(): void {
  // Load from localStorage (temporary fallback)
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  this.devoteee_name = user.fullName ; // Default for testing

  // Load from API
  this.devoteeService.get_profile().subscribe((response: any) => {
  if (response && response.message && response.message.profile) {
    this.devoteee_name = response.message.profile.devoteee_name || this.devoteee_name;
  }
});

}


  get feePerPerson(): number {
    return this.protocols.find(p => p.value === this.selectedProtocolValue)?.fee ?? 0;
  }

  get total(): number {
    return this.feePerPerson * (1 + this.companions.length);
  }

  addCompanion(): void {
    this.companions.push({ name: '', phone: '', age: null });
  }

  removeCompanion(index: number): void {
    this.companions.splice(index, 1);
  }

onDateChange() {
  console.log('Fetching slots for', this.visitDate);
  this.slotsFetched = false; // reset before new fetch
  this.slots_data = [];

  this.devoteeService.getBookingSlotInfo(this.visitDate).subscribe({
    next: (res) => {
      console.log("Raw slots response:", res);
      this.slots_data = res?.message || [];
      this.slotsFetched = true; // ✅ only set true once response arrives
      console.log("Parsed slot data:", this.slots_data);
    },
    error: (err) => {
      console.error("Error fetching slot info:", err);
      this.slots_data = [];
      this.slotsFetched = true;
    }
  });
}




selectSlot(slot: any): void {
  if (slot.slot_capacity > 0) {
    this.selectedSlot = slot;
    this.apiError = null; // ✅ clear error when slot is chosen
  }
}


  handleFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.authorityLetterFile = (input.files && input.files.length > 0) ? input.files[0] : null;
  }

submitBooking(): void {
  this.apiError = null; // ✅ clear old error first

  if (!this.selectedSlot) {
    this.apiError = 'Please select a slot before booking.';
    return; // stop only if user hasn’t selected slot
  }

  this.loading = true;

  const formattedDate = new Date(this.visitDate).toISOString().split('T')[0];

  const details = {
    appointment_date: formattedDate,
    slot_name: this.selectedSlot.slot_name,
    slot_start_time: this.selectedSlot.slot_start_time,
    slot_end_time: this.selectedSlot.slot_end_time,
    darshan_with_protocol: 1,
    protocol_rank: this.selectedProtocolValue || '',
    government_authority_letter: this.authorityLetterFile,
    darshan_type: 'Vip Darshan',
    darshan_companion: this.companions.map(c => ({
      companion_name: c.name || '',
      companion_phone: c.phone || '',
      companion_age: c.age ?? '',
    })),
    save_as_draft: this.saveAsDraft,
  };

  this.devoteeService.createAppointment(details).subscribe({
    next: (res: any) => {
      console.log('Booking response:', res);
      const appointment = res?.message;

      if (appointment?.name) {
        this.bookingId = appointment.name;
        this.bookingSuccess = true;
      } else {
        this.apiError = res?.message || 'Booking failed. Please try again.';
      }

      this.loading = false;
    },
    error: (err) => {
      this.loading = false;
      this.apiError = 'Something went wrong. Please try again.';
      console.error(err);
    }
  });
}


  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}