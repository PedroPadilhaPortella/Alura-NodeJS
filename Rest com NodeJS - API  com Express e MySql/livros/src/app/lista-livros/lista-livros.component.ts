import { Component, OnInit } from '@angular/core';
import { Livro } from './livro';
import { LivroService } from './livro.service';

@Component({
    selector: 'app-lista-livros',
    templateUrl: './lista-livros.component.html',
    styleUrls: ['./lista-livros.component.scss']
})
export class ListaLivrosComponent implements OnInit {

    livros: Livro[] = [];
    filter: string = '';

    constructor(private livroService: LivroService) { }

    ngOnInit(): void {
        this.getLivros();
    }

    private getLivros() {
        this.livroService.getLivros().subscribe(
            livros => {
                if(this.filter)
                    this.livros = livros.filter(livro => livro.Titulo.includes(this.filter))
                else 
                    this.livros = livros
            },
            erro => console.log(erro)
        );
    }

    public excluirLivro(Id: string): any {
        this.livroService.deleteLivro(Id).subscribe(
            () => this.getLivros(),
            error => console.log(error)
        );
    }

    public search(event: Event): void {
        // this.filter = event.target
        console.log(event);
    }
}
