import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BasicoPuntosComponent } from './ejemplos/basico-puntos/basico-puntos.component';
import { BasicoConPlantillaComponent } from './ejemplos/basico-con-plantilla/basico-con-plantilla.component';
import { TreeComponent } from './ejemplos/tree/tree.component';
import { PieComponent } from './ejemplos/pie/pie.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicoPuntosComponent,
    BasicoConPlantillaComponent,
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
