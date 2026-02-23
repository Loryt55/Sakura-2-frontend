export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  roleName: string;
  createdAt: string;
}

export interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleId: number;
}

export interface Role {
  id: number;
  name: string;
}
