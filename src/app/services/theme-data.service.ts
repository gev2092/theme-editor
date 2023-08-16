import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { IDbTheme } from '../interfaces/db-theme.interface';
import { environment } from '../../environments/environment';
import { IThemeResult } from '../interfaces/theme-result.interface';

@Injectable()
export class ThemeDataService {
  private baseUrl = `${environment.baseUrl}/theme`;

  constructor(private httpClient: HttpClient) {
  }

  public getAll(): Observable<IThemeResult[]> {
   return this.httpClient.get<IThemeResult[]>(this.baseUrl);
  }

  public add(data: IDbTheme): Observable<IDbTheme> {
     return this.httpClient.post<IDbTheme>(this.baseUrl, data);
  }

  public get(id: number): Observable<IDbTheme> {
    return this.httpClient.get<IDbTheme>(`${this.baseUrl}/${id}`);
  }

  public getDefault(): Observable<IDbTheme> {
    return this.httpClient.get<IDbTheme>(`${this.baseUrl}/default`);
  }

  public update(id: number | undefined, theme: IDbTheme): Observable<IDbTheme> {
    return this.httpClient.patch<IDbTheme>(`${this.baseUrl}/${id}`, theme);
  }

  public remove(id: number | undefined): Observable<IDbTheme> {
    return this.httpClient.delete<IDbTheme>(`${this.baseUrl}/${id}`);
  }
}
