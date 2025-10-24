import { MatListModule } from '@angular/material/list';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { userDetail } from '../../guards/auth-guard';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { UserData, UserModel } from '../../models/user-model';
import { TitleCasePipe } from '@angular/common';
import { MatHeaderRow } from '@angular/material/table';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    TitleCasePipe,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  fb = inject(FormBuilder);
  route = inject(Router);
  authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    // role: ['', [Validators.required]],
  });

  // onSubmit() {
  //   console.log(this.loginForm.value);

  //   if (this.loginForm.invalid) {
  //     this.loginForm.markAllAsTouched();
  //     return;
  //   }

  //   if (this.loginForm.valid) {

  //     if (
  //       this.loginForm.controls.email.value === userDetail.email &&
  //       this.loginForm.controls.password.value === userDetail.password
  //     ) {
  //       localStorage.setItem('token', `---->${this.loginForm.controls.email.value}<-----`);
  //       this.route.navigate(['']);
  //     }
  //   }
  // }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const newUser: UserData = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string,
    };

    this.authService.loginUser(newUser).subscribe({
      next: (data: UserModel) => {
        this.authService.setUserData(data);
        this.route.navigate(['']);
      },
      error: (error: any) => {
        console.error('error while logging user:', error);
      },
      complete: () => {
        console.log('user is logged in.');
      },
    });
  }

  getUserRoles() {
    return UserModel.getUserRoles();
  }
}
