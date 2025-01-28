import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Funcionario } from 'src/app/models/Funcionario';

@Component({
  selector: 'app-funcionario-form',
  templateUrl: './funcionario-form.component.html',
  styleUrls: ['./funcionario-form.component.scss']
})
export class FuncionarioFormComponent implements OnInit {
  @Output() onSubmit = new EventEmitter<Funcionario>() ;

  funcionarioForm!: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.funcionarioForm = new FormGroup({
      id: new FormControl('0'),
      nome: new FormControl(''),
      sobrenome: new FormControl(''),
      departamento: new FormControl(''),
      ativo: new FormControl('true'),
      turno: new FormControl(''),
      dataDeCriacao: new FormControl(new Date()),
      dataDeAlteracao: new FormControl(new Date()),
      
    });
  }

  
  submit() {
    if (this.funcionarioForm.valid) {
      const funcionarioData = {
        ...this.funcionarioForm.value,
        ativo: Boolean(this.funcionarioForm.value.ativo), 
        dataDeCriacao: new Date().toISOString(),
        dataDeAlteracao: new Date().toISOString() 
      };
      this.onSubmit.emit(funcionarioData);
    } else {
      console.error('Formulário inválido'); 
    }
  }

}
