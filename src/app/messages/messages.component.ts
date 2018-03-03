import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	usrMsgCnt;
	usrMsgs: Message[];

  message = new Message('', '', '', 'PENDING', '', '');

  constructor(private messageService: MessageService) { }

  ngOnInit() {
  	// var plcHldrMsg: Message = {
			// id: '43jk-32jk-333-fdss',
			// phone: '7742328575',
			// message: 'test',
			// date: 'today',
			// messageStatus: 'DELIVERED',
			// error: null
  	// };

  	// this.usrMsgs.push(plcHldrMsg);
  	this.getMessages();
  }

  sendMessage(m: Message): void {
  	console.log("New message is being sent: ", m);
  }

  getMessages(): void {
  	this.messageService.getMessages()
  		.subscribe(messages => {
  			this.usrMsgs = messages;
  			this.usrMsgCnt = this.usrMsgs.length;
  		});
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
    this.usrMsgs.push(this.message);
    this.usrMsgCnt = this.usrMsgs.length;
    this.sendMessage(this.message);
    this.message = new Message('', '', '', 'PENDING', '', '');
  }

}
