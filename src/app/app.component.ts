import { Component } from '@angular/core';
import { io } from 'socket.io-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  targetLanguages = ['zh-CN', 'hi', 'id', 'es', 'tl', 'sd', 'vi'];
  selectedLanguage = this.targetLanguages[0];
  
  messageText: string = '';
  title = 'translateApp';
  messages: Array<any> = [];
  socket: any;

  constructor(){
    this.socket = io();
    console.log(this.socket.id);
  }

  ngOnInit(){
    this.messages = new Array ();
    this.listen2Events();
  }

  listen2Events(){
    this.socket.on('onTranslateText', (data:any) => {
      console.log(data);
      this.messages.push(data);
    });
  }

  sendText(){
    let obj = {
      text: this.messageText,
      targetLanguage: this.selectedLanguage,
    };
    console.log(obj);
    this.socket.emit('onNewText', obj);
  }

}


