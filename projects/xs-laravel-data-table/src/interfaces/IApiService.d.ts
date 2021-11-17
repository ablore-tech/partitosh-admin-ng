import {Observable} from 'rxjs';

export interface IApiService {
  get: (endpoint: string, data: [] | object) => Observable<any>;
  post: (endpoint: string, data: [] | object) => Observable<any>;
}
