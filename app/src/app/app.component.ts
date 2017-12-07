import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  features;

  width;
  height;
  centered;
  color;
  projection;
  path;
  svg;
  g;
  mapLayer;

  nameFn(d) {
    return d && d.properties ? d.properties.NOMBRE_DPT : null;
  }

  nameLength(d) {
    const n = this.nameFn(d);
    return n ? n.length : 0;
  }

  fillFn(d) {
    // return this.color(this.nameLength(d));
  }

  clicked(d) {
    let x, y, k;
    // Compute centroid of the selected path
    if (d && this.centered !== d) {
      const centroid = this.path.centroid(d);
      x = centroid[0];
      y = centroid[1];
      k = 4;
      this.centered = d;
    } else {
      x = this.width / 2;
      y = this.height / 2;
      k = 1;
      this.centered = null;
    }

    // Highlight the clicked province
    this.mapLayer
      .selectAll('path')
      .style('fill', (d) => {
        return this.centered && d === this.centered ? '#D5708B' : this.fillFn(d);
      });

    // Zoom
    this.g
      .transition()
      .duration(750)
      .attr('transform', 'translate(' + this.width / 2 + ',' + this.height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
  }

  mouseover(d) {
    // Highlight hovered province
    d3.select(d3.event.currentTarget).style('fill', 'orange');

    // Draw effects
    // textArt(nameFn(d));
  }

  mouseout(d) {
    // Reset province color
    this.mapLayer.selectAll('path')
      .style('fill', (d) => this.centered && d === this.centered ? '#D5708B' : this.fillFn(d) );

    // Remove effect text
    /* this.effectLayer.selectAll('text').transition()
      .style('opacity', 0)
      .remove(); */

    // Clear province name
    // bigText.text('');
  }

  ngOnInit() {

    this.width = 960;
    this.height = 500;

    this.color = d3.scaleLinear<string>()
      .domain([1, 20])
      .clamp(true)
      .range(['#FFFFFF', '#409A99']);

    this.projection = d3.geoMercator()
      .scale(1500)
      // Center the Map in Colombia
      .center([-74, 4.5])
      .translate([this.width / 2, this.height / 2]);

    this.path = d3.geoPath()
      .projection(this.projection);

    this.svg = d3.select('svg')
      .attr('width', this.width)
      .attr('height', this.height);

    this.svg.append('rect')
      .attr('class', 'background')
      .attr('width', this.width)
      .attr('height', this.height)
      .on('click', this.clicked);

    this.g = this.svg.append('g');

    this.mapLayer = this.g.append('g')
      .classed('map-layer', true);

    d3.json('https://gist.githubusercontent.com/john-guerra/43c7656821069d00dcbc/raw/be6a6e239cd5b5b803c6e7c2ec405b793a9064dd/Colombia.geo.json', (error, data: any) => {
      this.features = data.features;

      // this.color.domain([0, d3.max(this.features, this.nameLength)]);

      this.mapLayer.selectAll('path')
          .data(this.features)
        .enter().append('path')
          .attr('d', this.path)
          .attr('vector-effect', 'non-scaling-stroke')
          .style('fill', this.fillFn)
          .on('mouseover', this.mouseover)
          .on('mouseout', this.mouseout)
          .on('click', this.clicked);

    });
  }

}
