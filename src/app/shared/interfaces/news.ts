import { EntityState } from '@datorama/akita';

import { New } from '@att/domain';

export interface NewsState extends EntityState<New, string> { }
