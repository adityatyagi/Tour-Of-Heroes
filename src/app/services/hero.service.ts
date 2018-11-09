import { Injectable } from '@angular/core';

// for importing the mock data
import { HEROES } from '../components/heroes/mock-heroes';

// message service
import { MessageService } from './message.service';

import { Hero } from '../components/heroes/hero';
import { of, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HeroService {
  getHeroes(): Observable<Hero[]> {

    // TODO: send the message _after_ fetching the heroes
    this.messageService.add('HeroService: fetched heroes');

    // returns an observable - mocks HttpClient.get() async operation
    return of(HEROES);
  }

  constructor(private messageService: MessageService) { }
}
