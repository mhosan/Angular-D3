import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {

  constructor() { }

  ngOnInit() {

      const height = 200;
      const barWidth = 10;
      const barOffset = 50;
      const radio = 5; // pixeles
      const data = [
        { size: 5, point: [20, 14] },
        { size: 5, point: [144, 20]},
        { size: 5, point: [340, 45]},
        { size: 10, point: [230, 76]},
        { size: 5, point: [150, 200]},
        { size: 5, point: [240, 45]},
        { size: 10, point: [130, 76]},
        { size: 5, point: [350, 200]},
        { size: 10, point: [415, 280]},
        { size: 30, point: [150, 400]},
        { size: 30, point: [234, 76]},
        { size: 30, point: [344, 12]},
        { size: 20, point: [112, 76]},
        { size: 20, point: [256, 12]},
        { size: 30, point: [300, 150]}
      ];

      /* el lienzo ..................................................................... */
      const svgWidth = 900;
      const svgHeight = 600;
      const svg = d3.select('#svg')
        .append('svg')
        .attr('width', svgWidth)
        .attr('height', svgHeight);
      /* el lienzo ..................................................................... */

      /* la escala en Y ................................................................ */
      const maxY = d3.max(data, d => d.point[1]);
      const minY = d3.min(data, d => d.point[1]);
      const maxRadius = d3.max(data, d => d.size);
      const scaleY = d3.scaleLinear()
        .domain([minY, maxY])
        // .range([0, svgHeight]);
        // .range([(radio * 2), svgHeight - radio - 5]);
        .range([maxRadius, svgHeight - maxRadius]);
      /* la escala en Y ................................................................ */

      /* la escala en X ................................................................ */
      const maxX = d3.max(data, d => d.point[0]);
      const minX = d3.min(data, d => d.point[0]);
      const scaleX = d3.scaleLinear()
        .domain([minX, maxX])
        // .range([0, svgWidth]);
        .range([maxRadius, svgWidth - maxRadius]);
      /* la escala en X ................................................................ */

      /* los ejes....................................................................... */
      const axisX = d3.axisTop(scaleX);
      const axisY = d3.axisRight(scaleY).ticks(4);
      /* los ejes....................................................................... */

      /* el circulete................................................................... */
      const circle = svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle');
      circle
        .attr('cx', d => scaleX(d.point[0]))
        .attr('cy', d => scaleY(d.point[1]))
        .attr('style', (d) => {
          if (d.size > 5) {
            return 'fill: blue;';
          }
          return 'fill: red;';
        })
        .attr('r', d => d.size)
        .on('mouseover', (d, i, n) => {
          d3.select(n[i])
            .attr('r', () => d.size + 30);
        })
        .on('mouseout', (d, i, n) => {
          d3.select(n[i])
            .attr('r', d.size);
        });

      /* el circulete................................................................... */

      /* Los ejes. Guarda con el objeto "g": es un minilienzo (un grupo)................ */
      svg.append('g')
        .attr('class', 'axis')
        .attr('transform', `translate(0, ${svgHeight - 1})`)
        .call(axisX);

      svg.append('g')
        .attr('class', 'axis')
        .call(axisY);
      /* Los ejes. Guarda con el objeto "g": es un minilienzo (un grupo)............... */

  }
}
