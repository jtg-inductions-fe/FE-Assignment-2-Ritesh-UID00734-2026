import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { LoginRequest } from '@core/models/login-request.model';
import { User } from '@core/models/user.model';
import { StorageService } from '@core/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_URL = '/assets/data/users.json';

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
        }
      })
    );
  }

  logout(): void {
    this.storageService.clearUser();
  }

  getCurrentUser(): User | null {
    return this.storageService.getUser();
  }

  isLoggedIn(): boolean {
    return this.storageService.isLoggedIn();
  }
}
