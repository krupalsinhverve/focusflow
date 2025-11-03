import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  User
} from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    MessageModule,
    MessagesModule,
    CommonModule,
    FormsModule,
    RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email = '';
  password = '';
  isRegister = false;
  errorMessage = '';
  loading = false;
  showPassword = false;
  currentYear = new Date().getFullYear();

  constructor(private auth: Auth, private router: Router) { }

  toggleMode() {
    this.isRegister = !this.isRegister;
    this.errorMessage = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async onSubmit() {
    this.errorMessage = '';
    this.loading = true;

    // Basic validation
    if (!this.email.includes('@')) {
      this.errorMessage = 'Please enter a valid email address.';
      this.loading = false;
      return;
    }
    if (this.password.length < 6) {
      this.errorMessage = 'Password must be at least 6 characters.';
      this.loading = false;
      return;
    }

    try {
      let userCredential;
      if (this.isRegister) {
        userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      } else {
        userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      }

      const user: User = userCredential.user;

      // Get ID token
      const token = await user.getIdToken();
      const expiresIn = 3600 * 1000; // 1 hour

      // Save user info in localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        token,
        tokenExpiry: new Date().getTime() + expiresIn
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to home
      this.router.navigate(['/home']);
    } catch (err: any) {
      const errorMap: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email.',
        'auth/wrong-password': 'Incorrect password.',
        'auth/email-already-in-use': 'Email already registered.',
        'auth/invalid-email': 'Invalid email format.',
      };
      this.errorMessage = errorMap[err.code] || 'Something went wrong. Please try again.';
    } finally {
      this.loading = false;
    }
  }
}
