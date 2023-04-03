import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.scss'],
})
export class EditarPensamentoComponent implements OnInit {
  pensamento!: Pensamento;

  constructor(
    private _service: PensamentoService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id')
    this._service.buscarPorId(parseInt(id!)).subscribe((pensamento) => {
      this.pensamento = pensamento
    })
  }

  editarPensamento() {
    this._service.editar(this.pensamento).subscribe(() => {
      this._router.navigate(['listarPensamento'])
    })
  }

  cancelar() {}
}
