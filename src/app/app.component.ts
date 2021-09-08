import { Component } from '@angular/core';
import { from, Subscription } from 'rxjs';
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
    //emit (1,2,3,4,5)
    const source = from([1, 2, 3, 4, 5]);
    //add 10 to each value
    const example = source.pipe(map( ( val :number )  => val + 10));
    //output: 11,12,13,14,15
    const subscribe = example.subscribe(( val :number ) => console.log(val));
  }

  ngOnDestroy() : void {
    this.subscription?.unsubscribe();
  }
}
