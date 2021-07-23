import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FunctionsService } from '../../services/functions.service';
@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss'],
})
export class PublicationComponent implements OnInit {
  @Input() item: any;
  token: string;
  isPc= false;
  constructor(private funService: FunctionsService,
              private router: Router) { }

  ngOnInit() {
    console.log(this.item);
  }
  seePet(item) {
    // console.log('single-publication/'+ this.item.uId);
    // const url: string ='single-publication/'+ this.item.uId;
    // this.router.navigate(['/single-publication'], { queryParams: { uId: 'popular' } });
    // this.funService.navigate( url );
    item.type='viewPet';
    this.funService.mostrarModal(item).then(res=>{
      if(res.props.type ==='adoption'){
        this.funService.mostrarModal(item).then(reps=>{
          if(!reps.props.auth && reps.props.type === 'adoption' && reps.props.role === 'userAdopted'){
            this.funService.navigateTo('/register');
          }
        });
      }
      else   if(res.props.type ==='donation'){
        this.funService.mostrarModal(item).then(reps=>{
          console.log(reps);
          });
      }
      else   if(res.props.type === 'register'){
        this.funService.mostrarModal(item).then(reps=>{
          console.log(reps);
          });
      }
      });
  }
}
