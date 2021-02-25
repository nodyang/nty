import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SetupModule { }
