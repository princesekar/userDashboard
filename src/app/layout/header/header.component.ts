import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  profile: any;
  userEmail: string | undefined;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail();
    this.fetchUserProfile();
  }


  fetchUserProfile(): void {
    this.http.get<any[]>(this.apiUrl).subscribe(users => {
      this.profile = users.find(user => user.profile.email === this.userEmail); 
      console.log(this.profile)
    });
  }
}
