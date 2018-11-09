import { Component, OnInit } from '@angular/core';

// modules required for for elastic search
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Hero } from '../heroes/hero';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;

  /*
  A Subject is both a source of observable values and an Observable itself. You can subscribe to a Subject as you would any Observable.

  You can also push values into that Observable by calling its next(value) method as the search() method does.

  The search() method is called via an event binding to the textbox's keystroke event.
  */
  // searchTerms is a source of "string observable values"
  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) { }

  /*
  Every time the user types in the textbox, the binding calls search() with the textbox value, a "search term".
  The searchTerms becomes an Observable emitting a steady stream of search terms.
  */
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  /*

  debounceTime(300) -- waits until the flow of new string events pauses for 300 milliseconds before passing along the latest string. You'll never make requests more frequently than 300ms.

  distinctUntilChanged() -- ensures that a request is sent only if the filter text changed.


  switchMap() -- calls the search service for each search term that makes it through debounce and distinctUntilChanged. It cancels and discards previous search observables, returning only the latest search service observable.
  */

  ngOnInit(): void {
    // The searchTerms becomes an Observable emitting a steady stream of search terms.
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      // The searchTerms becomes an Observable emitting a steady stream of search terms - "term"
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }



}
