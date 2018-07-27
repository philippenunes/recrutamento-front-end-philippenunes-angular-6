import { CepService } from './cep.service';
import { PaisesService } from './../dashboard/paises.service';
import { UserFormService } from './user-form.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from './user';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Hero } from './hero';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  usuario = new Usuario();
  user = 'teste';
  paises: string[];
  senhaComparada: string;
  senhaError = false;

  constructor(
    private userFormService: UserFormService,
    private paisesService: PaisesService,
    private cepService: CepService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
  }

  verificaStatus5XX(status) {
    if (Array.from(status.toString()).includes('5')) {
        return true;
    } else {
        return false;
    }
  }

  confirmaSenha() {
    if (this.senhaComparada !== this.usuario.password) {
      this.senhaError = true;
    } else {
      this.senhaError = false;
    }
  }

  // Preenchimento automático do endereço
  pesquisacep() {
    this.cepService.buscaCEP(this.usuario.zipCode)
    .subscribe(
      data => {
        this.usuario.neighbourhood = data.bairro;
        this.usuario.city = data.localidade;
        this.usuario.streetName = data.logradouro;
        this.usuario.state = data.uf;
      },
      error => this.toastr.error('Cep não localizado!', 'Erro'));
  }

  validaFormulario() {
    // Converte pais para sigla
    // const country = this.usuario.country.sigla;
    // this.usuario.country = country;
    // Converte data para formato Brasileiro
    this.usuario.birthDate = moment(new Date(this.usuario.birthDate)).format('DD/MM/YYYY');
  }

  cadastraUsuario() {
    this.validaFormulario();
    this.userFormService.cadastrarUsuarioImproving(this.usuario)
    .subscribe(
      response => {
        this.toastr.success('Cadastro realizado com sucesso!', 'Oba! :)');
        this.router.navigate(['dashboard']);
      },
        error => {
          if (error.status === 400) {
            this.toastr.warning('Verifique os campos do formulário!', 'Dados inválidos!');
          } else if (error.status === 409) {
            this.toastr.warning('O e-mail informado já existe!', 'Dados inválidos!');
          } else if (error.status === 408 || this.verificaStatus5XX(error.status)) {
            this.toastr.warning('Tente novamente mais tarde!', 'Erro interno no servidor!');
          }
        });
    }
}
