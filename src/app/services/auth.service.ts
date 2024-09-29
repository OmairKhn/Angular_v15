// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  currentUser$: any;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState;
  }

  // Register a new user with email and password
  register(email: string, password: string): Observable<any> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  // Login with email and password
  login(email: string, password: string): Observable<any> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  // Logout the current user
  logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  // Check if the user is authenticated
  isAuthenticated(): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(true);
        } else {
          observer.next(false);
        }
        observer.complete();
      });
    });
  }
}
