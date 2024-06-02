import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profile: any;
  userEmail: string | undefined;
  isEditing: boolean = false;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail(); // Get current user's email
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      this.profile = users.find(user => user.profile.email === this.userEmail);
      console.log(this.profile.id); // Ensure profile ID is correctly fetched
    });
  }

  updateUserProfile(profile: any): Observable<any> {
    console.log(this.profile.id); // Ensure profile ID is correctly logged
    return this.http.put<any>(`${this.apiUrl}/${this.profile.id}`, profile);
  }

  saveProfile(): void {
    this.updateUserProfile(this.profile).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
      },
      (error) => {
        console.error('Error updating profile:', error);
      }
    );

    this.isEditing = false;
  }

  editProfile(){
    this.isEditing = !this.isEditing;
  }
}
