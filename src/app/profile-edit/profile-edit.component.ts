// profile-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  profile: any;
  userEmail: string | undefined;

  constructor(private authService: AuthService, private http: HttpClient) {}

  ngOnInit(): void {
    // this.userEmail = this.authService.getCurrentUserEmail(); // Get current user's email
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.http.get<any[]>('/assets/users.json').subscribe(users => {
      this.profile = users.find(user => user.email === this.userEmail);
    });
  }

  saveProfile(): void {
    this.http.get<any[]>('/assets/users.json').subscribe(users => {
      const updatedUsers = users.map(user => {
        if (user.email === this.userEmail) {
          return this.profile;
        }
        return user;
      });
      this.http.put('/assets/users.json', updatedUsers).subscribe(() => {
        // Optionally handle success or error responses
      });
    });
  }
}