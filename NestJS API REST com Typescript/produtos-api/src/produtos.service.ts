import { Injectable } from "@nestjs/common";
import { Produto } from "./produto.model";

@Injectable()
export class ProdutosService {
    produtos: Produto[] = [
        new Produto('LIV01', 'TDD e DDD na prática', 38.9),
        new Produto('LIV02', 'Iniciando com Flutter', 52.9),
        new Produto('LIV03', 'Padrões de Projeto', 89.9),
    ]

    getAll(): Produto[] {
        return this.produtos;
    }

    getOne(id: number): Produto {
        return this.produtos[id];
    }

    create(produto: Produto) {
        this.produtos.push(produto);
    }

    update(produto: Produto): Produto {
        return produto;
    }

    remove(id: number) {
        this.produtos.pop()
    }
}