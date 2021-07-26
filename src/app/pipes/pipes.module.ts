import { NgModule } from '@angular/core';
import { FiltroPipe } from './filtro.pipe';
import { FiltroLikePipe } from './filtroLike.pipe';



@NgModule({
  declarations: [
    FiltroPipe,
    FiltroLikePipe
  ],
  exports: [
    FiltroPipe,
    FiltroLikePipe
  ]
})
export class PipesModule { }
