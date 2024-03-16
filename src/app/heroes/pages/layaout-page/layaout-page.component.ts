import { Component, OnInit } from "@angular/core";

@Component({
  selector: 'app-layaout-page',
  templateUrl: './layaout-page.component.html',
  styleUrls: ['./layaout-page.component.css']
})
export class LayaoutPageComponent   {

  public sidebarItems = [
    { label: 'Listado', icon: 'label', url: './list' },
    { label: 'Añadir', icon: 'add', url: './new-heros' },

  ]


}
