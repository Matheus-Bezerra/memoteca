import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss']
})
export class CriarPensamentoComponent {
  pensamento: Pensamento = {
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(private _service: PensamentoService,
    private _router: Router
    ) {}

  criarPensamento() {
    this._service.criar(this.pensamento).subscribe(() => {
      this._router.navigate(['/listarPensamento'])
    })
  }

  cancelar() {
    this._router.navigate(['/listarPensamento'])
  }

}
