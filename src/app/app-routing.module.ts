import { NgModule } 						from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent }      		from './app.component';
import { MessagesComponent }		from './messages/messages.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'message', component: MessagesComponent }
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
