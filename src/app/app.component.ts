import { Component } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs';
  subscription : Subscription | null = null;

  ngOnInit() : void {
    const source = fromEvent(document, 'click');
    //map to string with given event timestamp
    const example$ = source.pipe(map(( event : Event ) => `Event time: ${event.timeStamp}`));
    //output (example): 'Event time: 7276.390000000001'
    this.subscription = example$.subscribe(val => console.log(val));
  }

  ngOnDestroy() : void {
    this.subscription?.unsubscribe();
  }
}
