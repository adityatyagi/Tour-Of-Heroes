import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
   selectedHero: Hero;
  hero: Hero = {
    id: 1,
    name: 'Aditya Tyagi'
  };

    onSelect(hero: Hero): void {
      this.selectedHero = hero;
    }
  constructor(private heroService: HeroService) { }

  ngOnInit() {
    // initialise data - getting the hero data from the service
    this.getHeroes();
  }

  getHeroes(): void {
    // streamData is one hero in the stream of heroes
    this.heroService.getHeroes()
    .subscribe(streamData => this.heroes = streamData);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero( {name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    // filter the current this.heroes array by removing the deleting hero
    this.heroes = this.heroes.filter(h => h !== hero);

    this.heroService.deleteHero(hero).subscribe();
  }

}
