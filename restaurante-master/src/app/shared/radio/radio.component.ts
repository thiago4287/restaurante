import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { RadioOption } from './radio-option.model';
import {NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'mt-radio',
  templateUrl: './radio.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioComponent),
      multi: true
    }
  ]
})

export class RadioComponent implements OnInit, ControlValueAccessor {

  @Input() options: RadioOption[]

  value: any

  onChange: any
  constructor() { }

  ngOnInit() {
  }

  setValue(value: any) {
    this.value = value
    this.onChange(this.value)
  }

  writeValue(obj: any): void{
    this.value = obj;
  }
 
  /**
   * Esse método será chamado quando as diretivas quiserem passar algum valor para o componente
   */
    registerOnChange(fn: any): void {
      this.onChange = fn
    
    }
    /**
     * Passa uma função que é chamada sempre que o valor interno do componente mudar
     */
    registerOnTouched(fn: any): void{}
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * 
     * @param isDisabled
     */

    
    setDisabledState?(isDisabled: boolean): void {}

}

/* 
  Para que nosso componente possa ser acessado pelas diretivas, é necessário deixá-lo
  disponível(visível) para as mesmas acessá-lo. E qua vai se encarregar disso é o 
  provider 'NG_VALUE_ACESSOR', que deve ser listado na lista de providers deste compo-
  nente. Ele possui 2 parâmetros: o 'fowardRef()' que recebe como parâmetro uma função
  que referencia este componente e o parãmetro 'multi' que é booleano e recebe 'true'

  Para que tudo funcione, ainda é necessário que na chamada do template do compnente
  'radio' no template do componente 'order' seja adicionado um valor para o 'name' 
  e adicionardo também a diretiva ngModel
*/
