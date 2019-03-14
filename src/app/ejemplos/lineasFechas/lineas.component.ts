import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { IDatos } from '../lineasFechas/IDatos';
import { curveBundle, curveBasis, curveBasisClosed, curveLinearClosed, curveLinear, bisect } from 'd3';
import { getLocaleDateFormat } from '@angular/common';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasFechasComponent implements OnInit {
  constructor() { }
  ngOnInit() {
    // Establecemos las dimensiones y los márgenes del gráfico
    const margin = { top: 20, right: 70, bottom: 40, left: 50 },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    const datosMinima: IDatos[] = [                           // OJO que en javascript los meses se cuentan desde 0!!!
      { 'fecha': new Date(2019, 2 - 1, 1), 'valor': 60.00 },
      { 'fecha': new Date(2019, 2 - 1, 2), 'valor': 60.00 },
      { 'fecha': new Date(2019, 3 - 1, 1), 'valor': 65.00 },
      { 'fecha': new Date(2019, 4 - 1, 1), 'valor': 70.13 },
      { 'fecha': new Date(2019, 4 - 1, 23), 'valor': 68.13 }
    ];
    const datosMaxima: IDatos[] = [                           // OJO que en javascript los meses se cuentan desde 0!!!
      { 'fecha': new Date(2019, 2 - 1, 1), 'valor': 105.00 },
      { 'fecha': new Date(2019, 2 - 1, 2), 'valor': 105.00 },
      { 'fecha': new Date(2019, 3 - 1, 1), 'valor': 100.00 },
      { 'fecha': new Date(2019, 4 - 1, 1), 'valor': 124.13 },
      { 'fecha': new Date(2019, 4 - 1, 23), 'valor': 120.13 }
    ];

    //definir la escala y el eje X --------------------------------------------------------------------------
    const xScale = d3.scaleTime()
      .domain([new Date(2019, 0, 20), new Date(2019, 4 - 1, 30)])
      .range([0, width]);
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d3.timeFormat("%d-%m-%Y"));
    //definir la escala y el eje X --------------------------------------------------------------------------

    //definir la escala y el eje Y --------------------------------------------------------------------------
    //const maxY = (d3.max(datosMaxima, d => d.valor + 40));
    const maxY = 250;
    //const minY = d3.min(datosMinima, d => d.valor);
    const minY = 20;
    const yScale = d3.scaleLinear()
      .domain([maxY, minY])
      .range([0, height]);
    const yAxis = d3.axisLeft(yScale)
      .ticks(10);
    //definir la escala y el eje Y --------------------------------------------------------------------------


    const svg = d3.select('#lineas').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom);
    const g = svg.append('g');

    // Añadimos los ejes
    //eje X <------------------------------------------------------------------
    g.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.4em')
      .attr('dy', '0em')
      .attr('transform', function (d) {
        return 'rotate(-30)';
      });


    //eje Y <------------------------------------------------------------------
    g.append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .call(yAxis);

    
    const formatoFechaLocal = d3.timeFormat("%d-%m-%Y")
    const formatAnio = d3.timeFormat('%Y');
    const formatMes = d3.timeFormat('%b');
    const formatDia = d3.timeFormat('%a');
    const formatFecha = d3.timeFormat('%x');

    let tooltip = d3.select('#lineas')
      .append('div')
      .style('position', 'absolute')
      .style('z-index', '9999999')
      .style('visibility', 'hidden')
      .style('background', '#e0e0eb')
      .style('padding', '8px')
      .style('border-radius', '5px')
      //.style('border', '2px solid #73AD21')
      .text('Un tooltip simple');


    //<-------------------------------------------------------linea minima-------------------------
    const lineaMinima = d3.line<IDatos>()
      .x((d) => xScale(d.fecha) + margin.left)
      .y((d) => yScale(d.valor) + margin.top);
    svg.append('path')
      .data(datosMinima)
      .attr('d', lineaMinima(datosMinima))
      .attr('stroke', '#2eb82e')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
    //<-------------------------------------------------------linea minima-------------------------


    //<-------------------------------------------------------linea maxima-------------------------
    const lineaMaxima = d3.line<IDatos>()
      .x((d) => xScale(d.fecha) + margin.left)
      .y((d) => yScale(d.valor) + margin.top);
    svg.append('path')
      .data(datosMaxima)
      .attr('d', lineaMaxima(datosMaxima))
      .attr('stroke', '#2eb82e')
      .attr('stroke-width', 1)
      .attr('fill', 'none')
    //<-------------------------------------------------------linea maxima-------------------------


    //<-------------------------------------------------------circulos minima----------------------
    const circleMinima = svg.append('g')
      .attr('id', 'circulosMinima')
      .selectAll('circles')
      .data(datosMinima)
      .enter()
      .append('circle');

    circleMinima
      .attr('cx', d => xScale(d.fecha) + margin.left)
      .attr('cy', d => yScale(d.valor) + margin.top)
      .attr('style', 'fill:#1e7b1e')
      .attr('r', 4)
      .on('mouseover', (d, i, n) => {
        d3.select(n[i])
          .attr('r', () => { return 6 })
          .attr('style', 'fill:red')
        tooltip.text('Fecha: ' + <any>formatoFechaLocal(d.fecha) + ", Valor: " + <any>d.valor)
        return tooltip.style('visibility', 'visible')
      })
      .on('mousemove', () => {
        return tooltip
          .style('top', (d3.event.pageY - 200) + 'px')
          .style('left', (d3.event.pageX - 100) + 'px');
      })
      .on('mouseout', (d, i, n) => {
        d3.select(n[i])
          .attr('r', 4)
          .attr('style', 'fill:#1e7b1e')
        tooltip
          .style('visibility', 'hidden')
      });
    //<-------------------------------------------------------circulos minima----------------------

    //<-------------------------------------------------------circulos maxima----------------------
    const circleMaxima = svg.append('g')
      .attr('id', 'circulosMaxima')
      .selectAll('circles')
      .data(datosMaxima)
      .enter()
      .append('circle');
    circleMaxima
      .attr('cx', d => xScale(d.fecha) + margin.left)
      .attr('cy', d => yScale(d.valor) + margin.top)
      .attr('style', 'fill:#1e7b1e')
      .attr('r', 4)
      .on('mouseover', (d, i, n) => {
        d3.select(n[i])
          .attr('r', () => { return 6 })
          .attr('style', 'fill:red')
        tooltip.text('Fecha: ' + <any>formatoFechaLocal(d.fecha) + ", Valor: " + <any>d.valor)
        return tooltip.style('visibility', 'visible')
      })
      .on('mousemove', () => {
        return tooltip
          .style('top', (d3.event.pageY - 200) + 'px')
          .style('left', (d3.event.pageX - 100) + 'px');
      })
      .on('mouseout', (d, i, n) => {
        d3.select(n[i])
          .attr('r', 4)
          .attr('style', 'fill:#1e7b1e')
        tooltip
          .style('visibility', 'hidden')
      });
    //<-------------------------------------------------------circulos maxima----------------------
  }
}