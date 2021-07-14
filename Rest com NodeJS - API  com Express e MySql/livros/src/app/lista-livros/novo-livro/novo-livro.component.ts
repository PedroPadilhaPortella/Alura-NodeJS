import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livro } from '../livro';
import { LivroService } from '../livro.service';

@Component({
  selector: 'app-novo-livro',
  templateUrl: './novo-livro.component.html',
  styleUrls: ['./novo-livro.component.scss']
})
export class NovoLivroComponent implements OnInit {

    public livroForm!: FormGroup;

    constructor( private formBuilder: FormBuilder, private router: Router, private livroService: LivroService) { }

    ngOnInit(): void {
        this.livroForm = this.formBuilder.group({
            Titulo: ['', [Validators.required]],
            Autor: ['', [Validators.required]],
            Editora: ['', [Validators.required]],
            QuantidadeDePaginas: ['', [Validators.required]],
            QuantidadeDeExemplares: ['', [Validators.required]],
        });
    }

    public adicionarLivro(): void {
        if(this.livroForm.valid) {
            const livro = this.livroForm.getRawValue() as Livro;
            this.livroService.saveLivro(livro).subscribe(
                () => this.router.navigate(['livros']),
                (error) => console.log(error),
            );
        }
    }
}
