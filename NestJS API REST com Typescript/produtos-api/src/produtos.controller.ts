import { ProdutosService } from './produtos.service';
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { Produto } from './produto.model';

@Controller("produtos")
export class ProdutosController {

    constructor(private produtosService: ProdutosService) {}

  @Get()
  getAll(): Produto[] {
    return this.produtosService.getAll();
  }
  
  @Get(':id')
  getById(@Param() params): Produto {
    return this.produtosService.getOne(params.id);
  }
  
  @Post()
  post(@Body() produto: Produto) {
    this.produtosService.create(produto);
}
  
  @Put()
  put(@Body() produto: Produto): Produto {
    return this.produtosService.update(produto);
  }
  
  @Delete(':id')
  delete(@Param() params) {
      this.produtosService.remove(params.id)
  }
}
