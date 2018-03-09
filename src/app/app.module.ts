import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailComponent } from './message-detail/message-detail.component';
import { MessageService } from './services/message.service';
import { GlobalMessageService } from './services/global-message.service';
import { GlobalMessagesComponent } from './global-messages/global-messages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { AuthorizeService } from './services/authorize.service';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
	declarations: [
		AppComponent,
		AppNavbarComponent,
		MessagesComponent,
		MessageDetailComponent,
		GlobalMessagesComponent,
		LoginComponent,
		RegisterComponent,
		LogoutComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule,
		HttpClientModule,
    ReactiveFormsModule
	],
	providers: [MessageService, GlobalMessageService, UserService, AuthorizeService],
	bootstrap: [AppComponent]
})
export class AppModule { }
