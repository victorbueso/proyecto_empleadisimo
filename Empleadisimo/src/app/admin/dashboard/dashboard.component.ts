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
  dataFE: Array<any> = [];
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
      //text: "Cantidad de usuarios en el sistema",
      style: {
        position: 'relative',
        left: '0px',
        top: '10px'
      }
    },
    plotOptions: {
      pie: {
        innerSize: '99%',
        borderWidth: 70,
        borderColor: '',
        slicedOffset: 40,
        dataLabels: {
          connectorWidth: 0
        }
      }
    },
    title: {
      verticalAlign: 'middle',
      floating: true,
      text: 'No. de Usuarios'
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
       categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    yAxis : {
       title: {
          text: 'No. de usuarios registrados'
       },
       allowDecimals: false
    },
    plotOptions : {
       area: {
          fillOpacity: 0.5,
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
          name: 'Employees',
          type: 'area',
          color: this.getRandomColor(),
          data: this.dataEmpl
          //data: [2030, 4343, 4043, 2100, 4032, 5000, 1029, 900, 6100, 502, 2883, 2999]
       },
       {
          name: 'Companies',
          type: 'area',
          color: this.getRandomColor(),
          data: this.dataComp
          //data: [1, 3, 4, 15, 8, 5, 4, 6, 13, 9, 4, 7]
       }
    ]
 };

  highchartsBar: typeof Highcharts = Highcharts;
  //Gráfica de barra para la cantidad de publicaciones realizadas en el sistema
  barChart: Highcharts.Options = {
    chart: {
      type: 'bar',
    },
    credits: {
      enabled: false
    },
    title: {
      text: 'Publicaciones realizadas (por mes)'
    },
    xAxis: {
      lineColor: '#fff',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ],
    },
    yAxis: {
      visible: true,
      title: {
        text: 'No. de publicaciones realizadas'
      },
      allowDecimals: false
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
        name: 'Publicaciones realizadas',
        type: 'bar',
        color: this.getRandomColor(),
        data: this.dataFP
          /*
          {y: this.dataFP[0], color: '#fa61b8'},
          {y: this.dataFP[1], color: '#fa61b8'},
          {y: this.dataFP[2], color: '#fa61b8'},*/
      }
    ]
  };

  highchartsColumn: typeof Highcharts = Highcharts;
  //Gráfica de columna para la cantidad de publicaciones eliminadas y vencidad en el sistema
  columnChart: Highcharts.Options = {
    chart: {
       type: 'column'
    },
    title: {
       text: 'Publicaciones eliminadas y vencidas (por mes)'
    },
    credits: {
      enabled: false
    },
    xAxis:{
       categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul', 'Aug','Sep','Oct','Nov','Dec'],
       crosshair: true
    },
    yAxis : {
       min: 0,
       title: {
          text: 'No. de publicaciones'
       },
       allowDecimals: false
    },
    plotOptions : {
       column: {
          pointPadding: 0.1,
          borderWidth: 0
       },
       series: {
        borderRadius: 5,
        innerWidth: '50%'
      } as any
    },

    series: [
      {
        name: 'Eliminadas',
        color: this.getRandomColor(),
        type: 'column',
        data: this.dataFE
        //data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
      },
      {
        name: 'Vencidas',
        color: this.getRandomColor(),
        type: 'column',
        data: this.dataFV
        //data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]
      },
    ]
  };

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

    //Cantidad de publicaciones realizadas, eliminadas y vencidas en el sistema por cada mes: fpev reutiliza array0, array1 y array2
    this.publicacionesService.getPosts()
      .subscribe((res: any) => {
        const fpev = res;
        this.array2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.array0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array2) {
          for (let j in fpev) {
            let fechaP = new Date(fpev[j].fechaPublicacion);
            let fechaV = new Date(fpev[j].fechaVencimiento);
            let mesActualP = fechaP.getMonth();
            let mesActualV = fechaV.getMonth();
            if (fpev[j].fechaPublicacion) {
              if (mesActualP == Number(i)) {
                this.array2[i] += 1;
              }
            }
            if (fpev[j].fechaVencimiento) {
              if ((mesActualV == Number(i)) && (fechaV.getTime() < Date.now())) {
                this.array1[i] += 1;
              }
            }
            if (fpev[j].estado == "eliminado" && (mesActualP == Number(i))) {
              this.array0[i] += 1;
            }
          }
        }
        for (let k in this.array2) {
          this.dataFP.push(this.array2[k]);
          this.dataFE.push(this.array0[k]);
          this.dataFV.push(this.array1[k]);
        }

        Highcharts.chart("bar", this.barChart);
        Highcharts.chart("column", this.columnChart);
      }
    );

    //Cantidad de publicaciones eliminadas y vencidas en el sistema por cada mes: fev reutiliza array0 y array1
    /*this.publicacionesService.getPosts()
      .subscribe((res: any) => {
        const fev = res;
        this.array0 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        this.array1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (let i in this.array1) {
          for (let j in fev) {
            let fecha = new Date(fev[j].fechaVencimiento);
            let mesActual = fecha.getMonth();
            if (fev[j].fechaVencimiento) {
              if (mesActual == Number(i) && fecha.getTime() < Date.now()) {
                this.array1[i] += 1;
              }
            }

            if (fev[j].estado == "eliminado" && (mesActual == Number(i))) {
              this.array0[i] += 1;
            }
          }
        }
        for (let k in this.array0) {
          this.dataFE.push(this.array0[k]);
          this.dataFV.push(this.array1[k]);
        }
        Highcharts.chart("column", this.columnChart);
      }
    );*/
  }

  //donutChart = new Chart(this.graficaPrueba);
  //areaChart = new Chart(areaChartOptions);
  //barChart = new Chart(barChartOptions);
  //polarChart = new Chart(polarChartOptions);

  inicio() {
    this.ngOnInit();
  }
}
