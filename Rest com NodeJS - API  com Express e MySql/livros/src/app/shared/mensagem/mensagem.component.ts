import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-mensagem',
    templateUrl: './mensagem.component.html'
})
export class MensagemComponent {

    @Input() mensagem: string = '';
}
