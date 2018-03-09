import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { GlobalMessageService } from './global-message.service';
import { of } from "rxjs/observable/of";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable()
export class UserService {
  private rootUrl = 'api/';
  private authenticationUrl = 'login';
  private registerUrl = 'registration';
  private statusUrl = 'status';

  constructor(
    private globalMessageService: GlobalMessageService,
    private http: HttpClient
  ) { }

  login(username: string, email: string, password: string) {
    let url = this.rootUrl + this.authenticationUrl;
    return this.http.post<any>(url, { username: username, email: email, password: password })
      .pipe(
        tap(user => this.log(`fetched user` + user)),
        catchError(this.handleError('authenticate', []))
      );
  }

  register(username: string, email: string, password: string, passwordConf: string) {
    let url = this.rootUrl + this.registerUrl;
    return this.http.post<any>(url, {
      username: username,
      email: email,
      password: password,
      passwordConf: passwordConf
    }).pipe(
      tap(user => this.log('Created user')),
      catchError(this.handleError('registration', []))
    );
  }

  logout() {
    let url = this.rootUrl + this.authenticationUrl;
    console.log('user.service.logout');
    // remove user from local storage to log user out
    return this.http.delete<any>(url)
      .pipe(
        tap(message => this.log('logged out')),
        catchError(this.handleError('logout', []))
      );
  }

  getStatus() {
    let url = this.rootUrl + this.statusUrl;
    return Observable
      .interval(15000)
      .flatMap((i) => this.http.get<any>(url))
      .pipe(
        tap(message => this.log(`get status ${message.status}`)),
        catchError(error => {
          Observable.empty();
          return of(`caught: ${error}`)
          //this.handleError('status', [])
        })
      );
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

  /** Log a MessageService message with the MessageService */
  private log(message: string) {
    this.globalMessageService.add('MessageService: ' + message);
  }

}
