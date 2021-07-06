/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
})
export class PublicationsPage implements OnInit {
  data: any[]=[];
  // eslint-disable-next-line id-blacklist
  number = 50;
  token: string;
  nextStep = false;
  @ViewChild( IonInfiniteScroll ) inifiteScroll: IonInfiniteScroll;
  publication: any[]=[];

  isPc= false;
  constructor(private funService: FunctionsService) {
    this.createData();
   }

  ngOnInit() {
    this.token = this.funService.getLocal('token');
  }
  loadData( event ) {
    this.nextStep = false;
    setTimeout(() => {
      if ( this.data.length > 50 ) {
        this.inifiteScroll.complete();
        this.inifiteScroll.disabled = true;
        this.nextStep = true;
        return;
      }
      const nuevoArr = Array(5);
      this.data.push( ...nuevoArr );
      // event.target.complete();
      this.inifiteScroll.complete();
      this.nextStep = true;
    }, 250);
  }
  createData(){
    const publication: any =     {
      uId: 'Simon Grimm',
      user: 'User',
      desc:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem exercitationem sapiente quisquam laborum eum',
      pets: {
        name: 'gorda',
        picture: 'perro.jpg',
        age: 12
      },
      addrees: {
        street:'violeta',
        numberAddrees: '12b',
        phone: '55157456781'
      }
    };
    for( let i =0 ; i < this.number ; i++){
      this.data.push(publication);
    }
    this.nextStep = true;
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

  add() {
    this.funService.navigateTo('/create-publication');
  }
}
