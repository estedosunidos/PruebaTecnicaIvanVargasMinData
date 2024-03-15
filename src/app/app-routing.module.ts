import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path:'Heroes',
    loadChildren:()=>import('./heroes/heroesm-module.module').then(m=>m.HeroesmModuleModule)
  },
  {
    path:'',
    redirectTo:'Heroes',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
