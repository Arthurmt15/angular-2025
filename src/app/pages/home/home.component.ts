import { Component, OnInit } from '@angular/core';
import { Funcionario } from 'src/app/models/Funcionario';
import { FuncionarioService } from 'src/app/services/funcionario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  funcionarios: Funcionario[] = [];
  funcionarioGeral: Funcionario[] = []; 

  constructor( private funcionarioService : FuncionarioService) { }

  ngOnInit(): void {

    this.funcionarioService.getFuncionario().subscribe(data => {
      const dados = data.dados;

      dados.map((item) => {
        item.dataDeCriacao = new Date(item.dataDeCriacao!).toLocaleString('pt-BR')
        item.dataDeAlteracao = new Date(item.dataDeAlteracao!).toLocaleString('pt-BR')
      })

      this.funcionarios = data.dados;
      this.funcionarioGeral = data.dados;
    });

  }

  search(event : Event) {
    const target = event.target as HTMLInputElement
    const value = target.value.toLowerCase();

    this.funcionarios = this.funcionarioGeral.filter(funcionario => {
      return funcionario.nome.toLowerCase().includes(value);
    })
  }

}
