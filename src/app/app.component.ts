import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'focusflow';

  constructor(private router: Router) { }

  ngOnInit() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      const userStr = localStorage.getItem('user');

      if (!userStr) {
        this.router.navigate(['/login']);
        return;
      }

      const user = JSON.parse(userStr);
      const now = new Date().getTime();

      if (user.tokenExpiry && now < user.tokenExpiry) {
        // Token still valid → navigate to home
        this.router.navigate(['/home']);
      } else {
        // Token expired → remove user and go to login
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    }
  }
}
