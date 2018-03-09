import { Component, OnInit } from '@angular/core';
import { Message } from '../objects/message';
import { MessageService } from '../services/message.service';
import { FormGroup, FormControl, Validators } from "@angular/forms";

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
		//this.messageService.sendMessage(m);
    this.getMessages();
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
      let f = this.messageForm.value;
      console.log("f: ", f.date);
      this.message = new Message(f.phone, f.message, f.date, 'PENDING');
      console.log("Form Submitted!", this.message.toString());
      this.sendMessage(this.message);
    }
  }
}
