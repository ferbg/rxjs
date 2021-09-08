import { Component } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';

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
    //add 10 to each value and take the first 2
    const example = source.pipe(map( ( val :number )  => val + 10), take(2));
    //output: 11,12
    this.subscription = example.subscribe(( val :number ) => console.log(val));
  }

  ngOnDestroy() : void {
    this.subscription?.unsubscribe();
  }
}
