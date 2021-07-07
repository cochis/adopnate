import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FunctionsService } from 'src/app/services/functions.service';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  authenticated= false;
  slides: { img: string; titulo: string; desc: string }[] = [
    {
      img: '/assets/img/perro.jpg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/img/perro1.jpg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/img/perro2.jpg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/img/perro3.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro4.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro.jpg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/img/perro1.jpg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/img/perro2.jpg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/img/perro3.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro4.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro.jpg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/img/perro1.jpg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/img/perro2.jpg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/img/perro3.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro4.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro.jpg',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/img/perro1.jpg',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/img/perro2.jpg',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },
    {
      img: '/assets/img/perro3.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    },
    {
      img: '/assets/img/perro4.jpg',
      titulo: 'Tu ubicación',
      desc: 'Siempre sabremos donde estás!'
    }
  ];
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    speed: 5000
  };
  constructor(private navCtrl: NavController,
              private funService: FunctionsService,
              private auth: AuthService) {
                if(this.funService.getLocal('token') || this.auth.isAuth() ){
                  this.authenticated = true;
                }
              }

  ngOnInit() {}
  onClick(link) {

   this.funService.navigateTo(link);

  }

}
