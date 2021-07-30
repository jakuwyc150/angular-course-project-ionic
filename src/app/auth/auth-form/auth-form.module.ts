import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthFormPageRoutingModule } from './auth-form-routing.module';

import { AuthFormPage } from './auth-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthFormPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AuthFormPage]
})
export class AuthFormPageModule {}
