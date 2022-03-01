export const enum Role {
  USER_ROLE = 'USER_ROLE',
  ADMIN_ROLE = 'ADMIN_ROLE',
}

export interface User {
  readonly uuid: string;
  readonly email: string;
  readonly name: string;
  readonly role: Role;
}

export interface SignUpRequest extends Omit<User, 'role'>{
  readonly password: string;
}

export interface SignUpResponse {
  readonly token: string; // JWT token
}

export interface SignInRequest {
  readonly email: string;
  readonly password: string;
}

export interface SignInResponse {
  readonly user: User;
  readonly token: string; // JWT token
}

export interface TurnUserToAdminRequest {
  readonly uuid: string;
}

export interface TurnUserToAdminResponse {
  readonly user: User;
}
