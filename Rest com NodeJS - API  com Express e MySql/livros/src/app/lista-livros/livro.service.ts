import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro';

@Injectable({
    providedIn: 'root'
})
export class LivroService {

    url = 'http://localhost:3000/livros/'

    constructor(private http: HttpClient) { }

    public getLivros(): Observable<Livro[]> {
        return this.http.get<Livro[]>(this.url);
    }

    public getLivroById(id: number): Observable<Livro> {
        return this.http.get<Livro>(`${this.url}${id}`);
    }

    public saveLivro(livro: Livro): Observable<any> {
        return this.http.post(this.url, livro);
    }
    
    public updateLivro(Id: number, livro: Livro): Observable<any> {
        return this.http.put(`${this.url}${Id}`, livro);
    }

    public deleteLivro(Id: string): Observable<any> {
        return this.http.delete(`${this.url}${Id}`);
    }
}
