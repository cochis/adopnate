/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Observable } from 'rxjs';
import { PetModel } from 'src/app/models/pet.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { PetService } from 'src/app/services/pets.service';
import { LikeService } from 'src/app/services/like.service';
import { SeoService } from 'src/app/services/seo.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-publications',
  templateUrl: './publications.page.html',
  styleUrls: ['./publications.page.scss'],
})
export class PublicationsPage implements OnInit {
  data: any[] = [];
  // eslint-disable-next-line id-blacklist
  number = 50;
  token: string;
  nextStep = false;
  @ViewChild(IonInfiniteScroll) inifiteScroll: IonInfiniteScroll;
  publication: any[] = [];

  isPc = false;
  public user$: Observable<User> = this.auth.afAuth.user;
  authenticated = false;
  pets: PetModel[] = [];
  filtro = '';
  filtroPipeUser = '';
  filtroPipePet = '';
  count = 0;
  lastDocument = null;
  columnaBusqueda = '';
  userCurrent: any;
  likesByUser: any;
  constructor(
    private auth: AuthService,
    private funService: FunctionsService,
    private likeService: LikeService,
    private petService: PetService,
    private seo: SeoService,
    private title: Title,) {
    this.createData();
    this.user$.subscribe(res => {
      // console.log('usr$', res);
      if (res !== null) {
        this.authenticated = true;
      } else {
        this.authenticated = false;
      }
      // console.log('this.authenticated => ', this.authenticated);
    });

    const t = 'Adopnate a pet | Ven y conoce a tu nuevo compañero de vida';
    this.title.setTitle(t);

    this.seo.generateTags({
      title: 'Adopnate a pet | Ven y conoce a tu nuevo compañero de vida',
      description:
        'Selecciona a tu nuevo compañero de vida',
      keywords:
        'Publicaciones disponibles para la elección de tu compañero',
      slug: 'publications',
      colorBar: '#3f3697',
      image:
        window.location.origin + '/assets/logo/adopnate_logo.png',
    });


  }
  ngOnInit() {
    this.userCurrent = this.funService.getLocal('user');
    this.petService.getPets()
      .subscribe((res) => {
        // console.log(res);
        this.pets = res;
        // console.log(this.pets);
      },
        (err) => {
          console.log(err);
        });
    this.likeService.getLikes().subscribe((res) => {
      this.likesByUser = res;
    });
  }
  loadData(event) {
    this.nextStep = false;
    setTimeout(() => {
      if (this.data.length > 50) {
        this.inifiteScroll.complete();
        this.inifiteScroll.disabled = true;
        this.nextStep = true;
        return;
      }
      const nuevoArr = Array(5);
      this.data.push(...nuevoArr);
      // event.target.complete();
      this.inifiteScroll.complete();
      this.nextStep = true;
    }, 250);
  }
  createData() {
    const publication: any = {
      uId: 'SimonGrimm',
      user: {
        nameUser: 'Cochis',
        lastNameUser: 'Ramirez',
        surNameUser: 'rosas',
        ageUser: 36,
        ocupationUser: 'Enginer',
        adressUser: {
          streetAdress: 'Madrugada',
          numberAdressExt: '25b',
          numberAdressInt: '25b',
          coloniAdress: 'Benito juarez',
          cityAdress: 'Nezahualcoyotl',
          stateAdress: 'Mexico',
          cpAdress: 57000,
        },
        conexionUser: {
          phoneHome: {
            visible: true,
            value: '5557434444'
          },
          phoneCel: {
            visible: true,
            value: '5515380666'
          },
          email: {
            visible: false,
            value: 'ing.oarrs@gmail.com'
          }
        },
        descriptionUser: 'Lorem hdkjkl jdkasjkl sajdkajkdlasjkdsak dj djasdjas dsadsiako dasniej wqnndn a jdksajdk sa j',
        activatedUser: true,
        dateCreated: 123456789
      },
      pets: [
        {
          uId: '111',
          uid: 'SimonGrimm',
          categoriesPet: [
            {
              type: 'Tipo mascota',
              value: 'Canino'
            },
            {
              type: 'Tipo de raza',
              value: 'Raza unica'
            },
            {
              type: 'Edad',
              value: 'Adulto'
            },
            {
              type: 'Genero',
              value: 'Macho'
            },
            {
              type: 'Tamaño de raza',
              value: 'Pequeño'
            }
          ],
          namePet: 'gorda',
          picturePet: [{
            picture: 'assets/img/perro.jpg',
            desc: 'hjdajdka mndkoajmdokasmd kdaskmdlas kdaskmldas'
          },
          {
            picture: 'assets/img/perro1.jpg',
            desc: 'hjdajdka mndkoajmdokasmd kdaskmdlas kdaskmldas'
          },
          {
            picture: 'assets/img/perro2.jpg',
            desc: 'hjdajdka mndkoajmdokasmd kdaskmdlas kdaskmldas'
          },
          {
            picture: 'assets/img/perro3.jpg',
            desc: 'hjdajdka mndkoajmdokasmd kdaskmdlas kdaskmldas'
          },
          {
            picture: 'assets/img/perro4.jpg',
            desc: 'hjdajdka mndkoajmdokasmd kdaskmdlas kdaskmldas'
          }],
          agePet: 12,
          qualitysPet: [{
            sentence: 'Adaptacion a departamento',
            value: 1
          },
          {
            sentence: 'Afectuoso con la familia',
            value: 2
          },
          {
            sentence: 'Amigable con extrañoso',
            value: 3
          },
          {
            sentence: 'Amigable con los niños',
            value: 4
          },
          {
            sentence: 'Necesidad de ejercicio',
            value: 1
          },
          {
            sentence: 'Necesidad de jugar',
            value: 2
          },
          {
            sentence: 'Nivel de energía',
            value: 0
          },
          {
            sentence: 'Tendencia a ladrar o aullar',
            value: 3
          }
          ],
          descriptionPet: 'Lorem hdkjkl jdkasjkl sajdkajkdlasjkdsak dj djasdjas dsadsiako dasniej wqnndn a jdksajdk sa j',
          adoptatedPet: false,
          dateCreated: 1234567897894
        }
      ]
    };
    for (let i = 0; i < this.number; i++) {
      this.data.push(publication);
    }
    this.nextStep = true;
  }
  isPcV(isPcm: string) {
    // console.log('isPc   publications', isPcm);
    if (isPcm === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
  }

  add() {
    // console.log('add');
    this.funService.navigateTo('/create-publication');
  }
  searchBar(event) {
    this.filtro = event.filter;
    this.columnaBusqueda = event.text;
  }

  agregarRegistros() {
  }
}
