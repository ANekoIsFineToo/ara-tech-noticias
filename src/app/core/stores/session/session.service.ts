import { Injectable } from '@angular/core';
import { setLoading } from '@datorama/akita';
import { v4 as uuidv4 } from 'uuid';
import { map, Observable, tap } from 'rxjs';

import { Role, User } from '@att/domain';

import { AuthService } from '../../services';
import { SessionStore } from './session.store';

@Injectable({ providedIn: 'root' })
export class SessionService {
  constructor(private readonly sessionStore: SessionStore, private readonly authService: AuthService) { }

  signIn(email: string, password: string): Observable<User> {
    return this.authService.signIn({ email, password }).pipe(
      setLoading(this.sessionStore),
      tap(({ token, user }) => this.sessionStore.update({ token, user })),
      map(({ user }) => user),
    );
  }

  signUp(name: string, email: string, password: string): Observable<User> {
    const newUser = { uuid: uuidv4(), name, email };
    return this.authService.signUp({ ...newUser, password }).pipe(
      setLoading(this.sessionStore),
      map(({ token }) => ({ token, user: { ...newUser, role: Role.USER_ROLE } })),
      tap(({ token, user }) => this.sessionStore.update({ token, user })),
      map(({ user }) => user),
    );
  }

  turnUserToAdmin(uuid: string): Observable<User> {
    return this.authService.turnUserToAdmin({ uuid }).pipe(
      setLoading(this.sessionStore),
      tap(({ user }) => this.sessionStore.update({ user })),
      map(({ user }) => user),
    );
  }
}
