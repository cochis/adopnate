import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FunctionsService } from 'src/app/services/functions.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  columna = '';
  constructor(private funService: FunctionsService) { }

  ngOnInit() { }
  onSearchChange(event) {
    const toSend = {
      text:  this.columna,
      filter: event.detail.value
    };
    this.messageEvent.emit(toSend);
  }
  select(event) {
    console.log(event);
    this.columna = event.detail.value;
  }
}
