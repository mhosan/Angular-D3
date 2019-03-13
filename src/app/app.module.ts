import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PuntosComponent } from './ejemplos/puntos/puntos.component';
import { BarrasComponent } from './ejemplos/barras/barras.component';
import { TreeComponent } from './ejemplos/tree/tree.component';
import { PieComponent } from './ejemplos/pie/pie.component';
import { LineasComponent } from './ejemplos/lineas/lineas.component';
import { EncabezadoComponent } from './encabezado/encabezado.component';

const routes: Routes = [
  { path: 'barras', component: BarrasComponent },
  { path: 'lineas', component: LineasComponent },
  { path: 'tortas', component: PieComponent },
  { path: 'puntos', component: PuntosComponent },
  { path: '', component: PuntosComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    PuntosComponent,
    EncabezadoComponent,
    BarrasComponent,
    TreeComponent,
    PieComponent,
    LineasComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
