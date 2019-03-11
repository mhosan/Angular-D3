import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  encapsulation: ViewEncapsulation.None,  
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const datos = [100, 500, 800, 154, 125, 785];
    const width = 550;
    const height = 400;
    const radius: number = Math.min(width, height) / 2;
    const color: string[] = ['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#ff3333', '#00e600'];

    const svg = d3.select('#torta').append('svg')
      .attr('width', width)
      .attr('height', height)
      .data(datos)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arco = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const label = d3.arc()
      .innerRadius(radius - 80)
      .outerRadius(radius - 80);

    const pie = d3.pie()(datos);

    const arcs = svg.selectAll('arc')
      .data(pie)
      .enter().append('g')
          .attr('class', 'arc');

    arcs.append('path')
      .attr('fill', (d, i) => color[i] )
      .attr('d', <any>arco);

    arcs.append('text')
      .attr('transform', (d) => 'translate(' + label.centroid(<any>d) + ')')
      .attr('font-family', 'Arial')
      .attr('font-size', '18px')
      .attr('fill', 'black')
      .attr('text-anchor', 'middle')
      .text((d, i) => datos[i]);
  }
}
