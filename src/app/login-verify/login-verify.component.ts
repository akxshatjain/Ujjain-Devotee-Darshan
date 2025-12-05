import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DevoteeService } from '../services/devotee.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-login-verify',
  templateUrl: './login-verify.component.html',
  styleUrls: ['./login-verify.component.css'],
})
export class LoginVerifyComponent implements OnInit {
  phone: string = '';
  temp_pwd: string = 'Mpsedc123';
  user_type: string = 'Devoteee';
  loading: boolean = false;

  constructor(
    private devoteeService: DevoteeService,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const storedPhone = localStorage.getItem('Mphone');
    if (storedPhone) this.phone = storedPhone;
  }

async loginVerifyAction() {
    // 💡 Add basic validation before making API call
    if (!this.phone) {
        this.toastr.error('Please enter your phone number.');
        return;
    }

    this.loading = true;
    try {
        // Change from .toPromise() to lastValueFrom
        const res: any = await lastValueFrom(
            this.devoteeService.getAuthToken(this.phone)
        );

        if (res?.message?.token) {
            const token = res.message.token;

            // 💡 Ensure authService.login updates the state correctly
            this.authService.login(this.phone, this.user_type, token);
            
            // 💡 Your Svelte code sets user_logged_in.set(true) and then navigates.
            //    The Angular equivalent is done in this.authService.login().
            
            this.toastr.success('Login successful');

            // 💡 Navigation path should match your Svelte logic's goto("/dashboard")
            //    if /userdashboard is the correct Angular route.
            await this.router.navigate(['/userdashboard']);
        } else {
            // Log the full response for better debugging
            console.error('API response on failure:', res); 
            this.toastr.error('Login failed - invalid phone or no token received');
        }
    } catch (err: any) {
        // Network/server error handling
        console.error('Login error:', err);
        this.toastr.error('Login failed - network/server error');
    } finally {
        this.loading = false;
    
}
}
}
