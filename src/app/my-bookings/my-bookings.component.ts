import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevoteeService } from '../services/devotee.service';

interface Booking {
  name: string;
  darshan_type?: string;
  darshan_date?: string;
  slot_start_time?: string;
  slot_end_time?: string;
  workflow_state: string;
  devotee_profile?: string;
  devoteee_name?: string;
  with_protocol?: number;
  protocol_rank?: string;
  group_size?: number;
  appointment_id?: string;
  appointment_type?: string;
  appointment_date?: string;
  companions?: {
    name?: string;
    companion_name?: string;
    companion_gender?: string;
    companion_phone?: string;
    companion_age?: number;
    gender?: string;
    mobile?: string;
    age?: number;
  }[];
}




@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  heading = 'My Bookings';
  subtitle = 'View your darshan bookings.';
  sectionTitle = 'My Bookings';

  bookings: Booking[] = [];
  loading = false;
  loadingDetails = false;
  error: string | null = null;

  showDetails = false;
  selectedBooking: Booking | null = null;

  limitStart = 0;
  pageLength = 10;

  constructor(private devoteeService: DevoteeService) {}

  ngOnInit(): void {
    this.fetchBookings();
  }

  badgeClass(status: string): string {
    switch (status) {
      case 'Approved':
        return 'bg-green-600';
      case 'Pending':
        return 'bg-orange-500';
      case 'Pending Verification':
        return 'bg-blue-500';
      default:
        return 'bg-gray-400';
    }
  }

fetchBookings(): void {
  this.loading = true;
  this.error = null;

  this.devoteeService
    .getMyBookings(this.limitStart, this.pageLength)
    .subscribe({
      next: (res: any) => {
        this.bookings = res?.message || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load bookings', err);
        this.loading = false;
        this.error = 'Failed to load bookings.';
      },
    });
}


openDetails(b: Booking): void {
  console.log('Opening details for:', b);

  this.showDetails = true;
  this.loadingDetails = true;

  this.devoteeService.getBookingDetails(b.name).subscribe({
    next: (res: any) => {
      console.log("📥 Booking details response:", res);

      const data = res?.message || res;

      // ✅ Normalize keys so template works
      this.selectedBooking = {
        ...data,
        companions: data.darshan_companion || [],   // Frappe → Angular
        with_protocol: data.darshan_with_protocol === 1, // Convert 1/0 → boolean
        devoteee_name: data.primary_devoteee_name,  // Frappe → Angular name
        darshan_type: data.appointment_type,        // Match naming pattern
        darshan_date: data.appointment_date || data.creation?.split(" ")[0], // Fallback
      };

      console.log("✅ Normalized booking:", this.selectedBooking);
      this.loadingDetails = false;
    },
    error: (err) => {
      console.error('❌ Error fetching booking details:', err);
      this.loadingDetails = false;
    }
  });
}





  closeDetails(): void {
    this.showDetails = false;
    this.selectedBooking = null;
  }
}
