import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessageService } from './message.service';
import { GlobalMessageService } from './global-message.service';
import { GlobalMessagesComponent } from './global-messages/global-messages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
	declarations: [
		AppComponent,
		AppNavbarComponent,
		MessagesComponent,
		MessageDetailComponent,
		GlobalMessagesComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule
	],
	providers: [MessageService, GlobalMessageService],
	bootstrap: [AppComponent]
})
export class AppModule { }
