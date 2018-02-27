import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  // Doughnut
  @Input() public chartLabels: string[] = [];
  @Input() public chartData: number[] = [];
  @Input() public chartType = '';

  constructor() { }

  ngOnInit() {
  }

}
