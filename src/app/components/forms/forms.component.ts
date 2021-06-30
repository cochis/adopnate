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
    console.log(this.form);
    this.formName = this.form.form;
    this.formDescription = this.form.formDescription;
    this.formTitle = this.form.formTitle;
    this.formFunction = this.form.function;
    this.inputs = this.form.inputs;
    console.log('this.formName',this.formName);
    console.log('this.formDescription',this.formDescription);
    console.log('this.formTitle',this.formTitle);
    console.log('this.formFunction',this.formFunction);
    console.log('this.inputs',this.inputs);

  }

}
