import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TarjetaCreditoComponent } from './components/tarjeta-credito/tarjeta-credito.component';

const appRoutes: Routes = [
  {
    path: '',
    component: TarjetaCreditoComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
