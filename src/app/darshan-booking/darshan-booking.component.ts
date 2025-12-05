import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from '../app.component';
import { CommonModule } from '@angular/common';

@NgModule({

  imports: [CommonModule, FormsModule],
})
export class SomeModule {}

type Booking = {
  id: string;
  type: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: string;
  isUpcoming: boolean;
};

@Component({
  standalone: true,  
  imports: [CommonModule, FormsModule ],    
  selector: 'app-darshan-booking',
  templateUrl: './darshan-booking.component.html',
  styleUrls: ['./darshan-booking.component.css']
})
export class DarshanBookingComponent implements OnInit {
  // View toggles
  view: 'registration' | 'login' | 'dashboard' | 'bookings' | 'shigra' | 'vip' | 'localide' | 'bhasm' = 'registration';

  // Registration / login / progress
  mobile = '';
  mobileError = false;
  loginMobile = '';
  progressBarWidth = '33.33%';

  // Registration details
  fullname = '';
  gender = '';
  dob = '';
  address = '';

  // Dashboard & booking navigation
  userData = {
    fullName: 'Jane Doe',
    mobile: '9876543210'
  };

  // Booking data
  bookings: Booking[] = [
    { id: '123456', type: 'Shigra Darshan', date: '2025-12-25', time: '10:30 AM', status: 'Approved', isUpcoming: true },
    { id: '789012', type: 'Localide Darshan', date: '2024-05-10', time: '02:00 PM', status: 'Completed', isUpcoming: false },
    { id: '345678', type: 'Bhasm Arti', date: '2025-11-01', time: '04:00 AM', status: 'Pending', isUpcoming: true },
    { id: '901234', type: 'VIP Darshan', date: '2025-10-01', time: '12:00 PM', status: 'Approved', isUpcoming: true },
  ];

  // Shigra
  companionCount = 0;
  maxCompanions = 10;
  shigraPrice = 250;
  shigraVisitDate = '';
  shigraSlotsVisible = false;
  selectedShigraSlot = '';

  // VIP
  vipCompanions: { name: string }[] = [];
  vipPrice = 500;
  vipVisitDate = '';
  vipProtocol = '';
  vipPaymentMessageVisible = false;
  vipPaymentErrorVisible = false;
  vipBookingId = '';

  // Localide
  localideCompanions: { name: string }[] = [];
  localideVisitDate = '';
  localideSlotsVisible = false;
  localideVisitTime = '';
  localideEkycComplete = false; // primary eKYC status
  localideBookingId = '';

  // Bhasm Arti
  bhasmArtiCompanions: { name: string }[] = [];
  bhasmArtiVisitDate = '';
  bhasmArtiSlotsVisible = false;
  bhasmArtiEkycComplete = false;
  bhasmArtiBookingId = '';

  constructor() {}

  ngOnInit(): void {
    this.showRegistration();
  }

  // ---------- Views ----------
  hideAll() {
    // managed by 'view' variable
  }

  showRegistration() {
    this.view = 'registration';
    this.progressBarWidth = '33.33%';
    this.mobile = '';
    this.mobileError = false;
  }

  showLogin() {
    this.view = 'login';
    this.loginMobile = '';
  }

  showDashboard() {
    this.view = 'dashboard';
  }

  showBookingsView() {
    this.view = 'bookings';
  }

  showShigraDarshanView() {
    this.view = 'shigra';
    // reset small state if needed
    this.shigraSlotsVisible = false;
    this.selectedShigraSlot = '';
  }

  showVipDarshanView() {
    this.view = 'vip';
    this.vipCompanions = [];
    this.vipVisitDate = '';
    this.vipProtocol = '';
    this.vipPaymentMessageVisible = false;
    this.vipPaymentErrorVisible = false;
    this.vipBookingId = '';
  }

  showLocalideDarshanView() {
    this.view = 'localide';
    this.localideCompanions = [];
    this.localideVisitDate = '';
    this.localideSlotsVisible = false;
    this.localideVisitTime = '';
    // eKYC badge visible via localideEkycComplete
  }

  showBhasmArtiView() {
    this.view = 'bhasm';
    this.bhasmArtiCompanions = [];
    this.bhasmArtiVisitDate = '';
    this.bhasmArtiSlotsVisible = false;
    this.bhasmArtiBookingId = '';
  }

  // ---------- Registration & Login ----------
  onNextStep1() {
    if (this.mobile && this.mobile.length >= 10 && /^\d+$/.test(this.mobile)) {
      this.userData.mobile = this.mobile;
      this.mobileError = false;
      // go to step 2
      this.progressBarWidth = '66.66%';
      // In the template we show step 2 by conditional rendering
    } else {
      this.mobileError = true;
    }
  }

  skipEvkyc() {
    // show step 3
    this.progressBarWidth = '100%';
  }

