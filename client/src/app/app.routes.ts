import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { EmployeeDetail } from './components/employee-detail/employee-detail';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'employees',
        pathMatch: 'full',
      },
      {
        path: 'employees',
        component: EmployeeList,
        canActivate: [roleGuard],
        data: {
          role: ['admin', 'sub_admin'],
        },
      },
      {
        path: 'employees/add',
        component: EmployeeForm,
        canActivate: [roleGuard],
        data: {
          role: ['admin'],
        },
      },
      {
        path: 'employees/view/:id',
        component: EmployeeDetail,
      },
      {
        path: 'employees/edit/:id',
        component: EmployeeForm,
        canActivate: [roleGuard],
        data: {
          role: ['admin'],
        },
      },
    ],
  },
  {
    path: 'login',
    component: Login,
    canActivate: [loginGuard],
  },
  {
    path: '**',
    redirectTo: '',
  },
];
