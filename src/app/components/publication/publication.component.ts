import { Component, Input, OnInit } from '@angular/core';
import { LikeModel } from 'src/app/models/like.model';
import { User } from 'src/app/models/user.model';
import { LikeService } from 'src/app/services/like.service';
import { FunctionsService } from '../../services/functions.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  @Input() item: any;
  @Input() count: any;
  userCurrent: User;
  token: string;
  isPc = false;
  likeCheck = false;
  like: LikeModel = new LikeModel();
  thisLike = '';
  slides = [];
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true,
    pagination: true,
    speed: 5000
  };
  constructor(private funService: FunctionsService,
    private likeService: LikeService,
    private socialSharing: SocialSharing,
    private platform: Platform
  ) { }

  ngOnInit() {
    this.userCurrent = this.funService.getLocal('user');
    this.slides = this.item.picturesPet;
    console.log('on init', this.item);

    this.getUnique();
  }

  async getUnique() {
    this.thisLike = this.item.uid + '' + this.userCurrent.uid;
    // console.log(' this.thisLike =====>>>>>' + this.thisLike);
    if (this.funService.getLocal(this.thisLike)) {
      const lk = this.funService.getLocal(this.thisLike);
      this.likeCheck = lk.actived;

    } else {
      if (this.funService.getLocal('user')) {
        this.likeService.getLikeUnique(this.item.uid, this.userCurrent.uid).subscribe(res => {
          if (res.length > 0) {
            this.likeCheck = res[0].actived;
            const userLike = res[0].uid + '' + res[0].uid;
            if (this.funService.getLocal('user')) {
              this.funService.setLocal(userLike, res[0]);
            }
          }
        },
          err => {
            console.log(err);
            this.likeCheck = false;
          });
      }
    }
  }
  seePet(item) {
    // console.log('single-publication/'+ this.item.uId);
    // const url: string ='single-publication/'+ this.item.uId;
    // this.router.navigate(['/single-publication'], { queryParams: { uId: 'popular' } });
    // this.funService.navigate( url );
    item.type = 'viewPet';
    this.funService.mostrarModal(item).then(res => {
      if (res.props.type === 'adoption') {
        this.funService.mostrarModal(item).then(reps => {
          if (!reps.props.auth && reps.props.type === 'adoption' && reps.props.role === 'userAdopted') {
            this.funService.navigateTo('/register');
          }
        });
      }
      else if (res.props.type === 'donation') {
        this.funService.mostrarModal(item).then(reps => {
          console.log(reps);
        });
      }
      else if (res.props.type === 'register') {
        this.funService.mostrarModal(item).then(reps => {
          console.log(reps);
        });
      }
    });
  }
  share() {
    console.log(this.platform);
    if (this.platform.is('cordova')) {
      this.socialSharing.share(
        this.item.namePet,
        this.item.descriptionPet,
        '',
        'https://adopnate-3a16c.firebaseapp.com/publications'
      );
    } else {
      console.log(navigator.share);
      if (navigator.share) {
        navigator.share({
          title: this.item.namePet,
          text: this.item.descriptionPet,
          url: 'https://adopnate-3a16c.firebaseapp.com/publications'
        })
          .then(() => console.log('Successful share'))
          .catch((error) => console.log('Error sharing', error));
      } else {
        console.log('No se pudo compartir porque no se soporta');
      }
    }
  }
  likes() {
    const idL = this.funService.getId();
    if (this.likeCheck === false) {
      this.likeCheck = true;
    }
    else {
      this.likeCheck = false;
    }
    const userLike = this.item.uid + '' + this.userCurrent.uid;
    if (!this.funService.getLocal(userLike)) {
      const data: LikeModel = {
        uid: idL,
        uidPet: this.item.uid,
        uidUser: this.userCurrent.uid,
        actived: this.likeCheck,
        date: new Date().getTime()
      };
      this.funService.setLocal('idL', idL);
      this.funService.setLocal(userLike, data);
      this.likeService.updateLike(data);
    } else {
      const userLikeData = this.funService.getLocal(userLike);
      userLikeData.actived = this.likeCheck;
      this.funService.setLocal(userLike, userLikeData);
      this.likeService.updateLike(userLikeData);
    }
  }
}
