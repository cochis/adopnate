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
    this.token = this.funService.getLocal('token');
  }
  seePet(item) {
    // console.log('single-publication/'+ this.item.uId);
    // const url: string ='single-publication/'+ this.item.uId;
    // this.router.navigate(['/single-publication'], { queryParams: { uId: 'popular' } });
    // this.funService.navigate( url );
    item.type='viewPet';
    console.log(item);
    this.funService.mostrarModal(item).then(res=>{
      console.log(res.props.type);
      if(res.props.type ==='adoption'){
        console.log('Entro a adopcion');
        this.funService.mostrarModal(item).then(reps=>{
          console.log(reps);
        });
      }
      else   if(res.props.type ==='donation'){
        console.log('Entro a donacion');
        this.funService.mostrarModal(item).then(reps=>{
          console.log(reps);
          });
      }
      else   if(res.props.type === 'register'){
        console.log('Entro a registro');
        this.funService.mostrarModal(item).then(reps=>{
          console.log(reps);
          });
      }
      });
  }
}
