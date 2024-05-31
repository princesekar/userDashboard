// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('loggedIn'); // Check local storage for logged-in status
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>('/assets/users.json').pipe(
      map((users: any[]) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
          this.loggedIn = true;
          localStorage.setItem('loggedIn', 'true'); // Store login status in local storage
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
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
