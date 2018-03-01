import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable().subscribe(numero => console.log('Subs ', numero),
      error => console.error(error),
      () => console.log('Observador termina'));
  }

  ngOnInit() {
    this.subscription.unsubscribe();
  }

  ngOnDestroy() {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.

  }

  regresaObservable() {
    return new Observable(observer => {
      let contador = 0;
      const intervalo = setInterval(() => {
        contador += 1;
        observer.next(contador);
      }, 500);
    });
  }

}
