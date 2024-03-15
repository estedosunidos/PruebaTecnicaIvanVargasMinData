import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@angular/cdk/dialog';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[
    DialogModule,
    ButtonModule
  ]
})
export class PrimeNGModule { }
