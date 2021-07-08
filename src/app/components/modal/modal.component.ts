/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() props: any;
  authenticated= false;
  qualitysPet = [];
  requesterForm: FormGroup;
  submitted = false;
  publisher = 'personal';

  constructor(private modalCtrl: ModalController,
    public formBuilder: FormBuilder) {
    this.qualitysPet =[];
  }

  ngOnInit() {

    console.log(this.props.type);
    this.createForm();
    // console.log(this.props.pets[0].qualitysPet);
    // console.log(this.qualitysPet);
    this.qualitysPet = this.props.pets[0].qualitysPet;
    // console.log(this.qualitysPet);
    for(let i =0; i< this.qualitysPet.length;i++){
      // console.log(this.qualitysPet[i].value);
      this.qualitysPet[i].value = (this.qualitysPet[i].value/5);
      // console.log(this.qualitysPet[i].value);
    }
  }

  createForm() {
    this.requesterForm = new FormGroup({
      nameUser: new FormControl()
   });
    this.requesterForm = this.formBuilder.group({
      nameUser: ['', [Validators.required, Validators.minLength(3)]],
      lastNameUser: ['', [Validators.required, Validators.minLength(3)]],
      surNameUser: ['', Validators.required],
      ageUser: ['', Validators.required],
      ocupationUser: ['', Validators.required],
      phoneHome: ['', Validators.required],
      phoneCel: ['', Validators.required],
      emailUser: ['', Validators.required],
      streetAdressUser: ['', Validators.required],
      numberAdressExt: ['', Validators.required],
      numberAdressInt: ['', Validators.required],
      coloniAdress: ['', Validators.required],
      cityAdress: ['', Validators.required],
      stateAdress: ['', Validators.required],
      cpAdress: ['', Validators.required],
      whyAdop: ['', Validators.required],
      haveOtherAnimal: ['', Validators.required],
      hadOtherAnimal: ['', Validators.required],
      houseApartment: ['', Validators.required],
      arrendadoresAcepted: ['', Validators.required],
      agesLive: ['', Validators.required],
      leaveDay: ['', Validators.required],
      whereWho: ['', Validators.required],
      whereSleep: ['', Validators.required],
      timeWithOut: ['', Validators.required],
      whoPay: ['', Validators.required],
    });
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }
  adoptar()  {
    this.submitted = true;
    this.props.type='adoption';
    this.modalCtrl.dismiss({
      props:this.props
    });
  }


  registrarse(type) {
    this.props.typeSelection = type;
    this.modalCtrl.dismiss({
      props:this.props
    });
  }
  get errorCtr() {
    return this.requesterForm.controls;
  }

  segmentChanged( event ) {
    // console.log(event.detail.value);
    // if ( event.detail.value === 'todos' ) {
    //   return this.publisher = '';
    // }
console.log(event);
    this.publisher = event.detail.value;
  }
  changeTo(segment){
    this.publisher = segment;
  }
}
