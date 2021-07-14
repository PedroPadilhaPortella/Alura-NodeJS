import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro';
import { LivroService } from '../livro.service';

@Component({
    selector: 'app-editar-livro',
    templateUrl: './editar-livro.component.html',
    styleUrls: ['./editar-livro.component.scss']
})
export class EditarLivroComponent implements OnInit {

    public livroForm: FormGroup;
    public livro: Livro;

    constructor (private fb: FormBuilder, private router: Router, private livroService: LivroService, private actRoute: ActivatedRoute)
    {
        this.livro = this.actRoute.snapshot.data['livro'];
        
    }
    
    ngOnInit(): void {
        this.livroForm = this.fb.group({
            Id: [{value: this.livro.Id, disabled: true}, [Validators.required]],
            Titulo: ['', [Validators.required]],
            Autor: ['', [Validators.required]],
            Editora: ['', [Validators.required]],
            QuantidadeDePaginas: ['', [Validators.required]],
            QuantidadeDeExemplares: ['', [Validators.required]],
        });
        console.log(this.livro);

        this.livroForm.patchValue({
            Titulo: this.livro.Titulo,
            Autor: this.livro.Autor,
            Editora: this.livro.Editora,
            QuantidadeDePaginas: this.livro.QuantidadeDePaginas,
            QuantidadeDeExemplares: this.livro.QuantidadeDeExemplares
        });
    }

    public adicionarLivro(): void {
        if (this.livroForm.valid) {
            const livro = this.livroForm.getRawValue() as Livro;
            this.livroService.updateLivro(this.livro.Id, livro).subscribe(
                () => this.router.navigate(['livros']),
                (error) => console.log(error),
            );
        }
    }
}
