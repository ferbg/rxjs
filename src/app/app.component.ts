import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs';
  subscription : Subscription | null = null;

  ngOnInit() : void {
    //  emit values every 1s
    const intervalCount = interval(1000);
    //  take the first 5 emitted values
    const takeFive = intervalCount.pipe(take(5));
    //  output: 0,1,2,3,4
    this.subscription = takeFive.subscribe(x => console.log(x));
  }

  ngOnDestroy() : void {
    this.subscription?.unsubscribe();
  }
}
