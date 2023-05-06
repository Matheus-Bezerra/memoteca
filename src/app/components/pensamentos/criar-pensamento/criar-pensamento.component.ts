import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PensamentoService } from '../pensamento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from 'src/app/shared/validators/nameValidator';

@Component({
  selector: 'app-criar-pensamento',
  templateUrl: './criar-pensamento.component.html',
  styleUrls: ['./criar-pensamento.component.scss']
})
export class CriarPensamentoComponent {

  formulario!: FormGroup

  constructor(private _service: PensamentoService,
    private _router: Router,
    private _formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this._formBuilder.group({
      conteudo: ["", Validators.compose([
        Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/), 
      ])],
      autoria: ['', Validators.compose([
        Validators.required, Validators.minLength(3), nameValidator
      ])],
      modelo: ["modelo1"]
    })

  }

  criarPensamento() {
    console.log(this.formulario.get('conteudo'))
    if (this.formulario.valid) {
      this._service.criar(this.formulario.value).subscribe(() => {
        this._router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar() {
    this._router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string {
    console.log(this.formulario)
    if(this.formulario.valid) {
      return 'botao'
    } else {
      return 'botao__desabilitado'
    }
  } 

}
