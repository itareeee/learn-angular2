import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: Http) { }

  getHeroes(): Promise<Hero[]> {
    //// Simulate server latency with 2 second delay
    //return new Promise(resolve => {
    //  setTimeout(() => resolve(HEROES), 2000);
    //});
    return this.http.get(this.heroesUrl)
               .toPromise()
               .then(response => response.json().data as Hero[])
               .catch(this.handleError);
  }

  getHero(id: number): Promise<Hero> {
    //return this.getHeroes()
    //  .then(heroes => heroes.find(hero => hero.id === id));
    //
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}

