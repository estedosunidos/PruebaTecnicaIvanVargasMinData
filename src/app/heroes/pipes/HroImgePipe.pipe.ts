// Este es un Pipe en Angular utilizado para transformar la imagen de un héroes
import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/herosInterface';

// Se define la clase HroImagePipe e implementa PipeTransform
@Pipe({
  name: 'hroImage' // Nombre del Pipe que se usará en los templates de Angular
})
export class HroImagePipe implements PipeTransform {

  // La función transform toma un objeto Hero como entrada y devuelve una cadena (string)
  transform(hero: Hero): string {
    // Si no hay un ID y no se proporcionó una imagen alternativa, se devuelve una imagen predeterminada
    if (!hero.id && !hero.alt_img) {
      return 'assets/no-image.png';
    }
    // Si se proporciona una imagen alternativa, se devuelve esa imagen
    if (hero.alt_img) {
      return hero.alt_img;
    }
    // Si no hay una imagen alternativa, se devuelve una imagen basada en el ID del héroe
    return 'assets/heroes/' + hero.id + '.jpg';
  }

}
