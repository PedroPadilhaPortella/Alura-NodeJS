import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LivroService } from './livro.service';
import { Livro } from './livro.model';

@Controller("livros")
export class LivrosController {

    constructor(private livroService: LivroService) { }

    @Get()
    getAll(): Livro[] {
        return this.livroService.getAll();
    }

    @Get(':id')
    getById(@Param() params): Livro {
        return this.livroService.getOne(params.id);
    }

    @Post()
    post(@Body() Livro: Livro) {
        this.livroService.create(Livro);
    }

    @Put()
    put(@Body() Livro: Livro): Livro {
        return this.livroService.update(Livro);
    }

    @Delete(':id')
    delete(@Param() params) {
        this.livroService.remove(params.id)
    }
}
