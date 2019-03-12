import { Component, OnInit, Input } from '@angular/core';
import * as d3 from 'd3';
import { IDatos } from '../lineas/datos'
import { curveBundle, curveBasis, curveBasisClosed, curveLinearClosed, curveLinear } from 'd3';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {
  @Input() private data: Array<any>;
  constructor() { }
  ngOnInit() {
    // Establecemos las dimensiones y los márgenes del gráfico
    const margin = { top: 30, right: 20, bottom: 20, left: 20 },
      width = 600 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // const datos = [
    //   { 'fecha': new Date (2012, 3, 12), 'valor': 58.13 },
    //   { 'fecha': new Date (2012, 4, 12), 'valor': 18.13 },
    //   { 'fecha': new Date (2012, 4, 27), 'valor': 48.13 },
    //   { 'fecha': new Date (2012, 5, 23), 'valor': 68.13 }
    // ];
    // const datos = [
    //   { 'fecha': '2012-3-12', 'valor': 58.13 },
    //   { 'fecha': '2012-4-12', 'valor': 18.13 },
    //   { 'fecha': '2012-4-27', 'valor': 48.13 },
    //   { 'fecha': '2012-5-23', 'valor': 68.13 }
    // ];
    // const datos = [
    //   { 'fecha': 50, 'valor': 58.13 },
    //   { 'fecha': 45, 'valor': 60.13 },
    //   { 'fecha': 56, 'valor': 48.13 },
    //   { 'fecha': 76, 'valor': 68.13 }
    // ];
    const datos = [
      { 'fecha': 20, 'valor': 30 },
      { 'fecha': 20, 'valor': 50 },
      { 'fecha': 30, 'valor': 30 },
      { 'fecha': 45, 'valor': 45 },
      { 'fecha': 50, 'valor': 23 },
      { 'fecha': 70, 'valor': 30 }
    ];
    // const xScale = d3.scaleTime()
    //   .domain([new Date(2011, 12, 31), new Date(2012, 12, 31)])
    //   .range([0, width]);
    const maxX = d3.max(datos, d => d.fecha);
    const minX = d3.min(datos, d => d.fecha);
    const xScale = d3.scaleLinear()
      .domain([minX-2, maxX]) 
      .range([0, width]);
    const maxY = d3.max(datos, d => d.valor);
    const minY = d3.min(datos, d => d.valor);
    const yScale = d3.scaleLinear()
      .domain([minY-5, maxY + 2])
      .range([0, height]);
    //Creamos el eje X, formateando las fechas
    //const xAxis = d3.axisBottom(xScale)
    //  .tickFormat(d3.timeFormat("%d-%m-%Y"));
    const xAxis = d3.axisTop(xScale);
    const yAxis = d3.axisRight(yScale).ticks(6);
    // Creamos la figura svg
    const svg = d3.select("#container").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .data(datos);
    const g = svg.append("g")
      .attr("transform","translate(" + margin.left + "," + margin.top + ")");

    // Parser para las fechas (por ejemplo: 1-May-12)
    const parseTime = d3.timeParse("%d-%b-%y");
    
    // Añadimos los ejes
    g.append("g")
        .attr('transform','translate(' + 2 + ',' + (height) + ')')
        .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".12em")
          .attr("transform", function(d) {
              return "rotate(-50)"
              });

    g.append("g")
      .attr('transform','translate(' + -5 + ',' + 0 + ')')
      //.call(d3.axisLeft(yScale)
      .call(yAxis)
    //);

    const linea = d3.line<IDatos>()
      .x((d:IDatos)=> { return xScale(d.fecha)})
      .y((d:IDatos)=> { return yScale(d.valor)})
      .curve(curveLinear)                         //tipo de curva:  curveLinear: lineal abierta
                                                  //                curveLinearClosed: lineal cerrada
                                                  //                curveBasis y curveBasisClosed: Un spline-b con puntos de control duplicados en el final
    //console.log(linea);
    // Añadimos y estilizamos la línea
    g.append("path")
      .attr("d", linea(datos))
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('fill', 'none');

    // Establecemos las escalas y sus rangos a lo largo de los ejes x y (año, mes, dia)
    // const x = d3.scaleTime()
    //   .range([0, width])
    //   .domain([new Date(2000, 12, 24), new Date(2019, 12, 24)]);  //x.invert(200) = Date 2012-09-10T22:00:00.000Z,  x.invert(640)= 2017-02-02T22:00:00.000Z

    // const linea = d3.line();
    // linea.x((d) => { return x(d['x']) });
    // linea.y((d) => { return -y(d['y']) });

    // g.append('path')
    //   .data(datos)
    //   .attr('class', 'line')
    //   .attr('d', <any>linea);

    // const pepe = 'nada';

    //   // Los formateamos
    //   data.forEach(function(d) {
    //     console.log(d);
    //       d.date = parseTime(d.date);
    //       d.close = +d.close;
    //   });

    //   // Escalamos el rango de los datos
    //   //x.domain(d3.extent(data, (d) => { return d; }));
    //   //y.domain([0, d3.max(data, (d) =>{ return d.close; })]);

    //   // Creamos una línea que más tarde cargaremos en el path
    // const valueline = d3.line(data)
    //   .x(function(date) { return x(date.fecha); })
    //   .y(function(date) { return y(d.close); });

    
  }

}
