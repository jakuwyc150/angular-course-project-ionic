import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../store/app.reducer';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.page.html',
  styleUrls: ['./auth-form.page.scss'],
})
export class AuthFormPage implements OnInit {
  authForm: FormGroup;
  error: string;
  isLoading = false;

  constructor(
    private alertController: AlertController,
    private formBuilder: FormBuilder,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit() {
    this.initForm();

    this.store.select('auth').subscribe(async (authState) => {
      this.error = authState.authError;
      this.isLoading = authState.loading;

      if (this.error) {
        await this.alertController.create({
          buttons: ['OK'],
          header: 'Authentication failed',
          message: this.error
        });
      }
    });
  }

  formSubmit() {
    this.store.dispatch(AuthActions.loginStart({
      email: this.authForm.value.userEmail,
      password: this.authForm.value.userPassword
    }));

    this.authForm.reset();
  }

  private initForm() {
    this.authForm = this.formBuilder.group({
      userEmail: ['', [
        Validators.required,
        Validators.email
      ]],

      userPassword: ['', [
        Validators.required,
        Validators.minLength(3)
      ]]
    });
  }
}
