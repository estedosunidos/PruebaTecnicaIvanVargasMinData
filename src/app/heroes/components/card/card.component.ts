import { Component, Input, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/herosInterface';
import {HerosserviceService} from '../../services/herosservice.service'
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';
import { MatDialog } from '@angular/material/dialog';
import { LoadingServiceService } from '../../../../app/shared/components/loading/loading/LoadingService.service';
import { Observable, catchError, concatMap, of, switchMap } from 'rxjs';
@Component({
  selector: 'heros-hero-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private HerosserviceService:HerosserviceService,private activateRoute:ActivatedRoute,private router:Router,private dialog:MatDialog,private LoadingServiceService: LoadingServiceService) { }
  @Input()
  public hero!:Hero
  isLoading = false;
   public heros: Hero[]=[]

  ngOnInit() {
    this.LoadingServiceService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }


  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '¿Estás seguro de que deseas eliminar este héroe?'
    });

    dialogRef.afterClosed().subscribe(
      result => {
        if (result) {
          this.HerosserviceService.deleteHeroById(this.hero.id).subscribe(
            () => {
              console.log('Hero deleted successfully');
              // Luego de eliminar el héroe, volvemos a cargar la lista de héroes
              this.HerosserviceService.getHeroes().subscribe(
                heroes => {
                  console.log('d', heroes);
                  // Actualizamos la lista de héroes en el componente
                  this.heros = heroes;
                   // Recargar la página actual
                  window.location.reload();
                },
                error => {
                  console.error('Error al cargar los héroes:', error);
                  // Maneja el error según tus necesidades
                }
              );
            },
            error => {
              console.error('Error al eliminar el héroe:', error);
              // Maneja el error según tus necesidades
            }
          );
        } else {
          console.log('Cancelled deletion');
        }
      }
    );
  }


  // Método para cargar héroes
  loadHeroes(): Observable<any> {
    return this.HerosserviceService.getHeroes();
  }
}
