import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupComponent } from './setup.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzButtonModule} from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';



@NgModule({
  declarations: [SetupComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzLayoutModule,
    ReactiveFormsModule
  ]
})
export class SetupModule { }
