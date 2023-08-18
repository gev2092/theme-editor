import { Injectable } from '@angular/core';

import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

import { ITheme } from '../interfaces/theme.interface';
import { ThemeDataService } from './theme-data.service';
import { IThemeResult } from '../interfaces/theme-result.interface';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private themes = new BehaviorSubject<IThemeResult[]>([]);
  private currentTheme = new BehaviorSubject<ITheme>({});

  themes$: Observable<IThemeResult[]>;
  currentTheme$: Observable<ITheme>;

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
        // mock default theme
        const themeData = {
          avatar: { border_radius: '0%' },
          name: { color: '#ff0000' },
          bio: { color: '#000000' },
          links: {
            border_radius: '0',
            background: '#ff0000',
            color: '#ffffff'
          },
        }
        this.currentTheme.next(themeData);
      });
  }

  setCurrentTheme(theme: ITheme): void {
    this.currentTheme.next(theme);
  }

}
