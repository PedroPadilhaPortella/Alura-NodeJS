import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FitroDeExcecaoHttp } from './common/filtros/filtro-de-excecao-http.filter';
import { TransformResponseInterceptor } from './core/http/tranform-response.interceptor';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [UsuarioModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FitroDeExcecaoHttp
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    {
        provide: APP_INTERCEPTOR,
        useClass: TransformResponseInterceptor
    }
  ],
})
export class AppModule {}
