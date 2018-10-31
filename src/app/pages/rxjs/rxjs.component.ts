import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  constructor() {
    this.subscription = this.regresaObservable().subscribe(
      // los tres tipos de callback de un observable:
      numero => console.log('subs: ', numero), // cuando recibimos información del next
      error => console.error('Error', error), // cuando ocurre un error
      () => console.log('El observador terminó') // cuando termina el observable
      );
    }

    ngOnInit() {
    }
    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }

    regresaObservable(): Observable<any> {
      return new Observable( (observer: Subscriber<any>) => {
        let contador = 0;
        const intervalo = setInterval( () => {
          contador += 1;
          const salida = {
            valor: contador
          };
          observer.next(salida);
          if ( salida.valor === 3 ) {
            clearInterval( intervalo );
            observer.complete();
          }
      }, 1000);
    }).pipe(
      map(  response => response.valor),
      filter( (valor, index) => {
        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }
}
