// Importaciones necesarias de Angular y otras librerías
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/herosInterface';
import { HerosserviceService } from '../../services/herosservice.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

// Decorador @Component para definir metadatos del componente
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent  {

  // Declaración de variables públicas
  public searchInput = new FormControl(''); // Control de formulario para la entrada de búsqueda
  public heroes$: Observable<Hero[]>; // Lista de héroes obtenidos de la búsqueda
  public selectedHero?: Hero; // Héroe seleccionado de la lista

  // Constructor del componente
  constructor(private heroesService: HerosserviceService) {
    this.heroes$ = this.searchInput.valueChanges.pipe(
      debounceTime(300), // Espera 300ms después de cada pulsación de tecla
      distinctUntilChanged(), // Evita solicitudes duplicadas si el valor no ha cambiado
      switchMap(value => this.heroesService.getHeroByName(value)) // Realiza la búsqueda al cambiar el valor
    );
  }

  // Método para manejar la selección de una opción en el autocompletado
  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHero = undefined; // Si no hay valor seleccionado, se limpia el héroe seleccionado
      return;
    }

    const hero: Hero = event.option.value; // Obtiene el héroe seleccionado
    this.searchInput.setValue(hero.superhero); // Actualiza el valor del campo de búsqueda con el nombre del héroe seleccionado

    this.selectedHero = hero; // Asigna el héroe seleccionado a la variable correspondiente
  }
}
