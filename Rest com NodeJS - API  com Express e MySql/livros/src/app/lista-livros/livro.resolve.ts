import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Livro } from './livro';
import { LivroService } from './livro.service';

@Injectable()
export class LivroResolve implements Resolve<Livro> {

    constructor(private livroService: LivroService) { }

    resolve(route: ActivatedRouteSnapshot) {
        return this.livroService.getLivroById(route.params['Id']);
    }
}