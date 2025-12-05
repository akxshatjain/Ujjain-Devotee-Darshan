import { Component, OnInit } from '@angular/core';
import { DevoteeService } from '../services/devotee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports:[CommonModule],
  selector: 'app-user-view-profile',
  templateUrl: './user-view-profile.component.html',
  styleUrls: ['./user-view-profile.component.css']
})
export class UserViewProfileComponent implements OnInit {
  profile: any = null;
  loading = true;
  error: string | null = null;

  constructor(private devoteeService: DevoteeService, private router: Router) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  async loadProfile() {
    try {
      const res: any = await this.devoteeService.getSelfProfile().toPromise();
      // API structure: res.message.profile
      this.profile = res.message?.profile || null;
    } catch (e) {
      console.error(e);
      this.error = 'Failed to load profile';
    } finally {
      this.loading = false;
    }
  }

  truthyInt(v: any) {
    return Number(v) === 1;
  }

  updateProfile() {
    this.router.navigate(['dashboard/updateprofile']);
  }
    encodeURIComponentSafe(value: string): string {
    return encodeURIComponent(value || '');
  }
}
