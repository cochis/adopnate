import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  forgotPasswordForm: FormGroup;
  submitted = false;
  isPc = false;
  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private funService: FunctionsService) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    });
  }
  async onResetPassword() {
    this.submitted = true;
    const email = this.forgotPasswordForm.value.email;
    console.log('email => ', email);
    try {
      await this.auth.resetPassword(email);
      this.funService.navigate('/login');
    }
    catch (error) {
      console.log('error=>', error);
    }
  }

  get errorCtr() {
    return this.forgotPasswordForm.controls;
  }
  isPcV(isPcm: string) {
    console.log('isPc   publications', isPcm);
    if (isPcm === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
  }
}
