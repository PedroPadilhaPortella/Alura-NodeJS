import { Pipe, PipeTransform } from '@angular/core';
import { Livro } from './livro';

@Pipe({
    name: 'filterByTitle'
})
export class FilterByTitlePipe implements PipeTransform {

    transform(livros: Livro[], titleQuery: string): Livro[] {

        titleQuery = titleQuery.trim().toLowerCase();

        if (titleQuery) {
            return livros.filter(livro => livro.Titulo.toLowerCase().includes(titleQuery))
        } else {
            return livros;
        }
    }
}