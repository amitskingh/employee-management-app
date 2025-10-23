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
import { Department, Employee, skillType } from '../../models/employee';
import { EmployeeService } from '../../services/employee-service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { User } from '../../services/employee-service';

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
  ],
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

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: this.durationInSeconds * 1000,
    });
  }

  employeeForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    age: this.fb.control<number | null>(null, [
      Validators.required,
      Validators.min(18),
      Validators.max(60),
    ]),
    department: ['', [Validators.required]],
    skills: this.fb.array([]),
  });

  get skills(): FormArray {
    return this.employeeForm.get('skills') as FormArray;
  }

  addSkill() {
    const skillForm = this.fb.group({
      skill: ['', Validators.required],
    });
    this.skills.push(skillForm);
  }

  fillEmployeeForm() {
    // Use patchValue for all simple form controls
    this.employeeForm.patchValue({
      name: this.employee.name,
      age: this.employee.age,
      department: this.employee.department,
      email: this.employee.email,
    });

    // Clear the array first to avoid duplicates if called multiple times
    this.skills.clear();

    // Create a new FormGroup for each skill and push it into the FormArray
    this.employee.skills?.forEach((skill) => {
      this.skills.push(
        this.fb.group({
          skill: skill,
        })
      );
    });
  }

  removeSkill(index: number) {
    // console.log(this.skills.value);
    // console.log('index: ', index);
    // console.log(this.skills.at(index).value);
    this.skills.removeAt(index);
  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }

    if (this.employeeForm.valid) {
      if (this.employee?.id) {
        const skillArray = this.employeeForm.value.skills as skillType[];
        const newSkills = skillArray.map((item: skillType) => item.skill.trim()) as string[];

        const newEmployee = new Employee(
          this.employee.id,
          this.employeeForm.value.name!,
          this.employeeForm.value.email!,
          this.employeeForm.value.age!,
          this.employeeForm.value.department as Department,
          newSkills
        );

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
        const skillArray = this.employeeForm.value.skills as skillType[];
        const newSkills = skillArray.map((item: skillType) => item.skill.trim()) as string[];

        const newEmployee: User = {
          name: this.employeeForm.value.name!,
          email: this.employeeForm.value.email!,
          age: this.employeeForm.value.age!,
          department: this.employeeForm.value.department as Department,
          skills: newSkills,
        };

        this.employeeService.createNewEmployee(newEmployee).subscribe({
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

        this.openSnackBar(`Employee: ${newEmployee.name}, created successfully`);
      }
    }

    // console.log(this.employeeForm.value);

    // console.log(this.skills.at(0).get('skill')?.dirty);
  }
}
