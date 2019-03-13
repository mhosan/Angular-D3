import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { IDatos } from '../lineasFechas/IDatos';
import { curveBundle, curveBasis, curveBasisClosed, curveLinearClosed, curveLinear } from 'd3';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasFechasComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    // Establecemos las dimensiones y los márgenes del gráfico
    const margin = { top: 30, right: 20, bottom: 40, left: 40 },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const datosMinima: IDatos[] = [
      { 'fecha': new Date(2019, 2, 1), 'valor': 50.00 },
      { 'fecha': new Date(2019, 3, 1), 'valor': 20.00 },
      { 'fecha': new Date(2019, 4, 1), 'valor': 48.13 },
      { 'fecha': new Date(2019, 4, 23), 'valor': 68.13 }
    ];

    const xScale = d3.scaleTime()
      .domain([new Date(2018, 12, 31), new Date(2019, 4, 30)])
      .range([0, width]);
    const xAxis = d3.axisBottom(xScale);
      //.tickFormat(d3.timeFormat("%d-%m-%Y"));

    const maxY = d3.max(datosMinima, d => d.valor);
    const minY = d3.min(datosMinima, d => d.valor);
    const yScale = d3.scaleLinear()
      .domain([maxY, minY])
      .range([0, height]);
    const yAxis = d3.axisLeft(yScale);

    // // Creamos la figura svg
    // const svg = d3.select('#lineas').append('svg')
    //   .attr('width', width + margin.left + margin.right)
    //   .attr('height', height + margin.top + margin.bottom);
    // const g = svg.append('g')
    //   .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    // Creamos la figura svg
    const svg = d3.select('#lineas').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g')
      //.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Añadimos los ejes
    g.append('g')
      .attr('transform', 'translate(' +(margin.left + 100) + ',' + (height + 0) + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.4em')
      .attr('dy', '0em')
      .attr('transform', function (d) {
        return 'rotate(-30)';
      });
    g.append('g')
      .attr('transform', 'translate(' + 120 + ',' + 0 + ')')
      .call(yAxis);


    const linea = d3.line<IDatos>()
      .x((d) => xScale(d.fecha) - margin.left)
      .y((d) => yScale(d.valor) + margin.top);

    svg.append('path')
      .attr('d', linea(datosMinima))
      .attr('stroke', 'green')
      .attr('stroke-width', 3)
      .attr('fill', 'none');
      // .on('mouseover', (d, i, n) => {
      //   d3.select(n[i])
      //     .transition()
      //     .duration(0)
      //     .attr('stroke-width', 10);
      // })
      // .on('mouseout', (d, i, n) => {
      //   d3.select(n[i])
      //     .transition()
      //     .duration(600)
      //     //.ease(d3.easeElasticOut) 
      //     .attr('stroke-width', 3);
      // });

    const circle = svg.selectAll('circle')
      .data(datosMinima)
      .enter()
      .append('circle');
    circle
      .attr('cx', d => xScale(d.fecha)- margin.left)
      .attr('cy', d => yScale(d.valor)+ margin.top)
      .attr('style', 'fill:blue')
      // .attr('style', (d) => {
      //   if (d.size > 5) {
      //     return 'fill: blue;';
      //   }
      //   return 'fill: red;';
      // })
      .attr('r', 5)
      .on('mouseover', (d, i, n) => {
        d3.select(n[i])
          .attr('r', () => { return 15 })
          .attr('style', 'fill:red');
        })
      .on('mouseout', (d, i, n) => {
        d3.select(n[i])
          .attr('r', 5)
          .attr('style', 'fill:blue');
      });

  }
}