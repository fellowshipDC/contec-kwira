import { Component, OnInit } from '@angular/core';
import * as dbox from '@dboxjs/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {

  data = [
    {
      'value': 6,
      'inegi': 1,
      'Entidad': 'Aguascalientes'
    },
    {
      'value': 17,
      'inegi': 2,
      'Entidad': 'Baja California'
    },
    {
      'value': 6,
      'inegi': 3,
      'Entidad': 'Baja California Sur'
    },
    {
      'value': 11,
      'inegi': 4,
      'Entidad': 'Campeche'
    },
    {
      'value': 23,
      'inegi': 5,
      'Entidad': 'Coahuila'
    },
    {
      'value': 2,
      'inegi': 6,
      'Entidad': 'Colima'
    },
    {
      'value': 94,
      'inegi': 7,
      'Entidad': 'Chiapas'
    },
    {
      'value': 50,
      'inegi': 8,
      'Entidad': 'Chihuahua'
    },
    {
      'value': 77,
      'inegi': 9,
      'Entidad': 'Distrito Federal'
    },
    {
      'value': 14,
      'inegi': 10,
      'Entidad': 'Durango'
    },
    {
      'value': 58,
      'inegi': 11,
      'Entidad': 'Guanajuato'
    },
    {
      'value': 77,
      'inegi': 12,
      'Entidad': 'Guerrero'
    },
    {
      'value': 31,
      'inegi': 13,
      'Entidad': 'Hidalgo'
    },
    {
      'value': 50,
      'inegi': 14,
      'Entidad': 'Jalisco'
    },
    {
      'value': 192,
      'inegi': 15,
      'Entidad': 'México'
    },
    {
      'value': 39,
      'inegi': 16,
      'Entidad': 'Michoacán'
    },
    {
      'value': 25,
      'inegi': 17,
      'Entidad': 'Morelos'
    },
    {
      'value': 16,
      'inegi': 18,
      'Entidad': 'Nayarit'
    },
    {
      'value': 22,
      'inegi': 19,
      'Entidad': 'Nuevo León'
    },
    {
      'value': 80,
      'inegi': 20,
      'Entidad': 'Oaxaca'
    },
    {
      'value': 88,
      'inegi': 21,
      'Entidad': 'Puebla'
    },
    {
      'value': 19,
      'inegi': 22,
      'Entidad': 'Querétaro'
    },
    {
      'value': 12,
      'inegi': 23,
      'Entidad': 'Quintana Roo'
    },
    {
      'value': 42,
      'inegi': 24,
      'Entidad': 'San Luis Potosí'
    },
    {
      'value': 19,
      'inegi': 25,
      'Entidad': 'Sinaloa'
    },
    {
      'value': 23,
      'inegi': 26,
      'Entidad': 'Sonora'
    },
    {
      'value': 15,
      'inegi': 27,
      'Entidad': 'Tabasco'
    },
    {
      'value': 23,
      'inegi': 28,
      'Entidad': 'Tamaulipas'
    },
    {
      'value': 19,
      'inegi': 29,
      'Entidad': 'Tlaxcala'
    },
    {
      'value': 113,
      'inegi': 30,
      'Entidad': 'Veracruz'
    },
    {
      'value': 29,
      'inegi': 31,
      'Entidad': 'Yucatán'
    },
    {
      'value': 16,
      'inegi': 32,
      'Entidad': 'Zacatecas'
    },
    {
      'value': 1309,
      'inegi': 99,
      'Entidad': 'Nacional'
    }
  ];

  config = {
    'size': {
      'width': 650,
      'height': 600,
      'margin': { top: 0, right: 0, bottom: 0, left: 0 },
      'translateX': 70,
      'translateY': 300,
      'scale': 0.9
    },
    'xAxis': {
      'enabled' : false
    },
    'yAxis': {
      'enabled' : false
    },
    'onclick': (d, i) => {
      console.log('Map Clicked on ', d, i);
    },
    'map': {
      'quantiles': {
        'buckets': 5,
        'colors': ['#f7c7c5', '#e65158', '#c20216', '#750000', '#480000'],
        'ignoreZeros' : false
      },
      'topojson': {
        'url': './assets/topojson/states.json',
        'objects': 'states',
        'translate': [2580, 700],
        'scale': 1300,
        'parser': (d) => {
          d.id = +d.properties.state_code;
          return d.id;
        },
        'id': (d) => {
          return 'states-' + d.id;
        }
      }
    },
    tip: (d) => d.properties.state_name
  };

  constructor() {}

  ngOnInit() {

    dbox
      .chart(this.config)
        .bindTo('#map')
        .data({'raw': this.data})
      .layer(dbox.map)
        .id('inegi')
        .z('2002')
      .end()
        .draw();

  }

}
