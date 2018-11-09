import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';

/*
Get the route that created it,
Extract the id from the route
Acquire the hero with that id from the server via the HeroService
*/
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from 'src/app/services/hero.service';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() hero: Hero;
  constructor(
  private route: ActivatedRoute,
  private heroService: HeroService,
  private location: Location
  ) { }

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    // + : used to convert string to a number
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  // to go back to the previous path/view
  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
    .subscribe(() => this.goBack());
  }
}
