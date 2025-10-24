import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Department, Designation, Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee-service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../services/employee-service';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    TitleCasePipe,
    UpperCasePipe,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './employee-form.html',
  styleUrls: ['./employee-form.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeForm {
  private fb = inject(FormBuilder);

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {}

  employee!: Employee;

  ngOnInit() {
    let employeeId: string | undefined = undefined;
    this.route.params.subscribe((params) => {
      employeeId = params['id'];
      console.log('Id: ', employeeId);
    });

    if (employeeId !== undefined) {
      // this.employee = this.employeeService.getEmployeeById(employeeId) as Employee;

      this.employeeService.getEmployeeById(employeeId).subscribe({
        next: (data: Employee) => {
          this.employee = data;
          this.fillEmployeeForm();
        },
        error: (error: any) => {
          console.error('error fetching employee list:', error);
        },
        complete: () => {
          console.log('employee list fetch complete.');
        },
      });

      this.fillEmployeeForm();
    }
  }

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar(messphone: string) {
    this._snackBar.open(messphone, 'close', {
      duration: this.durationInSeconds * 1000,
    });
  }

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
    department: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    salary: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(1000000),
    ]),
    date_of_joining: this.fb.control<Date>(new Date(), [Validators.required]),
    status: [true, [Validators.required]],
    address: [''],
  });

  fillEmployeeForm() {
    const convertDate = (date: string) => {
      const dateArray = date.split('-');
      return new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]));
    };

    console.log(this.employee);

    // Use patchValue for all simple form controls
    this.employeeForm.patchValue({
      name: this.employee.name,
      phone: this.employee.phone,
      department: this.employee.department,
      email: this.employee.email,
      designation: this.employee.designation,
      salary: this.employee.salary,
      status: this.employee.status,
      date_of_joining: convertDate(this.employee.date_of_joining),
      address: this.employee.address,
    });
  }

  formatInputDate(date: Date) {
    return date.toISOString().slice(0, 10);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    if (this.employeeForm.valid) {
      if (this.employee?.id) {
        const newEmployee = new Employee(
          this.employee.id,
          this.employeeForm.value.name as string,
          this.employeeForm.value.email as string,
          this.employeeForm.value.phone as string,
          this.employeeForm.value.department as Department,
          this.employeeForm.value.designation as Designation,
          this.employeeForm.value.salary as number,
          this.formatInputDate(this.employeeForm.value.date_of_joining as Date),
          this.employeeForm.value.status as boolean,
          this.employeeForm.value.address as string
        );

        console.log('SUBMIT: ', newEmployee);

        // this.employeeService.updateEmployeeById(this.employee.id, newEmployee);

        this.employeeService.updateEmployeeById(this.employee.id, newEmployee).subscribe({
          next: (data: Employee) => {
            this.employee = data;
          },
          error: (error: any) => {
            console.error('error while updating employee:', error);
          },
          complete: () => {
            console.log('employee update complete.');
          },
        });

        this.openSnackBar(`Employee: ${newEmployee.name}, updated successfully`);
      } else {
        const newEmployee: User = {
          name: this.employeeForm.value.name as string,
          email: this.employeeForm.value.email as string,
          phone: this.employeeForm.value.phone as string,
          department: this.employeeForm.value.department as Department,
          designation: this.employeeForm.value.designation as Designation,
          salary: this.employeeForm.value.salary as number,
          date_of_joining: this.formatInputDate(this.employeeForm.value.date_of_joining as Date),
          status: this.employeeForm.value.status as boolean,
          address: this.employeeForm.value.address as string,
        };

        // this.employeeService.createNewEmployee(newEmployee);

        this.employeeService.createNewEmployee(newEmployee).subscribe({
          next: (data: Employee) => {
            this.employee = data;
          },
          error: (error: any) => {
            console.error('error while updating employee:', error);
          },
          complete: () => {
            console.log('employee create complete.');
          },
        });

        this.openSnackBar(`Employee: ${newEmployee.name}, created successfully`);
      }
    }

    // console.log(this.employeeForm.value);

    // console.log(this.skills.at(0).get('skill')?.dirty);
  }

  getDesignations() {
    return Employee.getDesignations();
  }

  getDepartments() {
    return Employee.getDepartments();
  }

  getStatus() {
    return Employee.getStatus();
  }
}
