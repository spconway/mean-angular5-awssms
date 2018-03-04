import { Component, OnInit } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { message } from "aws-sdk/clients/sns";
import { MessageFormat } from "aws-sdk/clients/iot";

@Component({
	selector: 'app-messages',
	templateUrl: './messages.component.html',
	styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
	usrMsgCnt;
	usrMsgs: Message[];
	submitted = false;
	message: Message;
	messageForm: FormGroup;

  constructor(private messageService: MessageService) { }

	ngOnInit() {
		this.getMessages();
    this.messageForm = new FormGroup({
      phone: new FormControl('', [
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.required
      ]),
      date: new FormControl('')
    });
	}

	sendMessage(m: Message) {
		console.log('New message is being sent: ', m);
	}

	getMessages(): void {
		this.messageService.getMessages()
			.subscribe(messages => {
				this.usrMsgs = messages;
				this.usrMsgCnt = this.usrMsgs.length;
			});
	}

  onSubmit() {
    if (this.messageForm.valid) {
      // var f = this.messageForm.value;
      //this.message = new Message(f.phone, f.message, '', 'PENDING');
      //console.log("Form Submitted!", this.message);
      //this.sendMessage(this.message);
    }
  }
}
