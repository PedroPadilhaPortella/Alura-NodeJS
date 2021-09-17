import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from "@nestjs/common";
import { Livro } from './livro.model';

@Module({
    imports: [SequelizeModule.forFeature([Livro])],
    exports: [SequelizeModule]
})
export class LivroModule {}