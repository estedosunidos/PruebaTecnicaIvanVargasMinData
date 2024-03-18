import { Injectable } from '@angular/core';
import { Hero } from '../interfaces/herosInterface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HerosserviceService {

  constructor(private http: HttpClient) { }

  baseurl = 'http://localhost:3000/heroes';
  currentPage = 1;
  pageSize = 10;

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.baseurl);
  }

  getHeroById = (id: string): Observable<Hero> =>
    this.http.get<Hero>(`${this.baseurl}/${id}`);

  getHeroByName = (name: string | null): Observable<Hero[]> =>
    this.http.get<Hero[]>(`${this.baseurl}?name=${name}`);

  getHeroByLimit = (query: string): Observable<Hero[]> =>
    this.http.get<Hero[]>(`${this.baseurl}?q=${query}&_limit=6`);

  addHero = (hero: Hero): Observable<Hero> => {
    const id = this.generateId(hero.publisher, hero.superhero);
    hero.id = id;
    return this.http.post<Hero>(this.baseurl, hero);
  };

  updateHeroById = (id: string, updatedHero: Hero): Observable<Hero[]> =>
    this.http.put<Hero[]>(`${this.baseurl}/${id}`, updatedHero);

  updateHero = (updatedHero: Hero): Observable<Hero[]> =>
    this.http.put<Hero[]>(`${this.baseurl}/${updatedHero.id}`, updatedHero);

  deleteHeroById = (id: string): Observable<boolean> =>
    this.http.delete<boolean>(`${this.baseurl}/${id}`);

  searchHeroes = (searchTerm: string): Observable<Hero[]> =>
    this.http.get<Hero[]>(this.baseurl).pipe(
      map(heroes => heroes.filter(hero => this.matchHero(hero, searchTerm.toLowerCase())))
    );

  getHeroesbyPagination = (page: number, pageSize: number): Observable<Hero[]> => {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    return this.http.get<Hero[]>(this.baseurl, { params });
  }

  getHeroesCount = (): Observable<number> =>
    this.http.get<number>(`${this.baseurl}/count`);

  private matchHero = (hero: Hero, searchTerm: string): boolean =>
    hero.superhero.toLowerCase().includes(searchTerm) ||
    hero.alter_ego.toLowerCase().includes(searchTerm) ||
    hero.publisher.toLowerCase().includes(searchTerm) ||
    hero.first_appearance.toLowerCase().includes(searchTerm);

  private generateId = (publisher: string, superhero: string): string => {
    const publisherSlug = publisher.toLowerCase().replace(/\s/g, '-');
    const superheroSlug = superhero.toLowerCase().replace(/\s/g, '-');
    return `${publisherSlug}-${superheroSlug}`;
  }
}
