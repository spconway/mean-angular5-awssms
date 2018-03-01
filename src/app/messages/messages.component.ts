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

	message: Message = {
		id: null,
		date: null,
		phone: null,
		message: null,
		messageStatus: null,
		error: null
	};

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

  sendMessage() {
  	this.message.messageStatus = 'PENDING';
  	console.log("Message: ", this.message);
  	this.usrMsgs.push(this.message);
  	this.usrMsgCnt = this.usrMsgs.length;
  	this.clearInputs();
  }

  getMessages(): void {
  	this.messageService.getMessages()
  		.subscribe(messages => {
  			this.usrMsgs = messages;
  			this.usrMsgCnt = this.usrMsgs.length;
  		});
  }

  clearInputs() {
		this.message.id = null;
		this.message.date = null;
		this.message.phone = null;
		this.message.message = null;
		this.message.messageStatus = null;
		this.message.error = null;
  }

}
