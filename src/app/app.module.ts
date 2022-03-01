import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';

import { environment } from '@att/environments/environment';

import { CoreModule } from './core/core.module';
import { AppContainer } from './app.container';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppContainer],
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
  bootstrap: [AppContainer],
})
export class AppModule { }
