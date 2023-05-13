import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { SignupRequestPayload } from '../signup/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LoginRequestPayload } from '../login/login-request.payload';
import { LoginResponse } from '../login/login-response.payload';
import { LocalStorageService } from 'ngx-webstorage';
import { UserResponse } from 'src/app/shared/model/user.response';
import { UserUpdateRequest } from '../user-update/user-update-request.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
  }

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('authenticationToken', data.authenticationToken);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);

        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
    }

    getUser(username: string) : Observable<UserResponse> {
      console.log("KOK" + username);
      return this.httpClient.get<UserResponse>('http://localhost:8080/api/user/'+ username);
    }
  
    update(userUpdateRequest: UserUpdateRequest): Observable<any> {
      return this.httpClient.put('http://localhost:8080/api/user/update', userUpdateRequest);
    }

    refreshToken() {
      return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
        this.refreshTokenPayload)
        .pipe(tap(response => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');
  
          this.localStorage.store('authenticationToken',
            response.authenticationToken);
          this.localStorage.store('expiresAt', response.expiresAt);
        }));
    }
  
    logout() {
      this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
        { responseType: 'text' })
        .subscribe(data => {
          console.log(data);
        }, error => {
          throwError(error);
        })
      this.localStorage.clear('authenticationToken');
      this.localStorage.clear('username');
      this.localStorage.clear('refreshToken');
      this.localStorage.clear('expiresAt');
    }

    getJwtToken() {
      return this.localStorage.retrieve('authenticationToken');
    }
  
    getUserName() {
      return this.localStorage.retrieve('username');
    }
    getRefreshToken() {
      return this.localStorage.retrieve('refreshToken');
    }
  
    isLoggedIn(): boolean {
      return this.getJwtToken() != null;
    }

    isTokenExpired(token: string) {
      console.log(token);
      const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
      return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }
    
}