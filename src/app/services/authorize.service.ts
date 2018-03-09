import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../objects/user";
import * as moment from 'moment';
import {of} from "rxjs/observable/of";
import {Observable} from "rxjs/Observable";
import {GlobalMessageService} from "./global-message.service";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthorizeService {

  constructor(private http: HttpClient,
              private globalMessageService: GlobalMessageService) {

  }

  login(email:string, password:string ) {
    return this.http.post<User>('/api/login', {email, password})
      .pipe(
        tap(user => this.setSession(user)),
        catchError(this.handleError('login', []))
      );
  }

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'seconds');
    console.log("Authorize Service Result: ", authResult);
    console.log("Authorize Service expiresIn: ", authResult.expiresIn);
    console.log("Authorize Service expiresAt: ", expiresAt);

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
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
}
