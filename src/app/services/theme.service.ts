import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { ThemeDataService } from './theme-data.service';
import { IDbTheme } from '../interfaces/db-theme.interface';
import { IThemeResult } from '../interfaces/theme-result.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes = new BehaviorSubject<IThemeResult[]>([]);
  private currentTheme = new BehaviorSubject<IDbTheme>({});

  themes$: Observable<IThemeResult[]>;
  currentTheme$: Observable<IDbTheme>;

  constructor(private themeDataService: ThemeDataService) {
    this.themes$ = this.themes.asObservable();
    this.currentTheme$ = this.currentTheme.asObservable();
  }

  public getAll(): void {
   this.themeDataService.getAll()
     .pipe(first())
     .subscribe(themes => {
        this.themes.next(themes);
    });
  }

  public getDefault(): void {
    this.themeDataService.getDefault()
      .pipe(first())
      .subscribe(theme => {
        this.currentTheme.next(theme);
      });
  }

}
