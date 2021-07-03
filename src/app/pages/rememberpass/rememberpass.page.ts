import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rememberpass',
  templateUrl: './rememberpass.page.html',
  styleUrls: ['./rememberpass.page.scss'],
})
export class RememberpassPage implements OnInit {
  isPc = false;
  constructor() { }

  ngOnInit() {
  }

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
