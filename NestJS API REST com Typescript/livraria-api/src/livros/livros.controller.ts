import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { LivroService } from './livro.service';
import { Livro } from './livro.model';

@Controller("livros")
export class LivrosController {

    constructor(private livroService: LivroService) { }

    @Get()
    async getAll(): Promise<Livro[]> {
        return this.livroService.findAll();
    }

    @Get(':id')
    async getById(@Param() params): Promise<Livro> {
        return this.livroService.getOne(params.id);
    }

    @Post()
    async post(@Body() Livro: Livro) {
        this.livroService.create(Livro);
    }

    @Put()
    async put(@Body() livro: Livro): Promise<[number, Livro[]]> {
        return this.livroService.update(livro);
    }

    @Delete(':id')
    async delete(@Param() params) {
        this.livroService.remove(params.id)
    }
}
