import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DevoteeService } from '../services/devotee.service'; // ✅ service exists now

@Component({
  selector: 'app-devotee-registration',
  standalone: true,  // must be standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './devotee-registration.component.html',
  styleUrls: ['./devotee-registration.component.css']
})
export class DevoteeRegistrationComponent {
  phone: string = '';
  loading: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private devoteeService: DevoteeService  // ✅ injectable now
  ) {}

registerDevotee(event?: Event) {
  event?.preventDefault();
  this.loading = true;

  this.devoteeService.registrationDevotee(Number(this.phone)).subscribe({
    next: (res: any) => {
      console.log('✅ Registration Response:', res);

      if (res?.message?.err) {
        this.toastr.error(res.message.err, 'Registration Failed');
      } else {
        this.toastr.success('Registration successful!', 'Welcome');
        this.router.navigate(['/verifylogin']); // ✅ go to login/verify page
      }
      this.loading = false;
    },
    error: (err) => {
      console.error('❌ Registration error:', err);
      this.toastr.error('Something went wrong. Please try again.');
      this.loading = false;
    },
  });
}

}
