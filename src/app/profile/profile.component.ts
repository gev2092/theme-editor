import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { ThemeService } from '../services/theme.service';
import { IDbTheme } from '../interfaces/db-theme.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  currentTheme: IDbTheme = {};
  isEditMode = false;

  constructor(
    private themeService: ThemeService,
    ) {
  }

  private currentThemeSubscription(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.notifier$))
      .subscribe(theme => {
        this.currentTheme = theme;
      })
  }

  handleClickEdit(): void {
    this.isEditMode = true;
  }

  handleClickCancel(): void {
    this.isEditMode = false;
  }

  handleClickSave(): void {
    this.isEditMode = false;
  }

  ngOnInit(): void {
    this.themeService.getDefault();
    this.currentThemeSubscription();
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete()
  }
}
