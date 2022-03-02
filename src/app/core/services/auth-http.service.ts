import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SignInRequest, SignInResponse, SignUpRequest, SignUpResponse, TurnUserToAdminRequest, TurnUserToAdminResponse } from '@att/domain';

@Injectable({ providedIn: 'root' })
export class AuthHttpService {
  constructor(private readonly http: HttpClient) { }

  signUp(request: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>('att://signup', request);
  }

  signIn(request: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>('att://signin', request);
  }

  turnUserToAdmin(request: TurnUserToAdminRequest): Observable<TurnUserToAdminResponse> {
    return this.http.post<TurnUserToAdminResponse>(`att://turn-admin/${request.uuid}`, null);
  }
}
