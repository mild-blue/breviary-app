import { Component, Input, OnInit } from '@angular/core';
import { GraphItemInterface } from '@app/components/graph/graph.interface';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() items: GraphItemInterface[] = [];
  public path: string = '';

  constructor() {
  }

  ngOnInit() {
  }

}
