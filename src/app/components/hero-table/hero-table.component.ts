import { Component, OnInit } from '@angular/core';
import { Hero, HeroService } from '../../services/hero.service';

@Component({
    selector: 'rx-hero-table',
    templateUrl: './hero-table.component.html',
    styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnInit {
    heroes$ = this.hero.heroes$;
    search$ = this.hero.searchBs;
    page$ = this.hero.userPage$;
    totalResults$ = this.hero.totalResults$;
    totalPages$ = this.hero.totalPages$;

    constructor(public hero: HeroService) {}

    ngOnInit() {}

    doSearch(event: any) {
        this.hero.searchBs.next(event.target.value);
    }

    movePageBy(moveBy: number) {
        const currenPage = this.hero.pageBs.getValue();
        this.hero.pageBs.next(currenPage + moveBy);
    }
}
