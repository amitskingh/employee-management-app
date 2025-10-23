import { Routes } from '@angular/router';
import { EmployeeList } from './components/employee-list/employee-list';
import { EmployeeForm } from './components/employee-form/employee-form';
import { Dashboard } from './pages/dashboard/dashboard';
import { Login } from './pages/login/login';
import { EmployeeDetail } from './components/employee-detail/employee-detail';
import { loginGuard } from './guards/login-guard';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'employee-list',
        pathMatch: 'full',
      },
      {
        path: 'employee-list',
        component: EmployeeList,
      },
      {
        path: 'create-employee',
        component: EmployeeForm,
      },
      {
        path: 'employee/:id',
        component: EmployeeDetail,
      },
      {
        path: 'employee/:id/edit',
        component: EmployeeForm,
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
