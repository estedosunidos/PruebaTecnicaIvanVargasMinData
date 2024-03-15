import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HerosserviceService } from './herosservice.service';
import { Hero } from '../interfaces/herosInterface';


describe('HeroesService', () => {
  let service: HerosserviceService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HerosserviceService]
    });
    service = TestBed.inject(HerosserviceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return heroes from API', () => {
    const mockHeroes: Hero[] = [
      { id: '1', superhero: 'Superman', publisher: 'DC Comics', alter_ego: 'Clark Kent', first_appearance: 'Action Comics #1', characters: 'Clark Kent' },
      { id: '2', superhero: 'Batman', publisher: 'DC Comics', alter_ego: 'Bruce Wayne', first_appearance: 'Detective Comics #27', characters: 'Bruce Wayne' }
    ];

    const page = 1;
    const pageSize = 10;

    service.getHeroes(page, pageSize).subscribe((heroes: Hero[]) => {
      expect(heroes.length).toBe(2);
      expect(heroes).toEqual(mockHeroes);
    });

    const req = httpMock.expectOne(`${service.baseurl}?page=${page}&pageSize=${pageSize}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockHeroes); // Simula una respuesta del servidor con los héroes de prueba
  });
});
