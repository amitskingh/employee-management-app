import { inject, Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  phone: string;
  department: 'it' | 'law';
  designation: 'manager' | 'secretary' | 'associate';
  salary: number;
  date_of_joining: string;
  status: boolean;
  address?: string;
}

const users: User[] = [
  {
    name: 'Liam Smith',
    email: 'liam.smith@example.com',
    phone: '9856745602',
    department: 'it',
    designation: 'manager',
    salary: 50000,
    date_of_joining: '2022-01-01',
    status: true,
  },
  {
    name: 'Olivia Johnson',
    email: 'olivia.j@example.com',
    phone: '9856745602',
    department: 'it',
    designation: 'associate',
    salary: 30000,
    date_of_joining: '2022-02-15',
    status: true,
  },
  {
    name: 'Noah Williams',
    email: 'noahwilliams@example.com',
    phone: '9856745602',
    department: 'law',
    designation: 'secretary',
    salary: 40000,
    date_of_joining: '2022-03-10',
    status: true,
  },
  {
    name: 'Emma Brown',
    email: 'emma.brown@example.com',
    phone: '9856745602',
    department: 'it',
    designation: 'associate',
    salary: 35000,
    date_of_joining: '2022-04-20',
    status: true,
  },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements AfterViewInit {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/employees';

  employeeList: Employee[] = [];

  private createNewUser(id: number): Employee {
    const idx = Math.floor(Math.random() * users.length);
    const name = users[idx].name;
    const email = users[idx].email;
    const phone = users[idx].phone;
    const department = users[idx].department;
    const designation = users[idx].designation;
    const salary = users[idx].salary;
    const date_of_joining = users[idx].date_of_joining;
    const status = users[idx].status;
    const address = users[idx].address;

    return {
      id: id.toString(),
      name: name,
      email: email,
      phone: phone,
      department: department,
      designation: designation,
      salary: salary,
      date_of_joining: date_of_joining,
      status: status,
      address: address,
    };
  }

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
    this.employeeList = users;
  }

  // GET (List)
  getEmployeeList(): Observable<Employee[]> {
    // return this.employeeList;

    return this.http.get<Employee[]>(`${this.baseUrl}/`);
  }

  // GET (Detail)
  getEmployeeById(id: string): Observable<Employee> {
    // return this.employeeList.find((user) => user.id === id);

    return this.http.get<Employee>(`${this.baseUrl}/${id}/`);
  }

  // DELETE (Employee)
  deleteEmployeeById(id: string): Observable<void> {
    // this.employeeList = this.employeeList.filter((user) => user.id !== id);

    return this.http.delete<void>(`${this.baseUrl}/${id}/`);
  }

  // PATCH (Update)
  updateEmployeeById(id: string, updatedUser: Employee): Observable<Employee> {
    // const index = this.employeeList.findIndex((user) => user.id === id);
    // if (index !== -1) {
    //   console.log('Inside Service', updatedUser);
    //   this.employeeList[index] = updatedUser;
    //   return updatedUser;
    // }
    // return undefined;

    return this.http.patch<Employee>(`${this.baseUrl}/${id}/`, updatedUser);
  }

  // PUT (Create)
  createNewEmployee(newEmployee: User): Observable<Employee> {
    // this.employeeList.push({ ...newEmployee, id: (this.employeeList.length + 1).toString() });
    // return this.employeeList[this.employeeList.length - 1];

    return this.http.patch<Employee>(`${this.baseUrl}/`, newEmployee);
  }

  ngAfterViewInit() {}
}
