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
    this.showNavbar('header-toggle', 'nav-bar', 'body-pd', 'header');
    this.initLinkColor();
  }
  logout(): void {
    this.authService.logout();
    // this.router.navigate(['/login']);
  }
  showNavbar(toggleId: string, navId: string, bodyId: string, headerId: string): void {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);
    const bodypd = document.getElementById(bodyId);
    const headerpd = document.getElementById(headerId);

    if (toggle && nav && bodypd && headerpd) {
      toggle.addEventListener('click', () => {
        // show navbar
        nav.classList.toggle('show');
        // change icon
        toggle.classList.toggle('bx-x');
        // add padding to body
        bodypd.classList.toggle('body-pd');
        // add padding to header
        headerpd.classList.toggle('body-pd');
      });
    }
  }

  initLinkColor(): void {
    const linkColor = document.querySelectorAll('.nav_link');
    
    function colorLink(this: HTMLElement) {
      if (linkColor) {
        linkColor.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    }
    
    linkColor.forEach(l => l.addEventListener('click', colorLink));
  }
}
