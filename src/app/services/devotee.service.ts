import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './auth.service';



@Injectable({
  providedIn: 'root',
})
export class DevoteeService {

  // ✅ CHANGE URL HERE ONLY
  private BASE_URL = 'http://10.120.10.245:8890/';

  private loggedInSubject = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private auth: AuthService) {
    this.loggedInSubject.next(this.auth.isLoggedIn());
  }

  /** ---------------- UTIL ---------------- **/
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const csrf = this.getCookie('csrf_token');
    if (csrf) headers = headers.set('X-Frappe-CSRF-Token', csrf);

    const authToken = this.auth.getToken();
    if (authToken) {
      headers = headers.set('Authorization', `token ${authToken}`);
    }
    return headers;
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  /** ---------------- LOGIN ---------------- **/
  getAuthToken(phone: string): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.session_login.session_login.get_auth_token`;
    const body = { phone: phone + '' };
    return this.http.post(url, body, {
      withCredentials: true,
    });
  }

  /** ---------------- PROFILE ---------------- **/
  getSelfProfile(): Observable<any> {
    return this.get_profile();
  }

  get_profile(): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.get_self_profile`;
    return this.http.post(url, {}, {
      headers: this.getHeaders(),
    });
  }

  updateProfile(info: any): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.update_profile`;
    return this.http.post(url, { info }, { headers: this.getHeaders() });
  }

  registrationDevotee(phone: number): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.create_devoteee_user`;
    const body = { phone: phone + '' };
    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }

  /** ---------------- BOOKINGS ---------------- **/
  getMyBookings(limitStart = 0, pageLength = 10): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.get_appointment_list`;
    const body = { limitStart, pageLength };
    return this.http.post(url, body, {
      headers: this.getHeaders(),
    });
  }

  getBookingSlotInfo(slot_date: string): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.get_slot_occupancy_info`;
    const body = { slot_date };
    return this.http.post(url, body, {
      headers: this.getHeaders(),
    });
  }

  createAppointment(details: any): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.create_appointment`;
    return this.http.post(url, { info: details }, {
      headers: this.getHeaders(),
    });
  }

  getBookingDetails(appointmentId: string): Observable<any> {
    const url = `${this.BASE_URL}/api/method/mahakaal.darshan_booking.doctype.darshan_devoteee_profile.darshan_devoteee_profile.get_appointment`;
    const body = { appointment_id: appointmentId };
    return this.http.post(url, body, {
      headers: this.getHeaders(),
    });
  }

  /** ---------------- LOGIN STATE ---------------- **/
  checkLoggedIn(): void {
    this.loggedInSubject.next(this.auth.isLoggedIn());
  }

  logoutUser(): void {
    this.auth.logout();
    this.loggedInSubject.next(false);
  }
}
