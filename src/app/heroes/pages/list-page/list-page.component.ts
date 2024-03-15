import { Component, OnInit } from '@angular/core';
import { Hero } from '../../interfaces/herosInterface';
import { HerosserviceService } from '../../services/herosservice.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  public heroes: Hero[] = [];
  public filteredHeroes: Hero[] = []; // Arreglo para almacenar héroes filtrados
  public searchTerm: string = ''; // Término de búsqueda

  constructor(private heroesService: HerosserviceService) {}

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes => {
        this.heroes = heroes;
        this.filteredHeroes = heroes; // Al inicio, mostrar todos los héroes sin filtrar
      });
  }

  // Método para filtrar héroes según el término de búsqueda
  filterHeroes(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this.filteredHeroes = this.heroes; // Mostrar todos los héroes si el término de búsqueda está vacío
      return;
    }

    this.filteredHeroes = this.heroes.filter(hero =>
      hero.superhero.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Método para manejar el evento de cambio en el campo de búsqueda
  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement; // Convertir el objetivo del evento a tipo HTMLInputElement
    this.searchTerm = target.value; // Obtener el valor del campo de búsqueda
    this.filterHeroes(this.searchTerm); // Filtrar los héroes con el nuevo término de búsqueda
  }
}
