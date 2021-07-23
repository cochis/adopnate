/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  isPc = false;
  public user$: Observable<User> = this.auth.afAuth.user;
  constructor(private auth: AuthService,
    private funService: FunctionsService) { }

  ngOnInit() {
  }
  async reSendVerification(): Promise<void> {
    try {
      await this.auth.sendVerificationEmail();
    }
    catch (error) {
      console.log('error  =>', error);
    }

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
  ngOnDestroy(): void {
    this.auth.logOut();
  }
}
