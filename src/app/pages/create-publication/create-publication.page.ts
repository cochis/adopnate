import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { PetModel } from 'src/app/models/pet.model';
import { FunctionsService } from 'src/app/services/functions.service';
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
  constructor(public formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private funService: FunctionsService) { }
  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.addForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.minLength(3)]],
      race: ['', Validators.required],
      vaccines: ['', Validators.required],
      description: ['', Validators.required],
      createBy: ['', Validators.required],
      dateCreated: ['', Validators.required]
    });
  }

  get errorCtr() {
    return this.addForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.addForm.valid) {
      console.log('Todos los campos son requeridos.');
      return false;
    } else {
      this.presentLoading( 'Por favor espere');
      this.pet = {
        ...this.addForm.value
      };
    console.log(this.pet);
    }
  }

  async presentLoading( message: string) {
    this.loading = await this.loadingCtrl.create({
      message,
    });
    await this.loading.present();
  }
  // isPcV(isPcm: any) {
  //   console.log('isPc   publications', isPcm);
  //   this.authenticated = isPcm.authenticated;
  //     if (isPcm.plat ==='Desktop'){
  //       this.isPc= true;
  //     }
  //     else {
  //       this.isPc = false;
  //     }
  //     console.log('isPc',  this.isPc);
  //     console.log('authenticated',  this.authenticated);
  //   }
  isPcV(isPcm: string) {
    console.log('isPc   publications', isPcm);
      if (isPcm ==='Desktop'){
        this.isPc= true;
      }
      else {
        this.isPc = false;
      }
    }
}
