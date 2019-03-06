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
    const alto =500;
    const svg=d3.select('body').append('svg')
      .attr('width', ancho)
      .attr('height', alto);
  }

}
