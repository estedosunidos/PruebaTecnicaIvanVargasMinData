import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/herosInterface';
import {HerosserviceService} from '../../services/herosservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'heros-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private HerosserviceService:HerosserviceService,private activateRoute:ActivatedRoute,private router:Router,private dialog:MatDialog) { }
  @Input()
  public hero!:Hero
  public heros: Hero[]=[]

  ngOnInit() {
    this.loadHeroes(); //
  }

  loadHeroes(): void {
    this.HerosserviceService.getHeroes().subscribe(
      heroes => {
        this.heros = heroes;
      },
      error => {
        console.error('Error al cargar la lista de héroes:', error);
        // Manejar el error según tus necesidades
      }
    );
  }
  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '¿Estás seguro de que deseas eliminar este héroe?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.HerosserviceService.deleteHeroById(this.hero.id).subscribe(
          wasDeleted => {
            if (wasDeleted) {
              console.log('Hero deleted successfully');
              this.loadHeroes(); // Actualizar la lista después de eliminar el héroe
              // this.router.navigate(['/Heroes/List-heros']); // Redirigir opcionalmente después de eliminar
            } else {
              console.log('Failed to delete hero');
            }
          },
          error => {
            console.error('Error al eliminar el héroe:', error);
            // Manejar el error de eliminación según tus necesidades
          }
        );
      }
    });
  }
}
