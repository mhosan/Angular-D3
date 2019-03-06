import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicoPuntosComponent } from './ejemplos/basico-puntos/basico-puntos.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicoPuntosComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
