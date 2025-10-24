import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-dashboard',
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    RouterOutlet,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  router = inject(Router);

  @ViewChild('sidenav') sidenav!: MatSidenav;

  reason = '';

  navLinks = [
    {
      name: 'Employee List',
      link: 'employees',
      icon: 'list',
      role: ['admin', 'sub_admin'],
    },
    {
      name: 'Add Employee',
      link: 'employees/add',
      icon: 'add',
      role: ['admin'],
    },
    {
      name: 'Logout',
      link: 'login',
      icon: 'logout',
      role: ['admin', 'sub_admin'],
    },
  ];

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  authService = inject(AuthService);

  handleRouting(routeLink: string) {
    if (routeLink === 'login') {
      this.authService.logoutUser();
    }

    console.log(routeLink);
    this.router.navigate([routeLink]);
    this.close('close');
  }

  getUserRole() {
    return this.authService.getUserRole();
  }

  checkRole(role: string[]) {
    return role.includes(this.authService.getUserRole());
  }
}
