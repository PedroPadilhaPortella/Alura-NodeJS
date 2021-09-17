import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AppController } from './app.controller';

import { Livro } from './livros/livro.model';
import { LivroModule } from './livros/livro.module';

/* .env file
USER=root
PASSWORD=root
DATABASE=library_nest_api
*/

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE,
            entities: [Livro],
            autoLoadEntities: true,
            synchronize: true,
          }),
        LivroModule,
    ],
    controllers: [AppController, ],
    providers: [AppService],
})
export class AppModule { }
