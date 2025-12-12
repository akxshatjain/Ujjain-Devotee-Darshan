import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = false;
  private tokenKey = 'auth_token';

  constructor(private router: Router, private toastr: ToastrService) {
    const flag = localStorage.getItem('loggedInFlag');
    this.loggedIn = flag === 'true';
  }

  login(phone: string, userType: string, token: string): void {
    
    const cleanToken = token.startsWith('token ')
      ? token.replace('token ', '')
      : token;

    localStorage.setItem('Mphone', phone);
    localStorage.setItem('Muser_type', userType);
    localStorage.setItem('loggedInFlag', 'true');
    localStorage.setItem(this.tokenKey, cleanToken);
    this.loggedIn = true;
    window.dispatchEvent(new Event('auth-status-changed'));  // ⭐ NEW

  }

  logout(): void {
    // 🔥 Clear local storage
    localStorage.removeItem('Mphone');
    localStorage.removeItem('Muser_type');
    localStorage.removeItem('loggedInFlag');
    localStorage.removeItem(this.tokenKey);
    this.loggedIn = false;

    // ✅ Show green toastr notification
    this.toastr.success('Logged out successfully',"", {
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing',
    });

    // ✅ Navigate back to home
    window.dispatchEvent(new Event('auth-status-changed'));
    this.router.navigate(['/']);

  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
