import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider {
  private urlBase = "https://api.themoviedb.org/3/";
  private key = "api_key=3d611993459d0a1bc05bc3aa7aab8858";

  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getUltimosLancamentos(page = 1) {
    return this.http.get(this.urlBase + `movie/popular?page=${page}&` + this.key);
  }

  getDetalheFilme(id) {
    return this.http.get(this.urlBase + `movie/${id}?` + this.key);
  }

}
