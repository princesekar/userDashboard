import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({});
  submitted = false;
  errorMessage: string = ''; // Initialize with an empty string

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['user1@example.com', [Validators.required, Validators.email]],
      password: ['prince', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    
    // Stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Perform login logic here
    this.login();
  }

  login(): void {
    const email = this.loginForm.controls['email'].value;
    const password = this.loginForm.controls['password'].value;

    this.authService.login(email, password).subscribe(success => {
      if (success) {
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
