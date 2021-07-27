import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FunctionsService } from 'src/app/services/functions.service';
import { PetService } from 'src/app/services/pets.service';
import { PetModel } from '../../models/pet.model';

@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.page.html',
  styleUrls: ['./single-publication.page.scss'],
})


export class SinglePublicationPage implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    pagination: true,
    speed: 5000
  };
  slides=[];
  pet: any;
  uidPet = '';
  isPc = false;
  pictures: { img: string; titulo: string; desc: string }[] = [
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


  constructor(private activatedRoute: ActivatedRoute,
    private petService: PetService,
    private funService: FunctionsService) {
    this.activatedRoute.params.subscribe(params => {
      this.uidPet = params.id;
      console.log(this.uidPet);


      if (this.funService.getLocal(this.uidPet)) {
        this.pet = this.funService.getLocal(this.uidPet);
        console.log(this.pet);
        this.slides = this.pet.picturesPet;
      }
      else {
        this.petService.getPet(this.uidPet).subscribe((res) => {
          this.pet = res;
          console.log(this.pet);
          this.funService.setLocal(this.uidPet, this.pet);
          this.slides = this.pet.picturesPet;
        },
          (err) => {
            console.log(err);
          });
      }
    });
  }
  ngOnInit() {
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
