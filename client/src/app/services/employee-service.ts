import { inject, Injectable } from '@angular/core';
import { Employee, skillType } from '../models/employee';
import { AfterViewInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  name: string;
  email: string;
  age: number;
  skills?: string[];
  department: 'angular' | 'react' | 'node';
}

const users: User[] = [
  {
    name: 'Liam Smith',
    email: 'liam.smith@example.com',
    age: 28,
    skills: ['JavaScript', 'HTML', 'CSS', 'Git'],
    department: 'react',
  },
  {
    name: 'Olivia Johnson',
    email: 'olivia.j@example.com',
    age: 34,
    skills: ['TypeScript', 'RxJS', 'NgRx'],
    department: 'angular',
  },
  {
    name: 'Noah Williams',
    email: 'noahwilliams@example.com',
    age: 22,
    skills: ['Express.js', 'MongoDB', 'Docker'],
    department: 'node',
  },
  {
    name: 'Emma Brown',
    email: 'emma.brown@example.com',
    age: 45,
    skills: ['React Native', 'GraphQL', 'Jest'],
    department: 'react',
  },
  {
    name: 'Oliver Jones',
    email: 'oliver.jones@example.com',
    age: 31,
    skills: ['JavaScript', 'REST APIs', 'SQL'],
    department: 'node',
  },
  {
    name: 'Ava Garcia',
    email: 'ava.garcia@example.com',
    age: 19,
    skills: ['HTML', 'CSS', 'TypeScript'],
    department: 'angular',
  },
  {
    name: 'Elijah Miller',
    email: 'e.miller@example.com',
    age: 52,
    skills: ['AWS', 'CI/CD', 'PostgreSQL'],
    department: 'node',
  },
  {
    name: 'Charlotte Davis',
    email: 'charlotte.davis@example.com',
    age: 29,
    skills: ['Angular Material', 'TypeScript', 'Jasmine'],
    department: 'angular',
  },
  {
    name: 'James Rodriguez',
    email: 'j.rodriguez@example.com',
    age: 38,
    skills: ['Next.js', 'Redux', 'Tailwind CSS'],
    department: 'react',
  },
  {
    name: 'Sophia Martinez',
    email: 'sophia.martinez@example.com',
    age: 41,
    skills: ['NestJS', 'Microservices', 'Git'],
    department: 'node',
  },
];

@Injectable({
  providedIn: 'root',
})
export class EmployeeService implements AfterViewInit {
  private http = inject(HttpClient);
  private baseUrl = 'http://127.0.0.1:8000/api/v1/employee';

  employeeList: Employee[] = [];

  private createNewUser(id: number): Employee {
    const idx = Math.floor(Math.random() * users.length);
    const name = users[idx].name;
    const email = users[idx].email;
    const age = users[idx].age;
    const skills = users[idx].skills;
    const department = users[idx].department;

    return {
      id: id.toString(),
      name: name,
      email: email,
      age: age,
      skills: skills,
      department: department,
    };
  }

  constructor() {
    const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
    this.employeeList = users;
  }

  // GET (List)
  getEmployeeList(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.baseUrl);
    // return this.employeeList;
  }

  // GET (Detail)
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  // DELETE (Employee)
  deleteEmployeeById(id: string): Observable<void>{

    return this.http.delete<void>(`${this.baseUrl}/${id}`);
    
    // this.employeeList = this.employeeList.filter((user) => user.id !== id);
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

    return this.http.patch<Employee>(`${this.baseUrl}/${id}`, updatedUser);
  }

  // PUT (Create)
  createNewEmployee(newEmployee: User): Observable<Employee> {
    // this.employeeList.push({ ...newEmployee, id: (this.employeeList.length + 1).toString() });
    // return this.employeeList[this.employeeList.length - 1];
    return this.http.patch<Employee>(this.baseUrl, newEmployee);
  }

  ngAfterViewInit() {}
}
