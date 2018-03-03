import { Component, OnInit } from '@angular/core';
import { GlobalMessageService } from '../global-message.service';

@Component({
	selector: 'global-messages',
	templateUrl: './global-messages.component.html',
	styleUrls: ['./global-messages.component.css']
})
export class GlobalMessagesComponent implements OnInit {

	constructor(public globalMessageService: GlobalMessageService) { }

	ngOnInit() {
	}

}
