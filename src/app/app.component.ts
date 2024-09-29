// src/app/app.component.ts
import { Component } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-old-angular-app';
  user$: Observable<any>;

  constructor(private authService: AuthService, private router: Router) {
    this.user$ = this.authService.user$;
  }

  logout(): void {
    from(this.authService.logout()).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
