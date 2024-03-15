import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {HerosserviceService} from '../../services/herosservice.service'
import { Hero } from '../../interfaces/herosInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';
@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrls: ['./new-page.component.css']
})
export class NewPageComponent  implements OnInit{
  isLoading: boolean = false;

 public heroForm = new FormGroup({
  id:new FormControl<string>(''),
  superhero:new FormControl<string>(''),
  publisher:new FormControl<string>(''),
  alter_ego:new FormControl<string>(''),
  first_appearance:new FormControl<string>(''),
  characters: new FormControl<string>(''),
  alt_img:new FormControl<string>(''),
 })
 constructor(private HerosserviceService:HerosserviceService,private activateRoute:ActivatedRoute,private router:Router,private snackbar:MatSnackBar,private dialog:MatDialog){}
  ngOnInit(): void {
    if(!this.router.url.includes('edit-heros'))  return
    this.activateRoute.params.pipe(
      switchMap(({id})=>this.HerosserviceService.getHeroById(id))
    ).subscribe(hero => {
      if(!hero){
        return this.router.navigateByUrl('/')
      }
      this.heroForm.reset(hero)
      return

    }

    )
  }
 get CurrentHero():Hero{
  const hero = this.heroForm.value as Hero
  return hero
 }
 onSubmit(heroForm: FormGroup): void {
  if (heroForm.invalid) return;

  const currentHero: Hero = heroForm.value;
  this.isLoading = true; // Activar el loader

  if (currentHero.id) {
    this.HerosserviceService.updateHero(currentHero).subscribe(() => {
      this.isLoading = false; // Desactivar el loader
      this.showSnackbar(`Hero updated!`);
      this.router.navigate(['/Heroes/List-heros']);
    });
  } else {
    this.isLoading = true; // Activar el loader

    // Llamar al método addHero para agregar un héroe
    this.HerosserviceService.addHero(currentHero).subscribe(() => {
      this.isLoading = false; // Desactivar el loader
      this.showSnackbar(`Hero created!`); // Mostrar un mensaje de éxito
      this.router.navigate(['/Heroes/List-heros']); // Redirigir a la lista de héroes
    }, error => {
      this.isLoading = false; // Desactivar el loader en caso de error
      console.error('Error adding hero:', error); // Manejar el error apropiadamente
      // Mostrar un mensaje de error o realizar cualquier otra acción de manejo de errores
    });

  }
}

   onDelete(): void {
    if (!this.CurrentHero.id) {
      throw new Error('Hero ID is not provided');
    }

    // Primero, busca el héroe por su ID
    this.HerosserviceService.getHeroById(this.CurrentHero.id).subscribe(
      (hero) => {
        // Abre el diálogo de confirmación
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          data: hero // Pasa el héroe encontrado al diálogo de confirmación
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('The dialog was closed');
          console.log({ result });
          if (!result) return;
          console.log('Deleted');
          // Si el usuario confirma la eliminación, llama al servicio para eliminar al héroe
          this.HerosserviceService.deleteHeroById(this.CurrentHero.id).subscribe(wasDeleted => {
            if (wasDeleted) {
              console.log('Hero deleted successfully');
              this.router.navigate(['/Heroes/List-heros']);
            } else {
              console.log('Failed to delete hero');
            }
          });
        });
      },
      (error) => {
        console.error('Error fetching hero:', error);
        // Manejar el error de búsqueda del héroe según tus requerimientos
      }
    );
  }
 showSnackbar(message: string, action: string = 'done', duration: number = 2500): void {
  const config: MatSnackBarConfig = {
    duration: duration,
    panelClass: ['snackbar-custom']
  };
  this.snackbar.open(message, action, config);
}
}
