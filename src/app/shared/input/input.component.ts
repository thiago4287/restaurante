import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel, FormControlName } from '@angular/forms';
@Component({
  selector: 'mt-input-conteiner',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {
  
  @Input()label: string
  @Input() errorMessage: string
  @Input() showType: true
  input: any

  @ContentChild(NgModel) model: NgModel
  /* Para atribuir uma referência do NgModel à variavel 'input' é necessário que o compo-
  saiba  a hora certa de fazer isso, e quem vai ficar responsável por apresentar ao
   componente pai é a interface 'AfterContentInit' */
   @ContentChild(FormControlName) control: FormControlName
  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.input = this.model || this.control

    if(this.input === undefined){
      throw new Error('Esse componente precisa ser usado com uma diretiva ngModel ou FormControlName')
      // Verifica se o 'input realmente existe
      
    }
  }

  hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched)
  }

  hasError(): boolean {
    return !this.input.valid && (this.input.dirty || this.input.touched)
  }
}

/*
O objeto 'input' será passado dentro do ng-content e será usado como referência para 
acessar as propriedades do ng-model que estava no input local

O componente label e errorMessage recebe o decorator @Input porque receberão esses
componentes do pai 
 O ContentChild faz com que o component pai injete uma referência da diretiva NgModel
 nesse componente filho, fazendo com que a tag 'ng-content' possua a referência a essa 
 diretiva, e assim suas propriedades podem ser usadas no template local


O método ngAfterContentInit() será chamado quando o conteúdo que vai ficar no lugar de
ngContent for definido
Assim que isso acontecer, será verificado se o ngModel existe e se exister será atri-
buída uma referêcia dele para a vaiável 'input'
*/
