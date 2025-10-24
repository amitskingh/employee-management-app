export type Department = 'it' | 'law';
export type Designation = 'manager' | 'secretary' | 'associate';

export type statusType = {
  name: string;
  value: boolean;
};

export class Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: Department;
  designation: Designation;
  salary: number;
  date_of_joining: string
  status: boolean;
  address?: string;

  constructor(
    id: string,
    name: string,
    email: string,
    phone: string,
    department: Department,
    designation: Designation,
    salary: number,
    date_of_joining: string,
    status: boolean,
    address?: string
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.department = department;
    this.designation = designation;
    this.salary = salary;
    this.date_of_joining = date_of_joining;
    this.status = status;
    this.address = address;
  }

  static getDepartments(): string[] {
    return ['it', 'law'];
  }

  static getDesignations(): string[] {
    return ['manager', 'secretary', 'associate'];
  }

  static getStatus(): statusType[] {
    return [
      {
        name: 'Active',
        value: true,
      },
      {
        name: 'Inactive',
        value: false,
      },
    ];
  }
}
