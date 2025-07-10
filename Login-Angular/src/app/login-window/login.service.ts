import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8085/api/users/add';

  constructor(private http: HttpClient) {}

  createUser(data: { username: string; password: string }) {
    return this.http.post(this.apiUrl, data);
  }

  getUsers(data: { username: string; password: string }) {
    return this.http.post('http://localhost:8085/api/users/login', data);
  }
}
