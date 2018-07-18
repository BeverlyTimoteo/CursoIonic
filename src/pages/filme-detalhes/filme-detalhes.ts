import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';

@IonicPage()
@Component({
  selector: 'page-filme-detalhes',
  templateUrl: 'filme-detalhes.html',
  providers:[
    MovieProvider
  ]
})
export class FilmeDetalhesPage {
  public filme;
  public idFilme;

  constructor(public navCtrl: NavController, public navParams: NavParams, public movie: MovieProvider) {
  }

  ionViewDidEnter() {
    this.idFilme = this.navParams.get("id");
    
    this.carregarDetalheFilme();
  }

  carregarDetalheFilme() {
    this.movie.getDetalheFilme(this.idFilme).subscribe(
      data => {
        this.filme = JSON.parse((data as any)._body);      

      }, error => {
        console.log(error);
      }
    )

  }

}
