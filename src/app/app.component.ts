import { Component } from '@angular/core';
import { from, Subscription } from 'rxjs';
import { filter, take } from 'rxjs/operators';

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
    //filter out non-even numbers
    const example = source.pipe(filter( ( val :number )  => val % 2 === 0 ));
    //output: 2,4
    this.subscription = example.subscribe(( val :number ) => console.log(val));
  }

  ngOnDestroy() : void {
    this.subscription?.unsubscribe();
  }
}
