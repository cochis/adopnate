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
  seePet() {
    // console.log('single-publication/'+ this.item.uId);
    const url: string ='single-publication/'+ this.item.uId;

    // this.router.navigate(['/single-publication'], { queryParams: { uId: 'popular' } });
    this.funService.navigate( url );
  }
}
