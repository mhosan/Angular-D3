import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PuntosComponent } from './ejemplos/puntos/puntos.component';
import { BarrasComponent } from './ejemplos/barras/barras.component';
import { TreeComponent } from './ejemplos/tree/tree.component';
import { PieComponent } from './ejemplos/pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    PuntosComponent,
    BarrasComponent,
    TreeComponent,
    PieComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
