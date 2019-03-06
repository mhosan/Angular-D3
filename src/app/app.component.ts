import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'd3prueba';
  ngOnInit() {
    const height = 200;
    const barWidth = 10;
    const barOffset = 50;
    const radio = 5; //pixeles  
    const data = [[20, 14], [144, 20], [340, 45], [230, 76], [150, 200], [415, 280]];
    const svgWidth = 900;
    const svgHeight = 600;
    const svg = d3.select('#svg')
      .append('svg')
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const maxX = d3.max(data, d => d[0]);
    const minX = d3.min(data, d => d[0]);
    const scaleX = d3.scaleLinear()
      .domain([minX, maxX])
      //.range([0, svgWidth]);
      .range([radio, svgWidth - radio]);

    const maxY = d3.max(data, d => d[1]);
    const minY = d3.min(data, d => d[1]);
    const scaleY = d3.scaleLinear()
      .domain([minY, maxY])
      //.range([0, svgHeight]);
      .range([radio, svgHeight - radio - 5]);

    const axisX = d3.axisTop(scaleX);
    const axisY = d3.axisRight(scaleY).ticks(4);

    const circle = svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle');
    circle
      .attr('cx', d => scaleX(d[0]))
      .attr('cy', d => scaleY(d[1]))
      .attr('r', radio);

    const rectangulo = svg. selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    rectangulo
      .style('fill', '#3c663d')
      .attr('width', barWidth)
      .attr('height', data => {
        return svgHeight - data[1];
      })
      .attr('x', (data, i) => {
        //return i * (barWidth + barOffset);
        return data[0] - (barWidth / 2);
      })
      .attr('y', (data) => {
        return svgHeight - data[1];
      });

    // tslint:disable-next-line:no-unused-expression
    svg.append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${svgHeight - 1})`)
      .call(axisX);

    svg.append('g')
      .attr('class', 'axis')
      .call(axisY);
  }
  // ngOnInit() {
  //   const height = 200;
  //   const barWidth = 40;
  //   const barOffset = 20;
  //   const data = [12, 41, 34, 45, 67];
  //   const svgHeight = 400;
  //   const svgWidth = 400;
  //   const rect = d3.select('#svg').append('svg')
  //     .attr('width', svgWidth)
  //     .attr('height', svgHeight)
  //     .selectAll('rect')
  //     .data(data)
  //     .enter()
  //     .append('rect')
  //     .style('fill', '#3c763d')
  //     .attr('width', barWidth)
  //     // tslint:disable-next-line:no-shadowed-variable
  //     .attr('height', function(data) {
  //         return data;
  //       })
  //     // tslint:disable-next-line:no-shadowed-variable
  //     .attr('x', function(data, i) {
  //         return i * (barWidth + barOffset);
  //       })
  //     // tslint:disable-next-line:no-shadowed-variable
  //     .attr('y', function(data) {
  //         return height - data;
  //       });
  //   }
}
