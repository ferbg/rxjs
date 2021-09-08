import { Component } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  searchString : string = "";
  searchSubject$: Subject<string> = new Subject<string>();
  subscription$: Subscription | null = null;

  ngOnInit() : void {
    this.subscription$ = this.searchSubject$.pipe(debounceTime(1000)).subscribe( x => console.log('buscando... ', x))
  }

  inputChanged($event: any) {
    console.info( "entrada teclado: ", $event );
    this.searchSubject$.next($event);
  }

  ngOnDestroy() : void {
    this.subscription$?.unsubscribe();
  }
}
