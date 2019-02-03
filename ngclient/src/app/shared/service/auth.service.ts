import { Injectable } from "@angular/core";
import { User } from "../interfaces/user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { stringify } from "querystring";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private token: string = null;

  constructor(private http: HttpClient) {}
  //TODO { token: string } move to separate interface
  login(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("/api/auth/login", user).pipe(
      tap(({ token }) => {
        localStorage.setItem("auth-token", token);
        this.setToken(token);
      })
    );
  }

  register(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>("/api/auth/register", user);
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
  }
}
