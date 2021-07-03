import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss'],
})
export class FormsComponent implements OnInit {
  @Input() form: any;
  title: string;
  formName: string;
  formDescription: string;
  formTitle: string;
  formFunction: string;
  inputs: [];
  constructor() { }

  ngOnInit() {
    this.formName = this.form.form;
    this.formDescription = this.form.formDescription;
    this.formTitle = this.form.formTitle;
    this.formFunction = this.form.function;
    this.inputs = this.form.inputs;

  }

}
