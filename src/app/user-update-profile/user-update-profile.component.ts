import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule , Validators } from '@angular/forms';
import { DevoteeService } from '../services/devotee.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  imports:[CommonModule,ReactiveFormsModule ],
  selector: 'app-user-update-profile',
  templateUrl: './user-update-profile.component.html',
  styleUrls: ['./user-update-profile.component.css']
})
export class UserUpdateProfileComponent implements OnInit {

  profileForm!: FormGroup;
  profileData: any = null;
  submitted = false;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private devoteeService: DevoteeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      devoteee_name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      address: [''],
      aadhar: ['']
    });

    this.loadProfile();
  }

 loadProfile(): void {
  this.devoteeService.getSelfProfile().subscribe({
    next: (res) => {
      // Save the actual profile object
      this.profileData = res.message?.profile;

      if (this.profileData) {
        this.profileForm.patchValue({
          devoteee_name: this.profileData.devoteee_name || '',
          gender: this.profileData.gender || '',
          dob: this.profileData.dob || '',
          address: this.profileData.address || '',
          aadhar: this.profileData.aadhar || ''
        });
      }
    },
    error: (err) => console.error('Failed to load profile:', err)
  });
}



  handleSubmit(): void {
    if (this.profileForm.invalid) return;
    this.loading = true;

    

    const info = this.profileForm.value;
    if (info.devoteee_name && info.dob) {
    info.is_ekyc_complete = 1;
      }


    this.devoteeService.updateProfile(info).subscribe({
      next: (res) => {
        this.loading = false;
        this.submitted = true;
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
      }
    });
  }

  resetForm(): void {
    if (!this.profileData) return;
    this.profileForm.patchValue({
      devoteee_name: this.profileData.devoteee_name || '',
      gender: this.profileData.gender || '',
      dob: this.profileData.dob || '',
      address: this.profileData.address || '',
      aadhar: this.profileData.aadhar || ''
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/userdashboard']);
  }
}
