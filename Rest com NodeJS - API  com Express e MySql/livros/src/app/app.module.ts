import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { NovoLivroComponent } from './lista-livros/novo-livro/novo-livro.component';
import { EditarLivroComponent } from './lista-livros/editar-livro/editar-livro.component';
import { LivroResolve } from './lista-livros/livro.resolve';
import { FilterByTitlePipe } from './lista-livros/filter-by-description.pipe';

@NgModule({
    declarations: [
        AppComponent,
        ListaLivrosComponent,
        NovoLivroComponent,
        EditarLivroComponent,
        FilterByTitlePipe
    ],
    imports: [
        BrowserModule,
        RouterModule,
        HttpClientModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule
    ],
    providers: [LivroResolve],
    bootstrap: [AppComponent]
})
export class AppModule { }
