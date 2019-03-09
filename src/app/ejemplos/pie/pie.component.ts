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
    const datos = [100, 500, 1000, 154, 125, 785];
    const width = 900;
    const height = 600;
    const radius:number = Math.min(width, height)/2;
    const color:string[] = ['#98abc5', '#8a89a6','#7b6888','#6b486b','#ff3333','#00e600'];
    
    const svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .data(datos)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const arco = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);
    
    const label = d3.arc()
      .innerRadius(radius - 40)
      .outerRadius(radius - 40);

    const pie = d3.pie()(datos);

    const arcs = svg.selectAll('arc')
      .data(pie)
      .enter().append('g')
          .attr('class','arc');
    
    arcs.append('path')
      .attr('fill', (d,i)=> { return color[i];} )
      .attr('d', <any>arco);
    
    // arcs.append('text')
    //   .attr('transform', (d)=>{
    //     let c = label.centroid(<any>d); 
    //     console.log(c);
    //     return `translate(${c[0]}, ${c[1]});`
    //   })
    //   .text((d, i)=>{ return datos[i]});
      arcs.append('text')
      .attr('transform', (d)=>{return `translate(${label.centroid(<any>d)});`})
      //.text((d, i)=>{ return datos[i]});
      .text((d, i)=>{ return 'pepe'});
  }
}
