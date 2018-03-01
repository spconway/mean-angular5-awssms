import { NgModule } 						from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }      		from './app.component';
import { MessagesComponent }		from './messages/messages.component';
import { LoginComponent }				from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'message', component: MessagesComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
