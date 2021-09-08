import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs';
  subscription$ : Subscription | null = null;

  ngOnInit() : void {
    const observable$ : Observable<any> = new Observable( (observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });

    this.subscription$ = observable$.subscribe(
      ( value: any)  => console.log(value),
      ( err: any) => {},
      () => console.info( "completed!" )
    );
  }

  ngOnDestroy() : void {
    this.subscription$?.unsubscribe();
  }
}
