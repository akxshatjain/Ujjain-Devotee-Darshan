import { Routes } from '@angular/router';
import { DarshanBookingComponent } from './darshan-booking/darshan-booking.component';
import { DevoteeRegistrationComponent } from './devotee-registration/devotee-registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookVipDarshanComponent } from './book-vip-darshan/book-vip-darshan.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { UserUpdateProfileComponent } from './user-update-profile/user-update-profile.component';
import { UserViewProfileComponent } from './user-view-profile/user-view-profile.component';
import { LoginVerifyComponent } from './login-verify/login-verify.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './services/auth.guard'; // import your AuthGuard

export const routes: Routes = [
  // Public routes
  { path: 'loginverify', component: LoginVerifyComponent },
  { path: 'verifylogin', component: LoginVerifyComponent },
  { path: 'loginverify', loadComponent: () => import('./login-verify/login-verify.component').then(m => m.LoginVerifyComponent) },
  { path: 'registration', component: DevoteeRegistrationComponent },
  { path: 'homepage', component: HomepageComponent },

  // Private routes (guarded by AuthGuard)
  { path: 'userdashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/vipdarshan', component: BookVipDarshanComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/mybookings', component: MyBookingsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/updateprofile', component: UserUpdateProfileComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/viewprofile', component: UserViewProfileComponent, canActivate: [AuthGuard] },
  { path: 'darshan-booking', component: DarshanBookingComponent, canActivate: [AuthGuard] },

  // Fallback route
  { path: '**', redirectTo: '/homepage' }  
];
