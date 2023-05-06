import { PensamentoService } from './../pensamento.service';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';

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

  constructor(private _service: PensamentoService) {}

  ngOnInit(): void {
      this._service.listar(this.paginaAtual, this.filtro).subscribe(pensamentos => {
        this.listaPensamentos = pensamentos
      })
  }

  carregarMaisPensamentos() {
    this._service.listar(++this.paginaAtual, this.filtro).subscribe(pensamentos => {
      this.listaPensamentos.push(...pensamentos)
      if(!pensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos() {
    this.haMaisPensamentos = true
    this.paginaAtual = 1
    this._service.listar(this.paginaAtual, this.filtro)
      .subscribe(pensamentos => {
        this.listaPensamentos = pensamentos
      })
  }
}
