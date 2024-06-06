import { Component, OnInit } from '@angular/core'
import { SharedService } from '../shared.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  profile: any;

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
}
