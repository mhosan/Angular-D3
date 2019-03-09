import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-basico-con-plantilla',
  templateUrl: './basico-con-plantilla.component.html',
  styleUrls: ['./basico-con-plantilla.component.css']
})
export class BasicoConPlantillaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const ancho = 960;
    const alto = 500;
    const margen = 50;
    const dist_barras = 2;
    const datos = [100, 500, 1000, 154, 125, 785];

    const svg = d3.select('body').append('svg')
      .attr('width', ancho)
      .attr('height', alto)
      .append('g')
      .attr('transform', `translate(${margen}, ${alto - margen})`);

    const escalaY = d3.scaleLinear()
      .domain([0, d3.max(datos)])
      .range([0, alto - 2 * margen]);

    svg.selectAll('rect')
      .data(datos)
      .enter().append('rect')
      .attr('x', (d, i) => {
        return i * ((ancho - 2 * margen) / datos.length);
      })				                                                              // X calculamos el ancho automático en función
      .attr('y', (d) => {
        return -escalaY(d);
      })				                                                               // Calculamos la aplicandole la escala e invirtiendola
      .attr('width', ((ancho - 2 * margen) / datos.length) - dist_barras)
      .attr('height', (d) => {
        return escalaY(d);                                                     // Calculamos la altura aplicandole la escala
      })
      .attr('fill', 'blue')                                                   // Los pintamos de azul
      .on('mouseover', (d, i, n) => {
        d3.select(n[i])
        .transition()
        .duration(0)
        .ease(d3.easeCubic)
        .attr('fill', () => {
          return `hsl(${Math.random() * 360}, 100%, 40%)`;
        });
      })
      .on('mouseout', (d, i, n) => {
        d3.select(n[i])
        .transition()
        .duration(500)
        .ease(d3.easeLinear)
        .attr('fill', 'blue');                                                   //
      });

      // Añadir Texto a las barras
      // Posicionadolo similarmente a las barras
      svg.selectAll('text')
        .data(datos)
        .enter().append('text')
        .text((d) => {
          return d;
        })
        .attr('text-anchor', 'middle')
        .attr('x', (d, i) => {
          return i * (( ancho - 2 * margen ) / datos.length) + (( ancho - 2 * margen ) / datos.length) / 2;
        })
        .attr('y', (d) => {
          return -escalaY(d) + 14;
        })
        .attr('font-family', 'sans-serif')
        .attr('font-size', '11px')
        .attr('fill', 'white')
        .on('mouseover', (d, i, n) => {
          d3.select(n[i])
          .attr('font-size', '50px')
          .attr('fill', 'red')
          .attr('font-family', 'Arial Black');
        })
        .on('mouseout', (d, i, n) => {
          d3.select(n[i])
          .attr('font-size', '11px')
          .attr('fill', 'white')
          .attr('font-family', 'sans-serif');
        });
  }
}
