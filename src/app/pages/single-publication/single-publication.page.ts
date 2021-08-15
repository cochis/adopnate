/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { FunctionsService } from 'src/app/services/functions.service';
import { PetService } from 'src/app/services/pets.service';
import { SeoService } from 'src/app/services/seo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
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
  slides = [];
  pet: any;
  uidPet = '';
  isPc = false;
  usr: User;
  user: User;
  authenticated = false;
  checkEdit = false;

  constructor(
    private seo: SeoService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
    private petService: PetService,
    private funService: FunctionsService,
    private usuarioService: UsuariosService) {
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
    if (this.funService.getLocal('user')) {
      this.user = this.funService.getLocal('user');
    }
    console.log(this.user);
    console.log(this.pet.userUid);
    if (this.user) {
      if (this.user.uid === this.pet.userUid) {
        this.checkEdit = true;
        console.log(this.user);
      }
    }
    this.funService.createLinkForCanonicalURL();
    const t = 'AdopNate | El es ' + this.pet.namePet;
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'AdopNate | El es ' + this.pet.namePet,
      description:
        this.pet.descriptionPet,
      keywords:
        'Salva una vida, adopta,adopción, mascota',
      slug: 'single-publication',
      colorBar: '#3F3697',
      image:
        window.location.origin + '/assets/logo/adopnate_logo.png',
    });

  }
  adoptar() {


    if (this.user || this.funService.getLocal('user')) {
      this.usuarioService.getUser(this.user.uid).subscribe((res) => {
        if (this.user) {
          const props = {
            user: res,
            pet: this.pet,
            type: 'adoption'
          };
          this.funService.setLocal('propsToAdop', props);
          this.funService.navigate('/adoptar');
          // this.funService.mostrarModal(props);
        }
      },
        (err) => {
          console.log(err);
        });
    } else {
      this.funService.sendMessage('Error', 'Necesitas estar registrado', 'Error', 'Favor de ingresar al login');
    }

  }
  regresar() {
    this.funService.navigate('/publications');
  }
  irRegistro() {
    this.funService.navigate('/register');
  }
  putImage(image) {
    const img: any = document.getElementById('imgView');
    img.src = image;
  }
  isPcV(isPcm: any) {
    console.log('isPc   publications', isPcm);
    if (isPcm.user) {
      this.user = isPcm.user;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    if (isPcm.plat === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
    console.log('User', this.user);
    console.log('authenticated', this.authenticated);
  }

}
