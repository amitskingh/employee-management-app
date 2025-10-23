import { Component, inject, ViewChild } from '@angular/core';
import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterLink, RouterOutlet, RouterLinkWithHref, Router } from '@angular/router';
import { StorageService } from '../../services/storage-service';

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
      link: 'employee-list',
      icon: 'list',
    },
    {
      name: 'Add Employee',
      link: 'create-employee',
      icon: 'add',
    },
    {
      name: 'Logout',
      link: 'login',
      icon: 'logout',
    },
  ];

  close(reason: string) {
    this.reason = reason;
    this.sidenav.close();
  }

  storageService = inject(StorageService);

  handleRouting(routeLink: string) {
    if (routeLink === 'login') {
      this.storageService.removeItem('token');
    }

    console.log(routeLink);
    this.router.navigate([routeLink]);
    this.close('close');
  }
}
