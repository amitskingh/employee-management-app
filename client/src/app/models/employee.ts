export type Department = 'angular' | 'react' | 'node';
export type skillType = { skill: string };

export class Employee {
  id: string;
  name: string;
  email: string;
  age: number;
  department: Department;
  skills?: string[];

  constructor(
    id: string,
    name: string,
    email: string,
    age: number,
    department: Department,
    skills?: string[]
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.age = age;
    this.department = department;
    this.skills = skills;
  }
}
