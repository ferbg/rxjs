import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchString : string = "";
  searchSubject$: Subject<string> = new Subject<string>();
  results$ : any;

  constructor(private http: HttpClient) {

  }

  ngOnInit() : void {
    this.results$ = this.searchSubject$.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap( searchString => this.queryAPI(searchString) )
    );
  }

  queryAPI( searchString: string ){
    console.log('calling reddit...', searchString);
    return this.http.get(`https://www.reddit.com/r/aww/search.json?q=${searchString}`).pipe(
      tap( (result: any) => console.log('...results:', result) ),
      map( (result: any) => result.data.children.filter( (item: any) => item.data.thumbnail !== 'default' && item.data.thumbnail !== 'self')),
      tap( (result: any) => console.log('results after map (&filter)', result) ),
    );
  }

  inputChanged($event: any) {
    console.info( "$event: ", $event );
    this.searchSubject$.next($event);
  }

  ngOnDestroy() : void {
  }
}
