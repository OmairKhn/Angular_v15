import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly url = 'http://localhost:3000/users'; 

  constructor(private http: HttpClient) { }

  addUser(data: any): Observable<any> {
    return this.http.post<any>(this.url, data).pipe(
      catchError(error => {
        console.error('Error adding user:', error);
        return throwError(() => new Error('Error adding user; please try again later.'));
      })
    );
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(
      catchError(error => {
        console.error('Error fetching users:', error);
        return throwError(() => new Error('Error fetching users; please try again later.'));
      })
    );
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting user:', error);
        return throwError(() => new Error('Error deleting user; please try again later.'));
      })
    );
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, data).pipe(
      catchError(error => {
        console.error('Error updating user:', error);
        return throwError(() => new Error('Error updating user; please try again later.'));
      })
    );
  }
}
