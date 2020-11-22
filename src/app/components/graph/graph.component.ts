import { Component, Input, OnInit } from '@angular/core';
import { GraphItemInterface } from '@app/components/graph/graph.interface';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  @Input() items: GraphItemInterface[] = [];
  @Input() color: string = 'primary';
  public path: string = '';

  public sizeX: number = 100;
  public sizeY: number = 100;

  constructor() {
  }

  ngOnInit() {

    for (let i = 0; i < this.items.length; i++) {
      const point = this.items[i];
      console.log(i, point, this.items.length);
      if (i === 0) {
        this.path = `M ${i} ${point.value} `;
      } else {
        this.path += `L ${i} ${point.value} `;
      }
    }
    console.log(this.path);

    this.sizeY = Math.max(...this.items.map(i => i.value));
    this.sizeY = this.items.length;
  }

}
