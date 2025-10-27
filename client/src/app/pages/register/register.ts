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
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import { roleAvailable, UserData, UserModel } from '../../models/user-model';
import { TitleCasePipe } from '@angular/common';
import { MatHeaderRow } from '@angular/material/table';

@Component({
  selector: 'app-register',
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
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  fb = inject(FormBuilder);
  route = inject(Router);
  authService = inject(AuthService);

  registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    role: ['', [Validators.required]],
  });


  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    console.log(this.registerForm.value);


    const newUser: UserData = {
      name: this.registerForm.value.name as string,
      email: this.registerForm.value.email as string,
      password: this.registerForm.value.password as string,
      role: this.registerForm.value.role as roleAvailable,
    };

    this.authService.registerUser(newUser).subscribe({
      next: (data: UserModel) => {
        this.route.navigate(['login']);
      },
      error: (error: any) => {
        console.error('error while registering user:', error);
      },
      complete: () => {
        console.log('user is registered.');
      },
    });
  }

  getUserRoles() {
    return UserModel.getUserRoles();
  }
}
