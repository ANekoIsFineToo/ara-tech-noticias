import { User } from '@att/domain';

export interface SessionState {
  readonly token?: string;
  readonly user?: User;
}
