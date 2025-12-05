import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevoteeService } from '../services/devotee.service'; // same service where get_profile is defined
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

interface ProfileDetails {
  devoteee_name?: string;
  is_ekyc_complete?: number;
  [key: string]: any;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  title = 'Dashboard';
  welcome = 'Welcome back!';
  devoteee_details: ProfileDetails | null = null;
  devoteee_name = '';
  is_ekyc_complete = 0;
  show_dashboard = false;

  defaultActions = [
    { id: 'myProfile', label: 'My Profile', site: '/dashboard/viewprofile', button_color: 'green' },
    { id: 'viewBookings', label: 'View Bookings', site: '/dashboard/mybookings', button_color: 'blue' },
    { id: 'bookVip', label: 'Book - VIP Darshan', site: '/dashboard/vipdarshan', button_color: 'blue' },
    { id: 'bookShigra', label: 'Book - Shigra Darshan', site: '/dashboard/shigra', button_color: 'gray' },
    { id: 'bookLocalide', label: 'Book - Localide Darshan', site: '/dashboard/localide', button_color: 'gray' },
    { id: 'bookBhasm', label: 'Book - Bhasm Arti', site: '/dashboard/bhasmarti', button_color: 'gray' }
  ];

  constructor(
    private router: Router, 
    private devoteeService: DevoteeService,
    private authService: AuthService  // <-- add this

  
  ) {}

async ngOnInit() {
  console.log('Devotee name value before API call:', this.devoteee_name);

  try {
    this.devoteeService.checkLoggedIn();

    const res: any = await this.devoteeService.get_profile().toPromise();
    console.log('Raw profile response:', res);

    if (res?.message?.profile) {
      this.show_dashboard = true;
      this.devoteee_name = res.message.profile.devoteee_name || '';
      this.is_ekyc_complete = res.message.profile.is_ekyc_complete || 0;
    }

    console.log('Devotee name value after API call:', this.devoteee_name);
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
}



  onActionClicked(site?: string) {
    if (site) this.router.navigate([site]);
  }

  completeKYC() {
    this.router.navigate(['dashboard/updateprofile']);
  }
 

  logout() {
    this.devoteeService.logoutUser();
    localStorage.clear();
    this.authService.logout();  // resets the login flag and clears localStorage
    this.router.navigate(['/login']);
  }
}
