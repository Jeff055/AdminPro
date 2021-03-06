import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition  } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  titulo: string;
  constructor(private router: Router, private _title: Title, private _meta: Meta) {

    this.getDataRoute()
    .subscribe(event => {
      console.log(event);
      this.titulo = event.titulo;
      this._title.setTitle(event.titulo);
      const metaTag: MetaDefinition = {
        name: 'description',
        content: this.titulo
      };

      this._meta.updateTag(metaTag);
    });

   }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map( (evento: ActivationEnd) => evento.snapshot.data )
    );
  }
}
