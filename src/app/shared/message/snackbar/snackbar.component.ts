import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NotificationService } from '../notification.service';
import { Observable, timer } from 'rxjs';
import { tap, switchMap} from 'rxjs/operators'

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({
        opacity: 0,
        bottom: '0px'
      })),
      state('visible', style({
        opacity: 1,
        bottom: '30px'
      })),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  snackVisibility: string = 'hidden'
  mensagem: string
  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
    .pipe(
      tap(message=> {
        this.mensagem = message
        this.snackVisibility = 'visible'
      }), 
      switchMap(message => timer(3000))
    ).subscribe(timer => this.snackVisibility = 'hidden')
  }

   /*  this.notificationService.notifier
    .do(message=> {
      this.mensagem = message
      this.snackVisibility = 'visible'
    }).switchMap(message => Observable.timer(3000))
    .subscribe(timer => this.snackVisibility = 'hidden')
  } */
          
}

/*a função trigger define os dados da animação, onde o primeiro parâmetro 
é o nome e o segundo é um array de estados
O Observable como o timer controlará o tempo que a motificação será mostrada
Nesse caso o timer recebeu 3000 miilisegundos(3 segundos), logo após temos um subscribe que 
ficará escutando esse timer, quando o tempos especificado estourar, a variável
snackVisibility recebe a propriedade 'hidden'

O método que faz a notificação foi refatorado pq o anterior continha 2 subscribes, isso gerava
alguns transtornos quando a usuário adicionava vários items simultâneos. Como os observables
eram independentes, e um estava dentro do outro, a cada clique de adição um timer era iniciado
e concorriam entre sí, fazendo com que o snackbar se apresentase de forma irregular

O 'do' permite realizar uma ação no momento em que rcebe uma mensagem

O 'switchMap' ao contrário do 'Map'(que recebe uma mensagem e a trasnforma em um outro formato),
recebe uma mensagem e a partir daquela mensagem de notificação retorna um Observable contendo
o timer 

No angular 6 o operador 'do' foi renomeado para 'tap'
A direfençã é que os operadores 'do'(tap) e 'switchMap' não fazer parte mais da gama de operadores
estáticos do 'observable' mas sim da biblioteca do 'rxjs'
Sendo que os mesmos agora deverão ser utilizados dentro de um 'pipe' que envolve todos os operadores
*/ 
