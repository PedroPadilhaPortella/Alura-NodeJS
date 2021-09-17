import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Livro } from './livro.model';
import { LivroService } from "./livro.service";
import { LivrosController } from "./livros.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Livro])],
    controllers: [LivrosController],
    providers: [LivroService],
    exports: [TypeOrmModule]
})
export class LivroModule {}