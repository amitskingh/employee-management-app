import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../models/employee';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  imports: [RouterLink, MatCardModule, MatButtonModule, MatIcon, MatListModule, MatChipsModule, TitleCasePipe],
  templateUrl: './employee-detail.html',
  styleUrl: './employee-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetail {
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute) {}

  employee!: Employee;

  ngOnInit() {
    let employeeId: string = '';
    this.route.params.subscribe((params) => {
      employeeId = params['id'];
      console.log('Id: ', employeeId);
    });

    if (employeeId !== '') {
      // this.employee = this.employeeService.getEmployeeById(employeeId) as Employee;

      this.employeeService.getEmployeeById(employeeId).subscribe({
        next: (data: Employee) => {
          this.employee = data;
        },
        error: (error: any) => {
          console.error('error fetching employee list:', error);
        },
        complete: () => {
          console.log('employee list fetch complete.');
        },
      });

      console.log(this.employee);
    }
  }
}
