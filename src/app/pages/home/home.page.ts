import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isPc = false;
  constructor() {}
  isPcV(isPcm: string) {
    console.log('isPc   publications', isPcm);
    if (isPcm ==='Desktop'){
      this.isPc= true;
    }
    else {
      this.isPc = false;
    }
    }

}
