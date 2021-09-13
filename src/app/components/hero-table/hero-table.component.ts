import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Hero, HeroService } from '../../services/hero.service';

@Component({
    selector: 'rx-hero-table',
    templateUrl: './hero-table.component.html',
    styleUrls: ['./hero-table.component.scss'],
})
export class HeroTableComponent implements OnInit {
    vm$ = combineLatest([
        this.hero.heroes$,
        this.hero.searchBs,
        this.hero.userPage$,
        this.hero.limitBs,
        this.hero.totalResults$,
        this.hero.totalPages$,
    ]).pipe(
        map(([heroes, search, page, limit, totalResults, totalPages]) => {
            return {
                heroes,
                search,
                page,
                limit,
                totalResults,
                totalPages,
                disableNext: totalPages === page,
                disablePrev: page === 1,
            };
        }),
    );

    constructor(public hero: HeroService) {}

    ngOnInit() {}

    doSearch(event: any) {
        this.hero.searchBs.next(event.target.value);
        this.hero.pageBs.next(0);
    }

    movePageBy(moveBy: number) {
        const currenPage = this.hero.pageBs.getValue();
        this.hero.pageBs.next(currenPage + moveBy);
    }

    setLimit(limit: number) {
        this.hero.limitBs.next(limit);
        this.hero.pageBs.next(0);
    }
}
