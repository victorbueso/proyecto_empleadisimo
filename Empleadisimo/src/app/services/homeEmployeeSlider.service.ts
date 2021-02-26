import { Injectable } from "@angular/core";
import { HomeComponent } from '../employee/home/home.component';

export interface SliderEmployeesData {
  title: string,
  img: string,
  description: string
}

@Injectable()
export class HomeEmployeeSliderService {
  constructor() {}

  carousel: SliderEmployeesData[] = [
    {
      title: 'Employee1',
      img: './assets/img/employees/employee1.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    },
    {
      title: 'Employee2',
      img: './assets/img/employees/employee2.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    },
    {
      title: 'Employee3',
      img: './assets/img/employees/employee3.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    },
    {
      title: 'Employee4',
      img: './assets/img/employees/employee4.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    },
    {
      title: 'Employee5',
      img: './assets/img/employees/employee5.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    },
    {
      title: 'Employee6',
      img: './assets/img/employees/employee6.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    },
    {
      title: 'Employee7',
      img: './assets/img/employees/employee7.jpg',
      description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolores, reprehenderit.'
    }
  ];
}
