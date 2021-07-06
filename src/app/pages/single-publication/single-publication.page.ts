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
   pictures: { img: string;titulo: string;desc: string }[] = [
    {
      img: 'assets/img/perro.jpg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: 'assets/img/perro1.jpg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: 'assets/img/perro2.jpg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: 'assets/img/perro3.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
    ,
    {
      img: 'assets/img/perro4.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];


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
