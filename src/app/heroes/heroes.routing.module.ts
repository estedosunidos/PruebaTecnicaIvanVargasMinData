import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LayaoutPageComponent } from "./pages/layaout-page/layaout-page.component";
import { NewPageComponent } from "./pages/new-page/new-page.component";
import { SearchPageComponent } from "./pages/search-page/search-page.component";
import { ListPageComponent } from "./pages/list-page/list-page.component";

const route:Routes=[{
  path:'',
  component:LayaoutPageComponent,
  children:[
    {path:'new-heros',component:NewPageComponent},
    {path:'search-heros',component:SearchPageComponent},
    {path:'edit-heros/:id',component:NewPageComponent},
    {path:'List-heros',component:ListPageComponent},
    {path:'**',redirectTo:'List-heros'},

  ]
}]
@NgModule({
  imports:[RouterModule.forChild(route)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
