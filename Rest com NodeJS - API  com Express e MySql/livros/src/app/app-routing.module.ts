import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditarLivroComponent } from './lista-livros/editar-livro/editar-livro.component';
import { ListaLivrosComponent } from './lista-livros/lista-livros.component';
import { LivroResolve } from './lista-livros/livro.resolve';
import { NovoLivroComponent } from './lista-livros/novo-livro/novo-livro.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'livros',
        pathMatch: 'full'
    },
    {
        path: 'livros',
        component: ListaLivrosComponent
    },
    {
        path: 'novo',
        component: NovoLivroComponent
    },
    {
        path: 'editar/:Id',
        component: EditarLivroComponent,
        resolve: { livro: LivroResolve }
    },
    {
        path: 'not-found',
        component: NotFoundComponent
    },
    { 
        path: '**', 
        redirectTo: 'not-found',
        pathMatch: 'full'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
