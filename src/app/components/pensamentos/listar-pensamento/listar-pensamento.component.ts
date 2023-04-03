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

  constructor(private _service: PensamentoService) {}

  ngOnInit(): void {
      this._service.listar().subscribe(pensamentos => {
        this.listaPensamentos = pensamentos
      })
  }
}
