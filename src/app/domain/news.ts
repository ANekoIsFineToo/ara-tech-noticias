export interface New {
  readonly uuid: string;
  readonly title: string;
  readonly description: string;
}

export interface ListNewsResponse {
  readonly news: New[];
}

export interface CreateNewRequest extends Omit<New, 'uuid'> {
  readonly newsUuid: string;
}

export interface CreateNewResponse {
  readonly news: New;
}

export interface UpdateNewRequest {
  readonly uuid: string;
  readonly new: Omit<New, 'uuid'>;
}

export interface UpdateNewResponse {
  readonly news: New;
}

export interface DeleteNewRequest {
  readonly uuid: string;
}

export interface DeleteNewResponse {
  readonly uuid: string;
}
