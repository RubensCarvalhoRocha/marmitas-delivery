import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { User } from '../model/user';
import { UserRegistration } from '../model/userRegistration';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.api}/users/all`);
  }

  register(user: UserRegistration): Observable<User> {
    return this._http.post<User>(`${environment.api}/users/sign-up`, user);
  }

  getUserByUsername(username: string): Observable<User> {
    return this._http.get<User>(`${environment.api}/users/${username}`);
  }

  updateUser(id: number, user: Partial<User>): Observable<User> {
    return this._http.put<User>(`${environment.api}/users/${id}`, user);
  }

  toggleUserStatus(user: User): Observable<void> {
    return this._http.put<void>(`${environment.api}/users/toggle-status`, user);
  }

  getCurrentUserProfile(): Observable<User> {
    return this._http.get<User>(`${environment.api}/users/profile`);
  }

  // Alterar senha
  changePassword(
    id: number,
    passwords: { currentPassword: string; newPassword: string }
  ): Observable<void> {
    return this._http.put<void>(
      `${environment.api}/users/${id}/change-password`,
      passwords
    );
  }

  // Verificar se email já existe
  checkEmailExists(email: string): Observable<boolean> {
    return this._http.get<boolean>(
      `${environment.api}/users/check-email/${email}`
    );
  }

  // Buscar usuários com paginação e filtros
  getUsers(params: {
    page: number;
    size: number;
    sort?: string;
    role?: string;
    active?: boolean;
    search?: string;
  }): Observable<{
    content: User[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
  }> {
    const queryParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryParams.append(key, value.toString());
      }
    });

    return this._http.get<any>(
      `${environment.api}/users/search?${queryParams.toString()}`
    );
  }
}
