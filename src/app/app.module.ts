import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '@att/environments/environment';

import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    // Angular
    BrowserModule,
    BrowserAnimationsModule,

    // Akita
    environment.production ? [] : AkitaNgDevtools.forRoot(),

    // Core module
    CoreModule,

    // Routing
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
