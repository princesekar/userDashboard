// auth.service.ts
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient) {
      // Check local storage for logged-in status
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>('http://localhost:3000/users').pipe(
      map((users: any[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.loggedIn = true;
          localStorage.setItem('loggedIn', 'true'); // Store login status in local storage
          localStorage.setItem('currentUserEmail', email);
          return true;
        }
        return false;
      }),
      catchError(() => of(false))
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('loggedIn'); // Remove login status from local storage
    localStorage.removeItem('currentUserEmail');
  }

  isLoggedIn(): boolean {
    // Check local storage for logged-in status
    let loggedIn = localStorage.getItem('loggedIn') == 'true' ? true : false;
    return loggedIn;
  }

  getCurrentUserEmail(): any {
    return localStorage.getItem('currentUserEmail');
  }
}
