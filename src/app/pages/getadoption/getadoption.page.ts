/* eslint-disable use-isnan */
/* eslint-disable max-len */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PetModel } from 'src/app/models/pet.model';
import { RequestModel } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { FunctionsService } from 'src/app/services/functions.service';
import { RequestService } from 'src/app/services/request.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-getadoption',
  templateUrl: './getadoption.page.html',
  styleUrls: ['./getadoption.page.scss'],
})
export class GetadoptionPage implements OnInit {
  isPc = false;
  authenticated = false;
  qualitysPet = [];
  requesterForm: FormGroup;
  submitted = false;
  publisher = 'personal';
  user: User;
  pet: PetModel;
  request: RequestModel;
  props: any;
  constructor(
    private funService: FunctionsService,
    private requestService: RequestService,
    private usuariosService: UsuariosService,
    public formBuilder: FormBuilder,
  ) { }

  ngOnInit() {

    this.props = this.funService.getLocal('propsToAdop');
    this.user = this.props.user;
    this.pet = this.props.pet;
    this.createForm();
    this.cargarDataAlFormulario();
    this.qualitysPet = this.pet.qualitysPet;
  }
  get errorCtr() {
    return this.requesterForm.controls;
  }
  createForm() {
    this.requesterForm = this.formBuilder.group({
      nameUser: ['', [Validators.required, Validators.minLength(3)]],
      lastNameUser: ['', [Validators.required, Validators.minLength(3)]],
      surNameUser: [''],
      ageUser: ['', [Validators.required, Validators.min(18)]],
      phoneHome: [''],
      phoneCel: [''],
      birthDate: [''],
      ocupationUser: ['', Validators.required],
      emailUser: ['', Validators.required],
      streetAdressUser: ['', Validators.required],
      numberAdressExt: ['', Validators.required],
      numberAdressInt: [''],
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
  cargarDataAlFormulario() {
    this.requesterForm.reset({
      nameUser: (this.user.nameUser !== null && this.user.nameUser !== undefined && this.user.nameUser !== '') ? this.user.nameUser : '',
      lastNameUser: (this.user.lastNameUser !== null && this.user.lastNameUser !== undefined && this.user.lastNameUser !== '') ? this.user.lastNameUser : '',
      surNameUser: (this.user.surNameUser !== null && this.user.surNameUser !== undefined && this.user.surNameUser !== '') ? this.user.surNameUser : '',
      ageUser: (this.user.ageUser !== null && this.user.ageUser !== undefined && this.user.ageUser !== NaN) ? this.user.ageUser : '',
      phoneHome: (this.user.conexionUser.phoneHome.value !== null && this.user.conexionUser.phoneHome.value !== undefined && this.user.conexionUser.phoneHome.value !== '') ? this.user.conexionUser.phoneHome.value : '',
      phoneCel: (this.user.conexionUser.phoneCel.value !== null && this.user.conexionUser.phoneCel.value !== undefined && this.user.conexionUser.phoneCel.value !== '') ? this.user.conexionUser.phoneCel.value : '',
      birthDate: (this.user.birthDate !== null && this.user.birthDate !== undefined) ? this.user.birthDate : '',
      ocupationUser: (this.user.ocupationUser !== null && this.user.ocupationUser !== undefined && this.user.ocupationUser !== '') ? this.user.ocupationUser : '',
      emailUser: (this.user.email !== null && this.user.email !== undefined && this.user.email !== '') ? this.user.email : '',
      streetAdressUser: (this.user.adressUser.streetAdress !== null && this.user.adressUser.streetAdress !== undefined && this.user.adressUser.streetAdress !== '') ? this.user.adressUser.streetAdress : '',
      numberAdressExt: (this.user.adressUser.numberAdressExt !== null && this.user.adressUser.numberAdressExt !== undefined && this.user.adressUser.numberAdressExt !== '') ? this.user.adressUser.numberAdressExt : '',
      numberAdressInt: (this.user.adressUser.numberAdressInt !== null && this.user.adressUser.numberAdressInt !== undefined && this.user.adressUser.numberAdressInt !== '') ? this.user.adressUser.numberAdressInt : '',
      coloniAdress: (this.user.adressUser.coloniAdress !== null && this.user.adressUser.coloniAdress !== undefined && this.user.adressUser.coloniAdress !== '') ? this.user.adressUser.coloniAdress : '',
      cityAdress: (this.user.adressUser.cityAdress !== null && this.user.adressUser.cityAdress !== undefined && this.user.adressUser.cityAdress !== '') ? this.user.adressUser.cityAdress : '',
      stateAdress: (this.user.adressUser.stateAdress !== null && this.user.adressUser.stateAdress !== undefined && this.user.adressUser.stateAdress !== '') ? this.user.adressUser.stateAdress : '',
      cpAdress: (this.user.adressUser.cpAdress !== null && this.user.adressUser.cpAdress !== undefined) ? this.user.adressUser.cpAdress : '',
      whyAdop: '',
      haveOtherAnimal: '',
      hadOtherAnimal: '',
      houseApartment: '',
      arrendadoresAcepted: '',
      agesLive: '',
      leaveDay: '',
      whereWho: '',
      whereSleep: '',
      timeWithOut: '',
      whoPay: ''
    });
  }
  isPcV(isPcm: string) {
    if (isPcm === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
  }
  cancelar() {
    this.funService.navigate('/publications');
  }
  getDate(event) {

    console.log(event.detail.value);
    const age = this.funService.calcularEdad(event.detail.value);
    console.log(age);
    this.requesterForm.reset({
      nameUser: this.requesterForm.value.nameUser,
      lastNameUser: this.requesterForm.value.lastNameUser,
      surNameUser: this.requesterForm.value.surNameUser,
      ageUser: Number(age),
      phoneHome: this.requesterForm.value.phoneHome,
      phoneCel: this.requesterForm.value.phoneCel,
      birthDate: this.requesterForm.value.birthDate,
      ocupationUser: this.requesterForm.value.ocupationUser,
      emailUser: this.requesterForm.value.emailUser,
      streetAdressUser: this.requesterForm.value.streetAdressUser,
      numberAdressExt: this.requesterForm.value.numberAdressExt,
      numberAdressInt: this.requesterForm.value.numberAdressInt,
      coloniAdress: this.requesterForm.value.coloniAdress,
      cityAdress: this.requesterForm.value.cityAdress,
      stateAdress: this.requesterForm.value.stateAdress,
      cpAdress: this.requesterForm.value.cpAdress,
      whyAdop: this.requesterForm.value.whyAdop,
      haveOtherAnimal: this.requesterForm.value.haveOtherAnimal,
      hadOtherAnimal: this.requesterForm.value.hadOtherAnimal,
      houseApartment: this.requesterForm.value.houseApartment,
      arrendadoresAcepted: this.requesterForm.value.arrendadoresAcepted,
      agesLive: this.requesterForm.value.agesLive,
      leaveDay: this.requesterForm.value.leaveDay,
      whereWho: this.requesterForm.value.whereWho,
      whereSleep: this.requesterForm.value.whereSleep,
      timeWithOut: this.requesterForm.value.timeWithOut,
      whoPay: this.requesterForm.value.whoPay
    });
  }
  segmentChanged(event) {
    console.log(event);
    this.publisher = event.detail.value;
  }
  adoptar() {
    console.log('adoptar');
  }
  sendRequest() {
    const errors = [];
    let err;
    console.log('this.requesterForm   ', this.requesterForm);
    if (this.requesterForm.value.nameUser === '') {
      err = {
        value: 'El campo de nombre es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.lastNameUser === '') {
      err = {
        value: 'El campo de apellido paterno es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.ageUser < 18) {
      err = {
        value: 'Tiene que ser mayor de edad'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.phoneHome === '' && this.requesterForm.value.phoneCel === '') {
      err = {
        value: 'Tiene que ingresar por lo menos un número de contacto'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.ocupationUser === '') {
      err = {
        value: 'El campo de ocupación es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.emailUser === '') {
      err = {
        value: 'El campo de correo electrónico es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.streetAdressUser === '') {
      err = {
        value: 'El campo de dirección es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.numberAdressExt === '') {
      err = {
        value: 'El campo de número exterior es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.coloniAdress === '') {
      err = {
        value: 'El campo de colonia es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.cityAdress === '') {
      err = {
        value: 'El campo de delegación o municipio es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.stateAdress === '') {
      err = {
        value: 'El campo de estado es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.cpAdress === '') {
      err = {
        value: 'El campo de código postal es requerido'
      };
      errors.push(err);
    }
    if (this.requesterForm.value.whyAdop === '' ||
      this.requesterForm.value.haveOtherAnimal === '' ||
      this.requesterForm.value.hadOtherAnimal === '' ||
      this.requesterForm.value.houseApartment === '' ||
      this.requesterForm.value.arrendadoresAcepted === '' ||
      this.requesterForm.value.agesLive === '' ||
      this.requesterForm.value.leaveDay === '' ||
      this.requesterForm.value.whereWho === '' ||
      this.requesterForm.value.whereSleep === '' ||
      this.requesterForm.value.timeWithOut === '' ||
      this.requesterForm.value.whoPay === '') {
      err = {
        value: 'Falta responder alguna pregunta'
      };
      errors.push(err);
    }
    if (errors.length === 0) {
      this.submitRequest();
    } else {
      this.funService.sendMessage('Error', 'Favor de corregir estos errores', 'errores', errors, true);
      console.log(errors);
    }
  }

  submitRequest() {
    console.log(this.requesterForm.value);
    this.user = {
      uid: this.user.uid,
      roleUser: undefined,
      displayName: this.requesterForm.value.nameUser + ' ' + this.requesterForm.value.lastNameUser + ' ' + this.requesterForm.value.surNameUser,
      email: this.user.email,
      emailVerified: this.user.emailVerified,
      nameUser: this.requesterForm.value.nameUser,
      lastNameUser: this.requesterForm.value.lastNameUser,
      surNameUser: this.requesterForm.value.surNameUser,
      ageUser: this.requesterForm.value.ageUser,
      birthDate: this.requesterForm.value.birthDate,
      ocupationUser: this.requesterForm.value.ocupationUser,
      adressUser: {
        streetAdress: this.requesterForm.value.streetAdressUser,
        numberAdressExt: this.requesterForm.value.numberAdressExt,
        numberAdressInt: this.requesterForm.value.numberAdressInt,
        coloniAdress: this.requesterForm.value.coloniAdress,
        cityAdress: this.requesterForm.value.cityAdress,
        stateAdress: this.requesterForm.value.stateAdress,
        cpAdress: this.requesterForm.value.cpAdress
      },
      conexionUser: {
        phoneHome: {
          visible: true,
          value: this.requesterForm.value.phoneHome
        },
        phoneCel: {
          visible: true,
          value: this.requesterForm.value.phoneCel
        },
        email: {
          visible: true,
          value: this.user.email
        }
      },
      // dateCreated: this.user.dateCreated
    };
    console.log(this.user);
    console.log(this.pet);

    this.request = {
      uid: this.funService.getId(),
      userUid: this.user.uid,
      petUid: this.pet.uid,
      dateBegin: this.funService.getTime(),
      viewNotification: false,
      contact: false,
      dateContact: null,
      dateEnd: null,
      qts1: this.requesterForm.value.whyAdop,
      qts2: this.requesterForm.value.haveOtherAnimal,
      qts3: this.requesterForm.value.hadOtherAnimal,
      qts4: this.requesterForm.value.houseApartment,
      qts5: this.requesterForm.value.arrendadoresAcepted,
      qts6: this.requesterForm.value.agesLive,
      qts7: this.requesterForm.value.leaveDay,
      qts8: this.requesterForm.value.whereWho,
      qts9: this.requesterForm.value.whereSleep,
      qts10: this.requesterForm.value.timeWithOut,
      qts11: this.requesterForm.value.whoPay,
      adopted: false
    };
    console.log(this.request);
    const userUpdated = this.requestService.updateRequest(this.request);
    const request = this.usuariosService.updateUserData(this.user);
    console.log(userUpdated);
    console.log(request);
    this.requesterForm.reset();
    this.publisher= 'personal';
    this.funService.navigate('/publications');
  }
}
