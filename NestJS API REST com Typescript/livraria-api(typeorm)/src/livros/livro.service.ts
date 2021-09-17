import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { Livro } from "./livro.model";

@Injectable()
export class LivroService {

    constructor(
        @InjectRepository(Livro)
        private livroRepository: Repository<Livro>,
    ) {}

    async findAll() {
        return this.livroRepository.find();
    }

    async getOne(id: number): Promise<Livro> {
        return this.livroRepository.findOne(id);
    }

    async create(livro: Livro): Promise<any> {
        return this.livroRepository.save(livro);
    }

    async update(livro: Livro): Promise<UpdateResult> {
        return this.livroRepository.update(livro.id, livro);
    }

    async remove(id: number) {
        const livro: Livro = await this.getOne(id);
        this.livroRepository.delete(livro.id);
    }
}