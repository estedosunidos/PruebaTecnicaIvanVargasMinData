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
    this.loadHeroes(); //
    this.LoadingServiceService.isLoading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }


  onDelete(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: '¿Estás seguro de que deseas eliminar este héroe?'
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          return this.HerosserviceService.deleteHeroById(this.hero.id).pipe(
            catchError(error => {
              console.error('Error al eliminar el héroe:', error);
              // Manejar el error de eliminación según tus necesidades
              return of(false); // Emitir false en caso de error
            })
          );
        } else {
          return of(false); // Emitir false si el usuario cancela la eliminación
        }
      }),
      concatMap(wasDeleted => {
        if (wasDeleted) {
          console.log('Hero deleted successfully');
          return this.loadHeroes(); // Actualizar la lista después de eliminar el héroe
        } else {
          console.log('Failed to delete hero');
          return of(null); // Emitir null si la eliminación falla o es cancelada
        }
      })
    ).subscribe(
      () => {
        // Redirigir opcionalmente después de eliminar
        // this.router.navigate(['/Heroes/List-heros']);
      }
    );
  }

  // Método para cargar héroes
  loadHeroes(): Observable<any> {
    return this.HerosserviceService.getHeroes();
  }
}
