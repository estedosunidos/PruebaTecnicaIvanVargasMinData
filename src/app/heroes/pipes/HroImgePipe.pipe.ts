import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/herosInterface';

@Pipe({
  name: 'hroImage'
})
export class HroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }
    if (hero.alt_img) {
      return hero.alt_img;
    }
    return 'assets/heroes/' + hero.id + '.jpg';
  }

}
