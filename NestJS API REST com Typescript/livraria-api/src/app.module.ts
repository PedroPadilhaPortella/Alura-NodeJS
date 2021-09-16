import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { Livro } from './livros/livro.model';
import { LivroModule } from './livros/livro.module';
import { LivroService } from './livros/livro.service';
import { LivrosController } from './livros/livros.controller';

/* .env file
USER=root
PASSWORD=root
DATABASE=library_nest_api
*/

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            models: [Livro],
            autoLoadModels: true,
            synchronize: true,
        }),
        LivroModule,
    ],
    controllers: [AppController, LivrosController],
    providers: [AppService, LivroService],
})
export class AppModule { }
