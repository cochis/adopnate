/* eslint-disable use-isnan */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RequestModel } from 'src/app/models/request.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FunctionsService } from 'src/app/services/functions.service';
import { RequestService } from 'src/app/services/request.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() props: any;
  authenticated = false;
  qualitysPet = [];
  requesterForm: FormGroup;
  submitted = false;
  publisher = 'personal';
  user: User;
  request: RequestModel;


  constructor(private modalCtrl: ModalController,
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private funService: FunctionsService,
    private requestService: RequestService,
    private usuariosService: UsuariosService) {
    this.qualitysPet = [];
    if (this.funService.getLocal('token') || this.auth.isAuth()) {
      this.authenticated = true;
    }
  }

  ngOnInit() {
    console.log(this.props.user);
    this.createForm();
    this.qualitysPet = this.props.pet.qualitysPet;
    this.cargarDataAlFormulario();

    console.log(this.requesterForm);
    // for(let i =0; i< this.qualitysPet.length;i++){
    //   this.qualitysPet[i].value = (this.qualitysPet[i].value/5);
    // }
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

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

  cargarDataAlFormulario() {
    this.requesterForm.reset({
      nameUser: (this.props.user.nameUser !== null && this.props.user.nameUser !== undefined && this.props.user.nameUser !== '') ? this.props.user.nameUser : '',
      lastNameUser: (this.props.user.lastNameUser !== null && this.props.user.lastNameUser !== undefined && this.props.user.lastNameUser !== '') ? this.props.user.lastNameUser : '',
      surNameUser: (this.props.user.surNameUser !== null && this.props.user.surNameUser !== undefined && this.props.user.surNameUser !== '') ? this.props.user.surNameUser : '',
      ageUser: (this.props.user.ageUser !== null && this.props.user.ageUser !== undefined && this.props.user.ageUser !== '' && this.props.user.ageUser !== NaN) ? this.props.user.ageUser : '',
      phoneHome:(this.props.user.conexionUser.phoneHome.value !== null && this.props.user.conexionUser.phoneHome.value !== undefined && this.props.user.conexionUser.phoneHome.value !== '' && this.props.user.conexionUser.phoneHome.value !== NaN) ? this.props.user.conexionUser.phoneHome.value : '',
      phoneCel:(this.props.user.conexionUser.phoneCel.value !== null && this.props.user.conexionUser.phoneCel.value !== undefined && this.props.user.conexionUser.phoneCel.value !== '' && this.props.user.conexionUser.phoneCel.value !== NaN) ? this.props.user.conexionUser.phoneCel.value : '',
      birthDate: (this.props.user.birthDate !== null && this.props.user.birthDate !== undefined && this.props.user.birthDate !== '') ? this.props.user.birthDate : '',
      ocupationUser: (this.props.user.ocupationUser !== null && this.props.user.ocupationUser !== undefined && this.props.user.ocupationUser !== '') ? this.props.user.ocupationUser : '',
      emailUser: (this.props.user.email !== null && this.props.user.email !== undefined && this.props.user.email !== '') ? this.props.user.email : '',
      streetAdressUser: (this.props.user.adressUser.streetAdress !== null && this.props.user.adressUser.streetAdress !== undefined && this.props.user.adressUser.streetAdress !== '') ? this.props.user.adressUser.streetAdress : '',
      numberAdressExt:  (this.props.user.adressUser.numberAdressExt !== null && this.props.user.adressUser.numberAdressExt !== undefined && this.props.user.adressUser.numberAdressExt !== '') ? this.props.user.adressUser.numberAdressExt : '',
      numberAdressInt: (this.props.user.adressUser.numberAdressInt !== null && this.props.user.adressUser.numberAdressInt !== undefined && this.props.user.adressUser.numberAdressInt !== '') ? this.props.user.adressUser.numberAdressInt : '',
      coloniAdress:  (this.props.user.adressUser.coloniAdress !== null && this.props.user.adressUser.coloniAdress !== undefined && this.props.user.adressUser.coloniAdress !== '') ? this.props.user.adressUser.coloniAdress : '',
      cityAdress:  (this.props.user.adressUser.cityAdress !== null && this.props.user.adressUser.cityAdress !== undefined && this.props.user.adressUser.cityAdress !== '') ? this.props.user.adressUser.cityAdress : '',
      stateAdress: (this.props.user.adressUser.stateAdress !== null && this.props.user.adressUser.stateAdress !== undefined && this.props.user.adressUser.stateAdress !== '') ? this.props.user.adressUser.stateAdress : '',
      cpAdress:  (this.props.user.adressUser.cpAdress !== null && this.props.user.adressUser.cpAdress !== undefined && this.props.user.adressUser.cpAdress !== '') ? this.props.user.adressUser.cpAdress : '',
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
  adoptar() {
    this.submitted = true;
    this.props.type = 'adoption';
    this.props.auth = this.authenticated;
    if (!this.authenticated) {
      this.props.role = 'userAdopted';
    }
    this.modalCtrl.dismiss({
      props: this.props
    });
  }

  validatedRequest() {
    const errors = [];
    let err;
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
      uid: this.props.user.uid,
      roleUser: undefined,
      displayName: this.requesterForm.value.nameUser + ' ' + this.requesterForm.value.lastNameUser + ' ' + this.requesterForm.value.surNameUser,
      email: this.props.user.email,
      emailVerified: this.props.user.emailVerified,
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
          value: this.props.user.email
        }
      },
      // dateCreated: this.user.dateCreated
    };
    console.log(this.user);
    console.log(this.props.pet);

    this.request = {
      uid: this.funService.getId(),
      userUid: this.user.uid,
      petUid: this.props.pet.uid,
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
    const userUdated = this.requestService.updateRequest(this.request);
    const request = this.usuariosService.updateUserData(this.user);
    this.modalCtrl.dismiss({
      userUdated,
      request
    });
    this.modalCtrl.dismiss({
      userUdated,
      request
    });
    this.modalCtrl.dismiss({
      userUdated,
      request
    });

    this.requesterForm.reset();

    this.funService.navigate('/publications');

  }
  get errorCtr() {
    return this.requesterForm.controls;
  }

  segmentChanged(event) {
    // console.log(event.detail.value);
    // if ( event.detail.value === 'todos' ) {
    //   return this.publisher = '';
    // }
    console.log(event);
    this.publisher = event.detail.value;
  }
  changeTo(segment) {
    this.publisher = segment;
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
}