  completeRegistration() {
    if (!this.fullname || !this.gender || !this.dob || !this.address) {
      // simple feedback: set a heading or console error - we'll use console
      console.error('Please fill all required registration fields.');
      return;
    }
    this.userData.fullName = this.fullname;
    this.showDashboard();
  }

  login() {
    if (!this.loginMobile || this.loginMobile.length < 10) {
      console.error('Invalid mobile number for login.');
      return;
    }
    this.userData.mobile = this.loginMobile;
    this.showDashboard();
  }

  logout() {
    this.showLogin();
  }

  // ---------- Bookings Rendering Helpers ----------
  get upcomingBookings() {
    const today = new Date().toISOString().split('T')[0];
    return this.bookings.filter(b => b.isUpcoming && b.date >= today);
  }

  get pastBookings() {
    const today = new Date().toISOString().split('T')[0];
    return this.bookings.filter(b => !b.isUpcoming || b.date < today);
  }

  // ---------- VIP Companion Management ----------
  addVipCompanion() {
    if (this.vipCompanions.length >= this.maxCompanions) return;
    this.vipCompanions.push({ name: '' });
  }

  removeVipCompanion(index: number) {
    this.vipCompanions.splice(index, 1);
  }

  calculateVipTotal(): string {
    const totalPeople = this.vipCompanions.length + 1;
    const totalAmount = totalPeople * this.vipPrice;
    return `₹${totalAmount}`;
  }

  // ---------- VIP Complete Booking ----------
  completeVipBooking() {
    this.vipPaymentErrorVisible = false;
    if (!this.vipProtocol || !this.vipVisitDate) {
      this.vipPaymentErrorVisible = true;
      console.error('Please select a protocol and a date.');
      return;
    }
    // ensure companion names filled
    const allFilled = this.vipCompanions.every(c => c.name && c.name.trim().length > 0);
    if (!allFilled) {
      this.vipPaymentErrorVisible = true;
      console.error('Please fill all companion full names.');
      return;
    }

    const bookingId = this.randomBookingId();
    this.vipBookingId = bookingId;
    this.vipPaymentMessageVisible = true;

    this.bookings.push({
      id: bookingId,
      type: 'VIP Darshan (Protocol)',
      date: this.vipVisitDate,
      time: 'Flexible Time',
      status: 'Pending Verification',
      isUpcoming: true
    });

    // disable further VIP booking action by clearing protocol (UI shows message)
    this.vipProtocol = '';
  }

  // ---------- Localide ----------
  addLocalideCompanion() {
    if (this.localideCompanions.length >= this.maxCompanions) return;
    this.localideCompanions.push({ name: '' });
  }

  removeLocalideCompanion(index: number) {
    this.localideCompanions.splice(index, 1);
  }

  // simulate completing eKYC for localide
  completeLocalideEkyc() {
    this.localideEkycComplete = true;
  }

  completeLocalideBooking() {
    if (!this.localideEkycComplete) {
      console.error('eKYC required for Localide booking.');
      return;
    }
    if (!this.localideVisitDate || !this.localideVisitTime) {
      console.error('Select date and slot.');
      return;
    }
    const id = this.randomBookingId();
    this.localideBookingId = id;
    this.bookings.push({
      id,
      type: 'Localide Darshan',
      date: this.localideVisitDate,
      time: this.localideVisitTime,
      status: 'Approved',
      isUpcoming: true
    });
  }

  // ---------- Bhasm Arti ----------
  addBhasmArtiCompanion() {
    if (this.bhasmArtiCompanions.length >= this.maxCompanions) return;
    this.bhasmArtiCompanions.push({ name: '' });
  }

  removeBhasmArtiCompanion(index: number) {
    this.bhasmArtiCompanions.splice(index, 1);
  }

  completeBhasmEkyc() {
    this.bhasmArtiEkycComplete = true;
  }

  completeBhasmArtiBooking() {
    if (!this.bhasmArtiEkycComplete || !this.bhasmArtiVisitDate) {
      console.error('eKYC & date required for Bhasm Arti.');
      return;
    }
    const id = this.randomBookingId();
    this.bhasmArtiBookingId = id;
    this.bookings.push({
      id,
      type: 'Bhasm Arti',
      date: this.bhasmArtiVisitDate,
      time: '04:00 AM',
      status: 'Confirmed',
      isUpcoming: true
    });
  }

  // ---------- Utilities ----------
  randomBookingId() {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }

  bookShigraDarshan() {
  this.bookings.push({
    id: this.randomBookingId(),
    type: 'Shigra Darshan',
    date: this.shigraVisitDate || new Date().toISOString().split('T')[0],
    time: this.selectedShigraSlot || 'Flexible Time',
    status: 'Pending',
    isUpcoming: true
  });
  this.showDashboard();
}

  Math = Math; // <-- expose Math to template

  generateBookingId(): string {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
