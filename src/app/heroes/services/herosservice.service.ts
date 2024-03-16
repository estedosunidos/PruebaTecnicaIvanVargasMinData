// Se importan las dependencias necesarias desde Angular y otras librerías
import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/herosInterface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';

// Se decora la clase con @Injectable para que pueda ser inyectada como dependencia
@Injectable({
  providedIn: 'root' // Indica que este servicio está disponible en el nivel raíz del módulo
})
export class HerosserviceService {

  constructor(private http: HttpClient) { }

  // URL base de la API para los héroes
  baseurl = 'http://localhost:3000/heroes';
  // Variables para la paginación de héroes
  currentPage = 1;
  pageSize = 10;

  // Método para obtener todos los héroes
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseurl);
  }

  // Método para obtener un héroe por su ID
  getHeroById(id: string): Observable<Hero> {
    return this.http.get<Hero>(`${this.baseurl}/${id}`);
  }

  // Método para obtener héroes por su nombre
  getHeroByName(name: string | null): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseurl}?name=${name}`);
  }

  // Método para obtener héroes limitados con un query
  getHeroByLimit(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseurl}?q=${query}&_limit=6`);
  }

  // Método para añadir un nuevo héroe
  addHero(hero: Hero): Observable<Hero> {
    const id = this.generateId(hero.publisher, hero.superhero);
    hero.id = id;
    return this.http.post<Hero>(this.baseurl, hero);
  }

  // Método para actualizar un héroe por su ID
  updateHeroById(id: string, updatedHero: Hero): Observable<Hero[]> {
    return this.http.put<Hero[]>(`${this.baseurl}/${id}`, updatedHero);
  }

  // Método para actualizar un héroe
  updateHero(updatedHero: Hero): Observable<Hero[]> {
    return this.http.put<Hero[]>(`${this.baseurl}/${updatedHero.id}`, updatedHero);
  }

  // Método para eliminar un héroe por su ID
  deleteHeroById(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseurl}/${id}`);
  }

  // Método para buscar héroes por término de búsqueda
  searchHeroes(searchTerm: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseurl).pipe(
      map(heroes => heroes.filter(hero => this.matchHero(hero, searchTerm.toLowerCase())))
    );
  }

  // Método para obtener héroes con paginación
  getHeroesbyPagination(page: number, pageSize: number): Observable<Hero[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<Hero[]>(this.baseurl, { params });
  }

  // Método para obtener el número total de héroes
  getHeroesCount(): Observable<number> {
    return this.http.get<number>(`${this.baseurl}/count`);
  }

  // Método privado para verificar si un héroe coincide con un término de búsqueda
  private matchHero(hero: Hero, searchTerm: string): boolean {
    return (
      hero.superhero.toLowerCase().includes(searchTerm) ||
      hero.alter_ego.toLowerCase().includes(searchTerm) ||
      hero.publisher.toLowerCase().includes(searchTerm) ||
      hero.first_appearance.toLowerCase().includes(searchTerm)
    );
  }

  // Método privado para generar un ID único para un héroe
  private generateId(publisher: string, superhero: string): string {
    const publisherSlug = publisher.toLowerCase().replace(/\s/g, '-');
    const superheroSlug = superhero.toLowerCase().replace(/\s/g, '-');
    return `${publisherSlug}-${superheroSlug}`;
  }
}
