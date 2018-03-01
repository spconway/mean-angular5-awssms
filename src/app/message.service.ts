import { Injectable } 							from '@angular/core';
import { Message }									from './message';
import { HttpClient, HttpHeaders }	from '@angular/common/http';
import { GlobalMessageService }			from './global-message.service';
import { Observable } 							from 'rxjs/Observable';
import { of } 											from 'rxjs/observable/of';
import { catchError, map, tap } 		from 'rxjs/operators';


@Injectable()
export class MessageService {
	private messageUrl = 'messages'; // URL to web api

	/**
	 * GET service call. Returns messages array
	 * @return {Message[]} [description]
	 */
	getMessages(): Observable<Message[]> {
		return this.http.get<Message[]>(this.messageUrl)
			.pipe(
				tap(messages => this.log(`fetched messages`)),
				catchError(this.handleError('getMessage', []))
			);
	}

	/** Log a MessageService message with the MessageService */
	private log(message: string) {
	  this.globalMessageService.add('MessageService: ' + message);
	}

	/**
	 * Handle Http operation that failed.
	 * Let the app continue.
	 * @param operation - name of the operation that failed
	 * @param result - optional value to return as the observable result
	 */
	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error); // log to console instead

	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

  constructor(
  	private globalMessageService: GlobalMessageService,
  	private http: HttpClient) { }

}
