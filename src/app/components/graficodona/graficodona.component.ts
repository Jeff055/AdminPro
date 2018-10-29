import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-graficodona',
  templateUrl: './graficodona.component.html',
  styleUrls: []
})
export class GraficodonaComponent implements OnInit {
 // Doughnut
 @Input() public ChartLabels: string[] = [];
 @Input() public ChartData: number[] = [];
 @Input() public ChartType: string = 'doughnut';

  constructor() { }

  ngOnInit() {
  }

}
