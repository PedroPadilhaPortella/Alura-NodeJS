import { Body, Controller, Get, HttpStatus, NotFoundException, Param, Post } from '@nestjs/common';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from './../core/http/nest-response-builder';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

@Controller('users')
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) {}

    @Get(':nomeDeUsuario')
    public buscaPorNomeDeUsuario(@Param('nomeDeUsuario') nomeDeUsuario: string): Usuario {
        const usuarioEncontrado = this.usuarioService.buscaPorNomeDeUsuario(nomeDeUsuario);
        if(!usuarioEncontrado) {
            throw new NotFoundException({ statusCode: HttpStatus.NOT_FOUND, message: 'Usuário não encontrado'});
        }
        return usuarioEncontrado;
    }

    @Get()
    public buscarTodos(): Usuario[] {
        return this.usuarioService.buscarTodos();
    }

    @Post()
    public cria(@Body() usuario: Usuario): NestResponse {
        const usuarioCriado = this.usuarioService.cria(usuario);
        const response = new NestResponseBuilder()
            .status(HttpStatus.CREATED)
            .headers({ 'Location': `./users/${usuarioCriado.nomeDeUsuario}` })
            .body(usuarioCriado).build();
        return response;
    }
}