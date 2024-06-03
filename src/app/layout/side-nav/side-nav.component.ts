import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
   
  }
  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
 
}
