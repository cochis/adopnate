import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.page.html',
  styleUrls: ['./single-publication.page.scss'],
})


export class SinglePublicationPage implements OnInit {
   heroe: any = {};
   isPc= false;
  constructor( private activatedRoute: ActivatedRoute){
    this.activatedRoute.params.subscribe( params =>{
      this.heroe =   params.id ;
        console.log(this.heroe);
  });
  }
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
