import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  profile: any;
  userEmail: string | undefined;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.userEmail = this.authService.getCurrentUserEmail();
  }


  // fetchUserProfile(): Observable<any> {
  //   this.http.get<any[]>(this.apiUrl).subscribe(users => {
  //     this.profile = users.find(user => user.profile.email === this.userEmail); // Ensure profile ID is correctly fetched
  //   });
  // }
}
