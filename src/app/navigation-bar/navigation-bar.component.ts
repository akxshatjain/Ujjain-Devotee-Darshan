import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DevoteeService } from '../services/devotee.service'; // Adjust path
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  menuOpen = false;
  userLoggedIn$: Observable<boolean>;

  constructor(private location: Location, private devoteeService: DevoteeService) {
    this.userLoggedIn$ = this.devoteeService.loggedIn$;
  }

 ngOnInit() {
    // Simply call the method; service handles the subscription internally
    this.devoteeService.checkLoggedIn();
  }

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }

  logout() {
    this.devoteeService.logoutUser();
  }
}
