import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, catchError, map, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  profile: any;
  userEmail: string | undefined;
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {

  }

  updateUserProfile(profile: any, profileId: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${profileId}`, profile);
  }

  fetchUserProfile(): Observable<any> {
    this.userEmail = this.authService.getCurrentUserEmail();
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => user.email === this.userEmail))
    );
  }
}
