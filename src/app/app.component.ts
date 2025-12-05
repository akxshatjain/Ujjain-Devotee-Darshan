import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DarshanBookingComponent } from './darshan-booking/darshan-booking.component';
import { DevoteeRegistrationComponent } from './devotee-registration/devotee-registration.component';
import { LoginVerifyComponent } from './login-verify/login-verify.component';
import { Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';



@Component({
  selector: 'app-root',
  standalone: true,
 imports: [
  CommonModule,
  FormsModule,
  NavigationBarComponent,
  RouterOutlet
]
,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ujjain-darshan';
}
