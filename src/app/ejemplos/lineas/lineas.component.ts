import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-lineas',
  templateUrl: './lineas.component.html',
  styleUrls: ['./lineas.component.css']
})
export class LineasComponent implements OnInit {

  constructor() { }
  ngOnInit() {
    const datos = [
      { 'x': 58.13, 'y': 23.34 },
      { 'x': 18.13, 'y': 83.34 },
      { 'x': 48.13, 'y': 73.34 },
      { 'x': 68.13, 'y': 43.34 },
    ];

    // Establecemos las dimensiones y los márgenes del gráfico
    const margin = { top: 30, right: 20, bottom: 20, left: 20 },
      width = 680 - margin.left - margin.right,
      height = 315 - margin.top - margin.bottom;

    // Establecemos las escalas y sus rangos a lo largo de los ejes x y (año, mes, dia)
    // const x = d3.scaleTime()
    //   .range([0, width])
    //   .domain([new Date(2000, 12, 24), new Date(2019, 12, 24)]);  //x.invert(200) = Date 2012-09-10T22:00:00.000Z,  x.invert(640)= 2017-02-02T22:00:00.000Z
    const x = d3.scaleLinear()
      .domain([0, 1000])
      .range([0.100]);
    const y = d3.scaleLinear()
      .domain([0, 1000])
      .range([0, 100]);

    const ejeX = 

    // Creamos la figura svg
    // const svg = d3.select(".container").append("svg")
    //   .attr("width", width + margin.left + margin.right)
    //   .attr("height", height + margin.top + margin.bottom)
    //   .attr('background-color', 'blue');


    // const g = svg.append("g")
    //   .attr("transform",
    //     "translate(" + margin.left + "," + margin.top + ")");

    // let fecha:string[]=[];
    // let valor:number[]=[];
    // datos.forEach((d,i)=>{
    //   fecha[i]= d.fecha
    //   valor[i]= d.valor
    // });

    // const linea = d3.line();
    // linea.x((d) => { return x(d['x']) });
    // linea.y((d) => { return -y(d['y']) });

    // g.append('path')
    //   .data(datos)
    //   .attr('class', 'line')
    //   .attr('d', <any>linea);

    // const pepe = 'nada';


    // Compilamos un parser para las fechas (por ejemplo: 1-May-12)
    // const parseTime = d3.timeParse("%d-%b-%y");

    // Creamos el eje X, formateando las fechas
    // const xAxis = d3.axisBottom(x)
    //  .tickFormat(d3.timeFormat("%Y-%m-%d"));

    // // Obtenemos los datos
    // // url = "https://gist.githubusercontent.com/d3noob/402dd382a51a4f6eea487f9a35566de0/raw/6369502941b44261f381399a24fb455cb4290be8/data.csv";
    // d3.csv('datos.csv'), (error, data) => {
    //   if (error) throw error;

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

    // // Añadimos y estilizamos la línea
    // svg.append("path")
    //     .data([data])
    //     .attr("class", "line")
    //     .attr("d", this.valueline);

    // // Añadimos los ejes
    // svg.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(xAxis)
    //     .selectAll("text")
    //       .style("text-anchor", "end")
    //       .attr("dx", "-.8em")
    //       .attr("dy", ".15em")
    //       .attr("transform", function(d) {
    //           return "rotate(-40)"
    //           });

    // svg.append("g")
    //     .call(d3.axisLeft(y));
    // });
  }

}
