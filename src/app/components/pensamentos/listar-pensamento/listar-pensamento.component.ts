import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.scss']
})
export class ListarPensamentoComponent implements OnInit {
  listaPensamentos: Pensamento[] = []
  paginaAtual: number = 1
  haMaisPensamentos: boolean = true
  filtro: string = ""
  favoritos: boolean = false
  listaFavoritos: Pensamento[] = []
  titulo: string = "Meu mural"

  constructor(private _service: PensamentoService, private _router: Router) {}

  ngOnInit(): void {
      this._service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe(pensamentos => {
        this.listaPensamentos = pensamentos
      })
  }

  recarregarComponente() {
    this.favoritos = false
    this.paginaAtual = 1

    this._router.routeReuseStrategy.shouldReuseRoute = () => false
    this._router.onSameUrlNavigation = 'reload'
    this._router.navigate([this._router.url])
  }

  carregarMaisPensamentos() {
    this._service.listar(++this.paginaAtual, this.filtro, this.favoritos).subscribe(pensamentos => {
      this.listaPensamentos.push(...pensamentos)
      if(!pensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this._service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentos => {
        this.listaPensamentos = pensamentos
      })
  }

  listarFavoritos() {
    this.titulo = "Meus favoritos"
    this.favoritos = true
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this._service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentosFavoritos => {
        this.listaPensamentos = pensamentosFavoritos
        this.listaFavoritos = pensamentosFavoritos
      })
  }
}
