export type roleAvailable = 'admin' | 'sub_admin';


export interface UserData {
  email: string;
  password: string;
  name?: string;
  role?: roleAvailable;
}

export type roleType = {
  name: string;
  value: string;
};

export class UserModel {
  id: string;
  name: string;
  role: string;
  email: string;

  constructor(id: string, name: string, role: string, email: string) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
  }

  static getUserRoles(): roleType[] {
    return [
      {
        name: 'Admin',
        value: 'admin',
      },
      {
        name: 'Sub Admin',
        value: 'sub_admin',
      },
    ];
  }
}
