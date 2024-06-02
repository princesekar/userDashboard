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

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
    this.sharedService.fetchUserProfile().subscribe(
      profile => {
        this.profile = profile;
        console.log(profile, 'fetched profile');
      },
      error => {
        console.error('Error fetching profile:', error);
      }
    );
  }

}
