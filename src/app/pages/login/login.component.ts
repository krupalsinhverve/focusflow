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
      let userCredential;
      if (this.isRegister) {
        userCredential = await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      } else {
        userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      }

      const user: User = userCredential.user;

      // Get ID token
      const token = await user.getIdToken();
      const expiresIn = 3600 * 1000;

      // Save user info in localStorage
      const userData = {
        uid: user.uid,
        email: user.email,
        token,
        tokenExpiry: new Date().getTime() + expiresIn
      };

      localStorage.setItem('user', JSON.stringify(userData));

      this.router.navigate(['/home']);
    } catch (err: any) {
      this.errorMessage = err.message;
    } finally {
      this.loading = false;
    }
  }
}