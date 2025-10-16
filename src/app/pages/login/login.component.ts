import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth'
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isRegister = false;
  errorMessage = '';
  loading = false;
  currentYear: number = new Date().getFullYear();

  constructor(private auth: Auth, private router: Router) { }

  async onSubmit() {
    this.errorMessage = '';
    this.loading = true;

    try {
      if (this.isRegister) {
        await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      } else {
        await signInWithEmailAndPassword(this.auth, this.email, this.password);
      }
      this.router.navigate(['/todo']);
    } catch (err: any) {
      this.errorMessage = err.message;
    } finally {
      this.loading = false;
    }
  }
}