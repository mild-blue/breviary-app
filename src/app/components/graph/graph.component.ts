import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { GraphItemInterface } from '@app/components/graph/graph.interface';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('svg') svg?: ElementRef;
  @Input() items: GraphItemInterface[] = [];
  @Input() color: string = 'primary';
  public path: string = '';

  public sizeX: number = 100;
  public sizeY: number = 100;
  public stroke: number = 2;
  public w: number = 0;
  public h: number = 0;

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
    const dates = this.items.map(i => i.label);
    this.sizeX = Array.from(new Set(dates)).length - 1;
    this.stroke = Math.min(this.sizeY, this.sizeX) / 10;


  }

  ngAfterViewInit() {
    if (this.svg && this.svg.nativeElement) {
      const
        bbox = this.svg.nativeElement.getBBox();
      this.w = bbox.x + bbox.width + bbox.x;
      this.h = bbox.y + bbox.height + bbox.y;
      console.log(bbox);
    }

  }

}
