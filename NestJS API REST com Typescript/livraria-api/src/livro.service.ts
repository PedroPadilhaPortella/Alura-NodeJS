import { Injectable } from "@nestjs/common";
import { Livro } from "./livro.model";

@Injectable()
export class LivroService {
    livros: Livro[] = [
        new Livro('LIV01', 'TDD e DDD na prática', 38.9),
        new Livro('LIV02', 'Iniciando com Flutter', 52.9),
        new Livro('LIV03', 'Padrões de Projeto', 89.9),
    ]

    getAll(): Livro[] {
        return this.livros;
    }

    getOne(id: number): Livro {
        return this.livros[id];
    }

    create(livro: Livro) {
        this.livros.push(livro);
    }

    update(livro: Livro): Livro {
        return livro;
    }

    remove(id: number) {
        this.livros.pop()
    }
}