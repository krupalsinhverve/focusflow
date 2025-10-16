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
      const lastLogin = localStorage.getItem('lastLogin');
      if (lastLogin) {
        const loginTime = parseInt(lastLogin, 10);
        const now = new Date().getTime();

        // 24 hours = 24 * 60 * 60 * 1000 ms
        if (now - loginTime < 24 * 60 * 60 * 1000) {
          this.router.navigate(['/todo']);
        }
      }
    }
  }


}
