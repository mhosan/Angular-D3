import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const datos = [1, 5, 10];
    const width = 900;
    const height = 600;
    const radius:number = Math.min(width, height)/2;
    const color:string[] = ['#98abc5', '#8a89a6','#7b6888','#6b486b','#ff3333','#00e600'];
    
    var arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);

  var labelArc = d3.arc()
      .outerRadius(radius - 50)
      .innerRadius(radius - 50);

  var pie = d3.pie()
      .sort(null)
      .value((d)=> { return <any>d; });

    const svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .data(datos)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

      var g = svg.selectAll(".arc")
      .data(pie(datos))
    .enter().append("g")
      .attr("class", "arc");  
    
    g.append('path')
      .attr('fill', (d,i)=> { return color[i];} )
      .attr('d', <any>arc);
    
    g.append('text')
      .attr('transform', (d, i)=> { 
          return `translate(${labelArc.centroid(<any>d)});`})
      .text((d, i)=>{ console.log(datos[i]); return datos[i]});
  }
}
