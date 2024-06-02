import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profile: any;
  isEditing: boolean = false;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.sharedService.fetchUserProfile().subscribe({
      next: (profile) => {
        this.profile = profile;
        console.log(profile, 'fetched profile');
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
      }
    });
  }

  saveProfile(): void {
    if (this.isEditing == true) {
      this.sharedService.updateUserProfile(this.profile, this.profile.id).subscribe({
        next: (response) => {
          console.log('Profile updated successfully:', response);
          this.isEditing = false; // Move isEditing assignment here
        },
        error: (error) => {
          console.error('Error updating profile:', error);
        }
      });
    }
  }

  editProfile() {
    this.isEditing = !this.isEditing;
  }
}
