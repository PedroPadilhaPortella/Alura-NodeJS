import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LivrosController } from './livros.controller';
import { LivroService } from './livro.service';

@Module({
    imports: [],
    controllers: [AppController, LivrosController],
    providers: [AppService, LivroService],
})
export class AppModule { }
