// Importaciones necesarias de Angular y otras librerías
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HerosserviceService } from '../../services/herosservice.service'; // Importación del servicio de héroes
import { Hero } from '../../interfaces/herosInterface'; // Importación de la interfaz Hero
import { ActivatedRoute, Router } from '@angular/router'; // Importaciones para manejar rutas
import { switchMap } from 'rxjs/operators'; // Importación para manejar operadores RxJS
import { MatDialog } from '@angular/material/dialog'; // Importación de MatDialog para diálogos modales
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar'; // Importación de MatSnackBar para notificaciones de Snackbar
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component'; // Componente de diálogo de confirmación

@Component({
  selector: 'app-new-page', // Selector del componente
  templateUrl: './new-page.component.html', // Ruta del archivo HTML del componente
  styleUrls: ['./new-page.component.css'] // Rutas de los archivos CSS del componente
})
export class NewPageComponent implements OnInit {
  isLoading: boolean = false; // Indicador de carga

  // Definición del formulario de héroe
  public heroForm = new FormGroup({
    id: new FormControl<string>(''),
    superhero: new FormControl<string>(''),
    publisher: new FormControl<string>(''),
    alter_ego: new FormControl<string>(''),
    first_appearance: new FormControl<string>(''),
    characters: new FormControl<string>(''),
    alt_img: new FormControl<string>(''),
  });

  // Constructor del componente
  constructor(
    private HerosserviceService: HerosserviceService, // Servicio de héroes
    private activateRoute: ActivatedRoute, // Ruta activa
    private router: Router, // Router
    private snackbar: MatSnackBar, // Snackbar para notificaciones
    private dialog: MatDialog // MatDialog para diálogos modales
  ) {}

  // Método para inicializar el componente
  ngOnInit(): void {
    // Verifica si la URL incluye 'edit-heros'
    if (!this.router.url.includes('edit-heros')) return;

    // Si la URL incluye 'edit-heros', se suscribe a los cambios de parámetros en la ruta
    this.activateRoute.params.pipe(
      switchMap(({ id }) => this.HerosserviceService.getHeroById(id)) // Obtiene el héroe por ID
    ).subscribe(hero => {
      if (!hero) {
        return this.router.navigate(['/Heroes/List-heros']); // Redirige a la lista de héroes
      }
      this.heroForm.reset(hero); // Restablece el formulario con los datos del héroe obtenido
      return;
    });
  }

  // Método para obtener el héroe actual del formulario
  get CurrentHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  // Método para enviar el formulario (crear o actualizar héroe)
  onSubmit(heroForm: FormGroup): void {
    if (heroForm.invalid) return; // Si el formulario es inválido, no hacer nada

    const currentHero: Hero = heroForm.value; // Obtiene el héroe actual del formulario
    this.isLoading = true; // Activa el indicador de carga

    // Si el héroe tiene un ID, se actualiza
    if (currentHero.id) {
      this.HerosserviceService.updateHero(currentHero).subscribe(() => {
        this.isLoading = false; // Desactiva el indicador de carga
        this.showSnackbar(`Hero updated!`); // Muestra una notificación de éxito
        this.router.navigate(['/Heroes/List-heros']); // Redirige a la lista de héroes
      });
    } else {
      this.isLoading = true; // Activa el indicador de carga

      // Si el héroe no tiene un ID, se añade como nuevo héroe
      this.HerosserviceService.addHero(currentHero).subscribe(() => {
        this.isLoading = false; // Desactiva el indicador de carga
        this.showSnackbar(`Hero created!`); // Muestra una notificación de éxito
        this.router.navigate(['/Heroes/List-heros']); // Redirige a la lista de héroes
      }, error => {
        this.isLoading = false; // Desactiva el indicador de carga en caso de error
        console.error('Error adding hero:', error); // Maneja el error apropiadamente
        // Puede mostrar un mensaje de error o realizar cualquier otra acción de manejo de errores aquí
      });

    }
  }

  // Método para eliminar un héroe
  onDelete(): void {
    if (!this.CurrentHero.id) {
      throw new Error('Hero ID is not provided'); // Lanza un error si no se proporciona el ID del héroe
    }

    // Busca el héroe por su ID
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
              this.router.navigate(['/Heroes/List-heros']); // Redirige a la lista de héroes
            } else {
              console.log('Failed to delete hero');
            }
          });
        });
      },
      (error) => {
        console.error('Error fetching hero:', error);
        // Maneja el error de búsqueda del héroe según tus requerimientos
      }
    );
  }

  // Método para mostrar una notificación de Snackbar
  showSnackbar(message: string, action: string = 'done', duration: number = 2500): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      panelClass: ['snackbar-custom'] // Clase personalizada para el estilo del Snackbar
    };
    this.snackbar.open(message, action, config); // Abre el Snackbar con el mensaje y configuración proporcionados
  }
}
