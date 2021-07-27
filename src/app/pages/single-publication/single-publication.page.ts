import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { FunctionsService } from 'src/app/services/functions.service';
import { PetService } from 'src/app/services/pets.service';
import { SeoService } from 'src/app/services/seo.service';
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
  checkEdit = false;

  constructor(
    private seo: SeoService,
    private title: Title,
    private activatedRoute: ActivatedRoute,
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
    this.usr = this.funService.getLocal('user');
    console.log(this.usr.uid);
    console.log(this.pet.userUid);
    if (this.usr.uid === this.pet.userUid) {
      this.checkEdit = true;
      console.log(this.usr);
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
  putImage(image){
    const  img: any = document.getElementById('imgView');
    img.src = image;
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
