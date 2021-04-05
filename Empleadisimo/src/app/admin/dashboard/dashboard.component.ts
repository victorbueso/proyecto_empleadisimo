import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
//import { donutChartOptions } from './graphics/donutChartOptions';
//import { areaChartOptions } from './graphics/areaChartOptions';
//import { barChartOptions } from './graphics/barChartOptions';
//import { polarChartOptions } from './graphics/polarChartOptions';
import { UsuariosService } from '../../services/usuarios.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  admin: number = 0;
  comp: number = 0;
  empl: number = 0;
  dataPie: Array<any> = [];
  data0: any = {}
  data1: any = {}
  data2: any = {}
  array0: Array<any> = [];
  array1: Array<any> = [];
  array2: Array<any> = [];
  dataEmpl: Array<any> = [];
  dataComp: Array<any> = [];
  dataFP: Array<any> = [];
  dataFV: Array<any> = [];

  constructor(private usuariosService: UsuariosService, private publicacionesService: PublicacionesService ) { }

  getBrightRandomColor(): string {
    var num=(Math.floor(Math.random()*4)*4).toString(16);
    var letters = ['0','F',num];
    var color = '#';

    for (var i = 0; i < 3; i++ ) {
        let valor = Math.floor(Math.random() * letters.length);
        color += letters[valor];
        letters.splice(valor, 1);
    }
    console.log(color);
    return color;
  }

  getRandomColor(): string {
    var letter = "0123456789ABCDEF";
    var color = "#";

    for (var i=0; i<6; i++)
        color += letter[Math.floor(Math.random()*16)];
    return color;
  }
  //Gráfica de pastel para la cantidad de usuarios disponibles en el sistema
  highchartsPie: typeof Highcharts = Highcharts;
  donutChart: Highcharts.Options = {
    chart: {
      type: 'pie',
      plotShadow: false,
    },
    credits: {
      enabled: false
    },
    subtitle : {
      text: "Registro de usuarios en el sistema",
      style: {
        position: 'absolute',
        right: '0px',
        bottom: '10px'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 60,
        borderColor: '',
        slicedOffset: 20,
        dataLabels: {
          connectorWidth: 0
        }
      }
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'Hola Mundo'
    },
    legend: {
      enabled: false
    },
    series: [
      {
        name: 'usuarios',
        type: 'pie',
        data: [this.data2, this.data1, this.data0
          //{name: 'admin', y: Number(this.array2.slice(0,1)), color: this.getRandomColor()},
          //{name: 'companies', y: Number(this.array1.slice(0, 1)), color: this.getRandomColor()},
          //{name: 'employees', y: Number(this.array0.slice(0, 1)), color: this.getRandomColor()},
        ]
        //data: [this.array2, this.array1, this.array0]
        //data: ['admin', this.array]
          //this.array
          //['firefox', 40], ['chrome', 30], ['safari', 30],
          //{name: 'admin', y: this.admin, color: '#a72893'},
          //{name: 'c', y: 5, color: '#cf7d91'},
      },
    ]
  };

  highchartsArea: typeof Highcharts = Highcharts;
  //Gráfico de área para la cantidad de usuarios registrados por mes
  areaChart: Highcharts.Options = {
    chart: {
       type: 'area'
    },
    title: {
       text: 'Registro de usuarios en el sistema'
    },
    subtitle : {
       text: "Registro de usuarios en el sistema",
       style: {
          position: 'absolute',
          right: '0px',
          bottom: '10px'
       }
    },
    legend : {
       layout: 'vertical',
       align: 'left',
       verticalAlign: 'top',
       x: -150,
       y: 100,
       floating: true,
       borderWidth: 1,
    },
    xAxis:{
       categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis : {
       title: {
          text: 'Cantidad de usuarios'
       },
       min:0
    },
    plotOptions : {
       area: {
          fillOpacity: 0.5
       },
      series: {
        marker: {
          enabled: false,
        }
      }
    },
    credits:{
       enabled: false
    },
    series: [
       {
          name: 'John',
          type: 'area',
          color: this.getRandomColor(),
          data: this.dataEmpl
          //data: [2030, 4343, 4043, 2100, 4032, 5000, 1029, 900, 6100, 502, 2883, 2999]
       },
       {
          name: 'Jane',
          type: 'area',
          color: this.getRandomColor(),
          data: this.dataComp
          //data: [1, 3, 4, 15, 8, 5, 4, 6, 13, 9, 4, 7]
       }
    ]
 };

  highchartsBar: typeof Highcharts = Highcharts;
  //Gráfica de pastel para la cantidad de usuarios disponibles en el sistema
  barChart: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Cantidad de publicaciones realizadas por mes'
    },
    xAxis: {
      lineColor: '#fff',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    yAxis: {
      visible: false
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      series: {
        borderRadius: 5,
      } as any
    },
    series: [
      {
        type: 'bar',
        color: this.getRandomColor(),
        data: this.dataFP
          /*
          {y: this.dataFP[0], color: '#fa61b8'},
          {y: this.dataFP[1], color: '#fa61b8'},
          {y: this.dataFP[2], color: '#fa61b8'},*/
      }
    ]
  }

  ngOnInit() {
    //Cantidad de Admins, Companies y Empleados en el Sistema, los 3 para la gráfica de pastel
    this.usuariosService.getAdmins()
      .subscribe((res: Chart[]) => {
        this.admin = res.length;
        //console.log(this.admin);
        this.array2.push('Admins', this.admin, this.getRandomColor());
        //console.log(this.graficaPrueba);
        //this.graficaPrueba.series?.push({type: 'pie', data: this.array});
        //this.graficaPrueba.series?[0]['data'] = [res.length];
        //this.graficaPrueba.series?[0]['data'].push(res.length);
        //this.chartOptions.series[0]['data'] = res;
        for (let i in this.array2) {
          //this.data2.push(this.array2[i]);
          this.data2['name'] = this.array2[0];
          this.data2['y'] = this.array2[1];
          this.data2['color'] = this.array2[2];
        }

        Highcharts.chart("pie", this.donutChart);
      }
    );
    this.usuariosService.getCompanies()
      .subscribe((res: Chart[]) => {
        this.comp = res.length;
        this.array1.push('Companies', this.comp, this.getRandomColor());
        for (let i in this.array1) {
          //this.data1.push(this.array1[i]);
          this.data1['name'] = this.array1[0];
          this.data1['y'] = this.array1[1];
          this.data1['color'] = this.array1[2];
        }
        Highcharts.chart("pie", this.donutChart);
      }
    );
    this.usuariosService.getEmployees()
      .subscribe((res: Chart[]) => {
        this.empl = res.length;
        this.array0.push('Employees', this.empl, this.getRandomColor());
        for (let i in this.array0) {
          //this.data0.push(this.array0[i]);
          this.data0['name'] = this.array0[0];
          this.data0['y'] = this.array0[1];
          this.data0['color'] = this.array0[2];
        }
        Highcharts.chart("pie", this.donutChart);
      }
    );

    //Cantidad de empleados registrados por cada mes para gráfica de área
    this.usuariosService.getEmployees()
      .subscribe((res: any) => {
        const empl = res;
        this.array0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array0) {
          for (let j in empl) {
            if (empl[j].fechaRegistro) {
              let mes = new Date(empl[j].fechaRegistro);
              let mesActual = mes.getMonth();

              if (mesActual == Number(i)) {
                this.array0[i] += 1;
              }
              //this.areaChart.series?[0]['data'] = [res.length];
              //this.areaChart.series?[0]['data'].push(this.array0);
            }
          }
        }
        //this.dataEmpl = [...this.array0];
        //this.dataEmpl = this.array0.slice();
        //this.dataEmpl = this.dataEmpl.concat(this.array0);
        //this.dataEmpl = [].concat(this.array0);
        for (let i in this.array0) {
          this.dataComp.push(this.array0[i]);
        }

        Highcharts.chart("area", this.areaChart);
      }
    );

    //Cantidad de compañías registrados por cada mes para gráfica de área
    this.usuariosService.getCompanies()
      .subscribe((res: any) => {
        const comp = res;
        this.array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array1) {
          for (let j in comp) {
            if (comp[j].fechaRegistro) {
              let mes = new Date(comp[j].fechaRegistro);
              let mesActual = mes.getMonth();

              if (mesActual == Number(i)) {
                this.array1[i] += 1;
              }
            }
          }
        }
        for (let i in this.array1) {
          this.dataEmpl.push(this.array1[i]);
        }

        Highcharts.chart("area", this.areaChart);
      }
    );

    //Cantidad de publicaciones realizadas en el sistema por cada mes: fp reutiliza array1
    this.publicacionesService.getPosts()
      .subscribe((res: any) => {
        const fp = res;
        this.array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array1) {
          for (let j in fp) {
            if (fp[j].fechaPublicacion) {
              let mes = new Date(fp[j].fechaPublicacion);
              let mesActual = mes.getMonth();

              if (mesActual == Number(i)) {
                this.array1[i] += 1;
              }
            }
          }
        }
        for (let k in this.array1) {
          this.dataFP.push(this.array1[k]);
        }

        Highcharts.chart("bar", this.barChart);
      })
  }

  //donutChart = new Chart(this.graficaPrueba);
  //areaChart = new Chart(areaChartOptions);
  //barChart = new Chart(barChartOptions);
  //polarChart = new Chart(polarChartOptions);

  inicio() {
    this.ngOnInit();
  }
}
