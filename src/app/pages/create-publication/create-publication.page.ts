/* eslint-disable guard-for-in */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PetModel } from 'src/app/models/pet.model';
import { FunctionsService } from 'src/app/services/functions.service';
import { PetService } from 'src/app/services/pets.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { UsuarioModel } from '../../models/usuario.model';
import { SeoService } from 'src/app/services/seo.service';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-create-publication',
  templateUrl: './create-publication.page.html',
  styleUrls: ['./create-publication.page.scss'],
})
export class CreatePublicationPage implements OnInit {
  isPc = false;
  addForm: FormGroup;
  loading: HTMLIonLoadingElement;
  submitted = false;
  pet: PetModel;
  authenticated = false;
  adaptacionDepartamento = 0;
  afectuosoFamilia = 0;
  amigableExtranos = 0;
  amigableNinos = 0;
  necesitaEjercicio = 0;
  necesitaJugar = 0;
  nivelEnergia = 0;
  tendenciaLadrar = 0;
  typeRacePet = '';
  agePets = '';
  pics = [];
  cartilla = false;
  user: UsuarioModel;
  categoriesPet = [];
  constructor(public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private funService: FunctionsService,
    private petService: PetService,
    private usuarioService: UsuariosService,
    private seo: SeoService,
    private title: Title) {
    const t = 'Adopnate a pet | Registra a tu mascota';
    this.title.setTitle(t);
    this.seo.generateTags({
      title: 'Adopnate a pet | Registra a tu mascota',
      description:
        'Registra a tu nuevo compañero de vida',
      keywords:
        'Registra al compañero de vida',
      slug: 'Registra al mejor compañero de vida de alguien mas',
      colorBar: '#3f3697',
      image:
        window.location.origin + '/assets/logo/adopnate_logo.png',
    });
  }


  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.addForm = this.formBuilder.group({
      // userName:['', Validators.required],
      namePet: ['', Validators.required],
      agePet: ['', Validators.required],
      racePet: ['', Validators.required],
      vaccines: this.formBuilder.array([]),
      descriptionPet: ['', Validators.required],
      qualitysPet: this.formBuilder.array([]),
      cartillaPet: [false],
      // categoriesPet: this.formBuilder.array([]),
      picturesPet: this.formBuilder.array([]),
      typePet: ['', Validators.required],
      sizePet: ['', Validators.required],
      longevityPet: ['', Validators.required],
      generPet: ['', Validators.required],
      estatePet: ['', Validators.required],
      delegationPet: ['', Validators.required],
      colonyPet: ['', Validators.required]
    });
  }
  get namePet() {
    return this.addForm.get('namePet');
  }
  get agePet() {
    return this.addForm.get('agePet');
  }
  get racePet() {
    return this.addForm.get('racePet');
  }
  get descriptionPet() {
    return this.addForm.get('descriptionPet');
  }
  get vaccines() {
    return this.addForm.get('vaccines') as FormArray;
  }
  get cartillaPet() {
    return this.addForm.get('cartillaPet');
  }
  // get categoriesPet() {
  //   return this.addForm.get('categoriesPet') as FormArray;
  // }
  get picturesPet() {
    return this.addForm.get('picturesPet') as FormArray;
  }
  get typePet() {
    return this.addForm.get('typePet');
  }
  get sizePet() {
    return this.addForm.get('sizePet');
  }
  get longevityPet() {
    return this.addForm.get('longevityPet');
  }
  get generPet() {
    return this.addForm.get('generPet');
  }
  get estatePet() {
    return this.addForm.get('estatePet');
  }
  get delegationPet() {
    return this.addForm.get('delegationPet');
  }
  get colonyPet() {
    return this.addForm.get('colonyPet');
  }
  addObject(type: number) {
    console.log(type);
    switch (type) {
      case 1:
        const vaccinesFormGroup = this.formBuilder.group({
          vaccine: '',
          description: '',
          date: ''
        });
        this.vaccines.push(vaccinesFormGroup);
        break;
      case 2:
        // const categoriesPetFormGroup = this.formBuilder.group({
        //   value: '',
        //   type: ''
        // });
        // this.categoriesPet.push(categoriesPetFormGroup);
        break;
      case 3:
        const picturesPetFormGroup = this.formBuilder.group({
          file: '',
          name: '',
          url: ''

        });
        this.picturesPet.push(picturesPetFormGroup);
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  }
  seeSelect(id) {
    let idR = id.replace('type', '');
    idR = idR.trim();
    let type: any = document.getElementById(id);
    console.log(type.value);
  }
  removeObject(type: number, index: number) {
    switch (type) {
      case 1:
        this.vaccines.removeAt(index);
        break;
      case 2:
        // this.categoriesPet.removeAt(index);
        break;
      case 3:
        this.picturesPet.removeAt(index);
        // this.pics.removeAt(index);
        break;
      case 4:
        break;
      default:
        //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
        break;
    }
  }
  setImage(e) {
    const name = e.target.files[0].name;
    const id = 'image' + e.path[0].id;
    const archivos = e.target.files;
    const primerArchivo = archivos[0];
    const objectURL = URL.createObjectURL(primerArchivo);
    // console.log(e);
    // console.log(name);
    // console.log(id);
    // console.log(archivos);
    // console.log(primerArchivo);
    // console.log(objectURL);
    // Y a la fuente de la imagen le ponemos el objectURL
    let imagenPrevisualizacion;
    imagenPrevisualizacion = document.getElementById(id);
    imagenPrevisualizacion.src = objectURL;
    this.pics.push({ file: archivos[0] });
  }
  get errorCtr() {
    return this.addForm.controls;
  }
  rangeChange(event, type) {
    switch (type) {
      case 1:
        this.adaptacionDepartamento = event.detail.value;
        break;
      case 2:
        this.afectuosoFamilia = event.detail.value;
        break;
      case 3:
        this.amigableExtranos = event.detail.value;
        break;
      case 4:
        this.amigableNinos = event.detail.value;
        break;
      case 5:
        this.necesitaEjercicio = event.detail.value;
        break;
      case 6:
        this.necesitaJugar = event.detail.value;
        break;
      case 7:
        this.nivelEnergia = event.detail.value;
        break;
      case 8:
        this.tendenciaLadrar = event.detail.value;
        break;
      default:
        break;

    }
    console.log(event.detail); // 1 - 100
    //  this.porcentaje = event.detail.value / 100;
  }
  getQualitys() {
    console.log(this.adaptacionDepartamento);
    console.log(this.afectuosoFamilia);
    console.log(this.amigableExtranos);
    console.log(this.amigableNinos);
    console.log(this.necesitaEjercicio);
    console.log(this.necesitaJugar);
    console.log(this.nivelEnergia);
    console.log(this.tendenciaLadrar);
    const qualitysPet = [{
      sentence: 'Adaptación a departamento',
      value: this.adaptacionDepartamento
    },
    {
      sentence: 'Afectuoso con la familia',
      value: this.afectuosoFamilia
    },
    {
      sentence: 'Amigable con extraños',
      value: this.amigableExtranos
    },
    {
      sentence: 'Amigable con los niños',
      value: this.amigableNinos
    },
    {
      sentence: 'Necesidad de ejercicio',
      value: this.necesitaEjercicio
    },
    {
      sentence: 'Necesidad de jugar',
      value: this.necesitaJugar
    },
    {
      sentence: 'Nivel de energía',
      value: this.nivelEnergia
    },
    {
      sentence: 'Tendencia a ladrar o aullar',
      value: this.tendenciaLadrar
    }
    ];

    console.log(qualitysPet);
    return qualitysPet;
  }
  async presentLoading(message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }
  refrescar() {
    if (this.vaccines) {
      this.vaccines.controls.splice(0, this.vaccines.length);
    }
    // if (this.categoriesPet) {
    //   this.categoriesPet.controls.splice(0, this.categoriesPet.length);
    // }
    if (this.picturesPet) {
      this.picturesPet.controls.splice(0, this.picturesPet.length);
    }
  }
  isPcV(isPcm: any) {
    console.log('isPc   publications', isPcm);
    this.user = isPcm.user;
    if (isPcm.user) {
      this.user = isPcm.user;
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
    if (isPcm.plat === 'Desktop') {
      this.isPc = true;
    }
    else {
      this.isPc = false;
    }
    console.log('User', this.user);
    console.log('authenticated', this.authenticated);
  }


  async setPet() {
    console.log(this.addForm.value);
    this.pet = {
      ...this.addForm.value
    };
    this.pet.vaccines = this.dataVaccines(this.addForm.value.vaccines);
    // setTimeout(() => {
    this.pet.qualitysPet = this.getQualitys();
    this.submitted = true;
    if (!this.addForm.valid) {
      console.log('Todos los campos son requeridos.');
      return false;
    } else {
      this.presentLoading('Por favor espere');
      this.pet.picturesPet = this.pics;
      this.pet.dateCreated = this.funService.getTime();
      this.pet.adoptatedPet = false;
      this.pet.userUid = this.user.uid;
      this.pet.userName = this.user.displayName !== '' ? this.user.displayName : this.user.nameUser;
      // this.pet.vaccines = this.dataVaccines(this.pet.vaccines);
      const id = this.funService.getId();
      console.log(id);
      this.pet.uid = id;
      console.log(this.addForm.value.typePet);
      this.categoriesPet.push({
        sentence: 'typePet',
        value: this.addForm.value.typePet
      });
      this.categoriesPet.push({
        sentence: 'sizePet',
        value: this.addForm.value.sizePet
      });
      this.categoriesPet.push({
        sentence: 'longevityPet',
        value: this.addForm.value.longevityPet
      });
      this.categoriesPet.push({
        sentence: 'generPet',
        value: this.addForm.value.generPet
      });
      this.pet.categoriesPet = this.categoriesPet;
      console.log(this.pet);
      const PET = await this.petService.setPet(this.pet, id);
      if (PET) {
        console.log(PET);
        this.loading.dismiss();
        this.funService.navigate('/publications');
        this.funService.sendMessage('Success', 'Mascota Agregada', '', 'Su mascota ya esta publicada');
      }else {
        this.funService.sendMessage('Error', 'Error', '', 'Por favor de realizar de nuevo la petición, se ha generado un error.');
      }
    }
    // }, 2000);
  }

  cancel() {
    this.funService.navigate('publications');
  }
  dataVaccines(data) {
    console.log(data);
    for (let i = 0; i < data.length; i++) {
      if (data[i].vaccine === '' && data[i].description === '' && data[i].date === '') {
        data.removeAt(i);
      }
      if (data[i].date !== '') {
        data[i].date = new Date(data[i].date).getTime();
      }
    }
    return data;
  }
  checkVacuna(event) {
    console.log(event);
    const valor = event.detail.checked;
    console.log(valor);
    if (!valor) {
      this.cartilla = false;
      this.vaccines.clear();
      console.log(this.vaccines);
    }
    else {
      this.cartilla = true;
    }
    console.log(this.cartilla);
  }

  selectTypePet(event) {
    console.log(event.detail);
  }
}
