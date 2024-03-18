import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HerosserviceService } from './herosservice.service';
import { Hero } from '../interfaces/herosInterface';


describe('HeroesService', () => {
  describe('HerosserviceService', () => {
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
      httpMock.verify();
    });

    it('should be created', () => {
      expect(service).toBeTruthy();
    });

    it('should retrieve heroes by pagination from API', () => {
      const page = 1;
      const pageSize = 10;
      const mockHeroes: Hero[] = [
        { id: '1', superhero: 'Superman', publisher: 'DC Comics', alter_ego: 'Clark Kent', first_appearance: 'Action Comics #1', characters: 'Kal-El', alt_img: '' }
      ];

      service.getHeroesbyPagination(page, pageSize).subscribe(heroes => {
        expect(heroes).toEqual(mockHeroes);
      });

      const req = httpMock.expectOne(`http://localhost:3000/heroes?page=${page}&pageSize=${pageSize}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockHeroes);
    });




  });
});
