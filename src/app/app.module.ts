import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeService } from './services/theme.service';
import { ProfileComponent } from './profile/profile.component';
import { ThemeDataService } from './services/theme-data.service';

@NgModule({
  declarations: [ AppComponent, ProfileComponent ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [ ThemeService, ThemeDataService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
