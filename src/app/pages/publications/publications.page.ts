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
  user: User;
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
  isPcV(isPcm: any) {
    console.log('isPc   publications', isPcm);
    this.user = isPcm.user;
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

  add() {
    // console.log('add');
    this.funService.navigate('/create-publication');
  }
  searchBar(event) {
    this.filtro = event.filter;
    this.columnaBusqueda = event.text;
  }

  agregarRegistros() {
  }
}
