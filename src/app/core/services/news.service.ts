import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  CreateNewRequest, CreateNewResponse, DeleteNewRequest, DeleteNewResponse, ListNewsResponse, UpdateNewRequest, UpdateNewResponse
} from '@att/domain';

@Injectable({ providedIn: 'root' })
export class NewsService {
  constructor(private readonly http: HttpClient) { }

  list(): Observable<ListNewsResponse> {
    return this.http.get<ListNewsResponse>('att://news');
  }

  create(request: CreateNewRequest): Observable<CreateNewResponse> {
    return this.http.post<CreateNewResponse>('att://news', request);
  }

  update(request: UpdateNewRequest): Observable<UpdateNewResponse> {
    return this.http.put<UpdateNewResponse>(`att://news/${request.uuid}`, request.new);
  }

  delete(request: DeleteNewRequest): Observable<DeleteNewResponse> {
    return this.http.delete<DeleteNewResponse>(`att://news/${request.uuid}`);
  }
}
