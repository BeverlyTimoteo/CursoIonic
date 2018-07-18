import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { MovieProvider } from '../../providers/movie/movie';
import { FilmeDetalhesPage } from '../filme-detalhes/filme-detalhes';
//import { resolveDefinition } from '../../../node_modules/@angular/core/src/view/util';

/**
 * Generated class for the FeedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [
    MovieProvider
  ]
})
export class FeedPage {

  public jsonTeste = {
    titulo: "Beverly",
    data: "17 de Julho de 2018",
    descricao: "Teste de Json",
    qtde_likes: 5,
    qtde_comments: 8,
    time_commets: "10h go",
  }

  public listaFilmes = Array<any>();

  public nomeUser: string = "Beverly do prompt";
  public loader;
  public refresher;
  public isRefresher: boolean;
  public page:number = 1;
  public infiniteScroll;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private movie: MovieProvider,
    public loadingCtrl: LoadingController) {
  }

  public somaDoisValores(valor1: number, valor2: number): void {
    alert(valor1 + valor2);
  }

  abrirCarregar() {
    this.loader = this.loadingCtrl.create({
      content: "Carregando filmes..."
    });
    this.loader.present();
  }

  fecharCarregar() {
    this.loader.dismiss();
  }

  ionViewDidEnter() {
    this.carregarVideos();
  }

  doRefresh(refresher) {
    this.refresher = refresher;
    this.isRefresher = true;

    this.page = 1;

    this.carregarVideos();
  }

  //async carregarVideos() {
  carregarVideos(infinite: boolean = false) {
    this.abrirCarregar();

    //await new Promise(resolve => setTimeout(() => {resolve()}, 2000));

    this.movie.getUltimosLancamentos(this.page).subscribe(
      data => {

        const retorno = JSON.parse((data as any)._body);

        console.log(retorno);

        if (infinite) {
          this.listaFilmes = this.listaFilmes.concat(retorno.results);
          this.infiniteScroll.complete();

        } else {
          this.listaFilmes = retorno.results;
          this.page = 1;
        }

      }, error => {
        console.log(error);
      }
    )

    this.fecharCarregar();

    if (this.isRefresher) {
      this.refresher.complete();
      this.isRefresher = false;
    }
  }

  abrirDetalhes(item) {
    this.navCtrl.push(FilmeDetalhesPage, { id: item.id });
  }

  doInfinite(infiniteScroll) {
    this.infiniteScroll = infiniteScroll;
    this.page++;

    this.carregarVideos(true);
  }
}
