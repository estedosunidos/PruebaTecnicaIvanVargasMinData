import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayaoutPageComponent } from './pages/layaout-page/layaout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModuleModule } from '../material/material-module.module';
import { HeroesRoutingModule } from './heroes.routing.module';
import { SharedModuleModule } from '../shared/shared-module.module';
import { CardComponent } from './components/card/card.component';
import { HroImagePipe } from './pipes/HroImgePipe.pipe';
import { ConfirmDialogComponent } from './components/confirmDialog/confirmDialog.component';



@NgModule({
  declarations: [
    LayaoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    SearchPageComponent,
    CardComponent,
    HroImagePipe,
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModuleModule,
    FormsModule,
    HeroesRoutingModule,
    SharedModuleModule
  ]
})
export class HeroesmModuleModule { }
