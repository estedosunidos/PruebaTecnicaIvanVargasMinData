import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { FooterComponent } from './components/footer/footer.component';
import { TitleComponent } from './components/title/title.component';
import { MaterialModuleModule } from '../material/material-module.module';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { LoadingComponent } from './components/loading/loading/loading.component';


@NgModule({
  declarations: [

    ButtonComponent,
    FooterComponent,
    TitleComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModuleModule,
    RouterModule,MatSidenavModule
  ],
  exports:[

    ButtonComponent,
    FooterComponent,
    TitleComponent,
    LoadingComponent
  ]
})
export class SharedModuleModule { }
