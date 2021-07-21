/* eslint-disable @typescript-eslint/ban-types */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, delay } from 'rxjs/operators';
import { TipoUsuario } from '../models/tipoUsuario.model';


@Injectable({
  providedIn: 'root'
})
export class CatalogosService {

  private url = 'https://adopnate-default-rtdb.firebaseio.com';


  constructor( private http: HttpClient ) { }


  crearTipoUsuario( tipoUsuario: TipoUsuario ) {

    return this.http.post(`${ this.url }/tipoUsuarios.json`, tipoUsuario)
            .pipe(
              map( (resp: any) => {
                tipoUsuario  = resp;
                return tipoUsuario;
              })
            );

  }

  actualizarTipoUsuario(tipoUsuario: TipoUsuario ) {

    const tipoUsuarioTemp = {
      ...tipoUsuario
    };

    delete tipoUsuarioTemp.id;

    return this.http.put(`${ this.url }/tipoUsuarios/${ tipoUsuario.id }.json`, tipoUsuarioTemp);


  }

  borrarTipoUsuario( id: string ) {

    return this.http.delete(`${ this.url }/tipoUsuarios/${ id }.json`);

  }


  getTipoUsuario( id: string ) {

    return this.http.get(`${ this.url }/tipoUsuarios/${ id }.json`);

  }


  getTipoUsuarios() {
    return this.http.get(`${ this.url }/tipoUsuarios.json`)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( tipoUsuariosObj: object ) {

    const tipoUsuarios: TipoUsuario[] = [];

    Object.keys( tipoUsuariosObj ).forEach( key => {

      const tipoUsuario: TipoUsuario = tipoUsuariosObj[key];
      tipoUsuario.id = key;

      tipoUsuarios.push( tipoUsuario );
    });


    return tipoUsuarios;

  }


}
