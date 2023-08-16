import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

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
    HttpClientModule
  ],
  providers: [ ThemeService, ThemeDataService ],
  bootstrap: [ AppComponent ],
})
export class AppModule {}
