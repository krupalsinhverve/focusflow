import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
  mobileNumber: string = '';
  otp: string = '';
  otpSent: boolean = false;
  currentYear: number = new Date().getFullYear();

  constructor(private router: Router) { }

  generateOtp() {
    if (this.mobileNumber.length === 10) {
      this.otpSent = true;
      console.log('OTP sent to', this.mobileNumber);
      // TODO: Call backend API to send OTP
    } else {
      alert('Please enter a valid 10-digit mobile number.');
    }
  }

  resendOtp(event: Event) {
    event.preventDefault();
    console.log('Resend OTP to', this.mobileNumber);
    // TODO: Resend OTP API call
  }

  onSubmit() {
    if (this.otp === '1234') {
      alert('OTP verified successfully!');
      this.router.navigate(['/todo']);
    } else {
      alert('Invalid OTP. Please try again.');
    }
  }
}
