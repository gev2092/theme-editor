import { FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { ITheme } from '../interfaces/theme.interface';
import { ThemeService } from '../services/theme.service';
import { IThemeStyles } from '../interfaces/theme-styles.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private notifier$ = new Subject();
  defaultTheme: ITheme = {};
  previewTheme: ITheme = {};
  currentThemeStyles: IThemeStyles = {};
  isEditMode = false;
  themeForm = this.fb.group({
    avatar: this.fb.group({
      border_radius: ['']
    }),
    name: this.fb.group({
      color: ['']
    }),
    bio: this.fb.group({
      color: ['']
    }),
    links: this.fb.group({
      border_radius: [''],
      background: [''],
      color: [''],
    }),
  });

  constructor(
    private themeService: ThemeService,
    private fb: FormBuilder
    ) {
  }

  private currentThemeSubscription(): void {
    this.themeService.currentTheme$
      .pipe(takeUntil(this.notifier$))
      .subscribe(theme => {
        this.defaultTheme = theme;
        this.setThemeFormValues(this.defaultTheme);
      })
  }

  private prepareStylesForApply(theme: ITheme): void {
    this.currentThemeStyles = {};
    for (let currentThemeKey in theme) {
      this.currentThemeStyles[currentThemeKey as keyof IThemeStyles] = this.getStyles(theme[currentThemeKey as keyof ITheme]);
    }
  }

  private replaceUnderlinesWithDashes(key: string): string {
    return key.split('_').join('-');
  }

  private getStyles(elementStyles: { [key: string]: string } | undefined): string {
    let styles = '';

    for (let elementKey in elementStyles) {
      if (elementStyles) {
        styles += `${this.replaceUnderlinesWithDashes(elementKey)}: ${elementStyles[elementKey]}; `;
      }
    }

    return styles;
  }

  private setThemeFormValues(theme: ITheme): void {
    this.themeForm.patchValue(theme);
  }

  private themeFormValueChangesSubscription(): void {
    this.themeForm.valueChanges
      .pipe(takeUntil(this.notifier$))
      .subscribe(values => {
        values.links?.border_radius ? values.links.border_radius += '%' : '0';
        this.previewTheme = values as ITheme;
        this.prepareStylesForApply(this.previewTheme);
      })
  }

  handleClickEdit(): void {
    this.setThemeFormValues(this.previewTheme);
    this.isEditMode = true;
  }

  handleClickCancel(): void {
    this.setThemeFormValues(this.defaultTheme);
    this.isEditMode = false;
  }

  handleClickSave(): void {
    // save logic here
    this.isEditMode = false;
  }

  ngOnInit(): void {
    this.themeService.getDefault();
    this.currentThemeSubscription();
    this.themeFormValueChangesSubscription();
  }

  ngOnDestroy(): void {
    this.notifier$.next(null);
    this.notifier$.complete()
  }
}
