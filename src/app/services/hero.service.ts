import { Injectable } from '@angular/core';

// for importing the mock data
import { HEROES } from '../components/heroes/mock-heroes';

// message service
import { MessageService } from './message.service';

import { Hero } from '../components/heroes/hero';
import { of, Observable } from 'rxjs';

// for interacting with the server
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  // now we will get data from in-memory-web-api rather than mockHeroes.ts
  private heroesUrl = 'api/heroes';  // URL to web api - :base/:collectionName
  // ----------------------- GET ALL HEROES ---------------------------------
  // get all heroes - OLD
  /*
  getHeroes(): Observable<Hero[]> {

    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');

    // returns an observable - mocks HttpClient.get() async operation
    return of(HEROES);
  }
  */

  /** GET all heroes from the server - NEW */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
      .pipe(
        tap(heroes => this.log('fetched heroes')),
        catchError(this.handleError('getHeroes', []))
      );
  }

  // ----------------------- GET HERO BY ID ---------------------------------
  // get a particular hero details
  /*
   // TODO: OLD
  getHero(id: number): Observable<Hero> {

    // TODO: send the message _after_ fetching the heroes
    this.messageService.add(`HeroService: fetched heroes with id: ${id}`);

    // returns an observable - mocks HttpClient.get() async operation
    return of(HEROES.find(hero => hero.id === id));
  }
  */

  /* Get hero by id - NEW */
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    // web api url for id specific hero
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  // -------------------------------------------------

  // GENERIC ERROR HANDLER - <T> for returning a suitable type of observable that the service expects
  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService - at the bottom of the components*/
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  constructor(private http: HttpClient, private messageService: MessageService) { }
}
