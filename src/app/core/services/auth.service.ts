import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { LoginRequest } from '@core/models/login-request.model';
import { User } from '@core/models/user.model';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_URL = '/assets/data/users.json';

  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.storageService.getUser()
  );

  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {}

  login(credentials: LoginRequest): Observable<User | null> {
    return this.http.get<User[]>(this.USERS_URL).pipe(
      map(users => {
        return (
          users.find(
            user =>
              user.email === credentials.email &&
              user.password === credentials.password
          ) || null
        );
      }),
      tap(user => {
        if (user) {
          this.storageService.setUser(user);
          this.currentUserSubject.next(user);
        }
      })
    );
  }

  logout(): void {
    this.storageService.clearUser();
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return this.currentUserSubject.value !== null;
  }
}
