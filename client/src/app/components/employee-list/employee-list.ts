import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { Employee } from '../../models/employee';

import { TitleCasePipe, NgClass, NgStyle } from '@angular/common';
import { Router } from '@angular/router';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeService } from '../../services/employee-service';
import { DialogBox } from '../dialog-box/dialog-box';
import { title } from 'process';

@Component({
  selector: 'app-employee-list',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    MatIcon,
    MatIconButton,
    TitleCasePipe,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/**
 * @title Data table with sorting, pagination, and filtering.
 */
export class EmployeeList implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'email', 'department', 'age', 'actions'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  employeeList: Employee[] = [];

  constructor(private router: Router, private employeeService: EmployeeService) {
    // Get
    // this.employeeList = this.employeeService.getEmployeeList() as Employee[];

    this.employeeService.getEmployeeList().subscribe({
      next: (data: Employee[]) => {
        this.employeeList = data;
        this.dataSource = new MatTableDataSource(this.employeeList);
        console.log(this.employeeList);
      },
      error: (error: any) => {
        console.error('error fetching employee list:', error);
      },
      complete: () => {
        console.log('employee list fetch complete.');
      },
    });

    // this.employeeservice.getemployeelist().subscribe({
    //   next: (data) => {
    //     this.employeelist = data;
    //   },
    //   error: (error) => {
    //     console.error('error fetching employee list:', error);
    //   },
    //   complete: () => {
    //     console.log('employee list fetch complete.');
    //   },
    // });

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.employeeList);
  }

  private _snackBar = inject(MatSnackBar);

  durationInSeconds = 5;

  openSnackBar(message: string) {
    this._snackBar.open(message, 'close', {
      duration: this.durationInSeconds * 1000,
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  readonly dialog = inject(MatDialog);
  dialogRef!: MatDialogRef<DialogBox>;

  openDialog(
    title: string,
    message: string,
    enterAnimationDuration: string = '300ms',
    exitAnimationDuration: string = '300ms'
  ): void {
    this.dialogRef = this.dialog.open(DialogBox, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: {
        title: title,
        content: message,
      },
    });
  }

  viewRow(row: any) {
    this.router.navigate([`/employee/${row.id}`], row.id);
    console.log(row.id);
  }

  deleteRow(row: any) {
    const title = 'Delete Employee';
    const message = `Are you sure you want to delete, ${row.name}?`;
    this.openDialog(title, message);

    // Listen for the close event
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog closed with:', result);
      if (result === 'ok') {
        this.deleteRowAction(row);
        // console.log('User clicked OK');
      } else if (result === 'cancel') {
        // console.log('User clicked Cancel');
      } else {
        // console.log('Dialog closed without action');
      }
    });
  }

  deleteRowAction(row: any) {
    this.employeeList = this.employeeList.filter((item) => item.id !== row.id);
    this.dataSource = new MatTableDataSource(this.employeeList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // this.employeeService.deleteEmployeeById(row.id);
    this.employeeService.deleteEmployeeById(row.id).subscribe({
      next: (data: void) => {
        console.log(data);
      },
      error: (error: any) => {
        console.error('error while deleting employee:', error);
      },
      complete: () => {
        console.log('employee delete complete.');
      },
    });

    this.openSnackBar(`Employee: ${row.name}, deleted successfully`);
  }

  editRow(row: any) {
    console.log(row);
    this.router.navigate([`/employee/${row.id}/edit`], row.id);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
