import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class DateServiceProvider {

  years = ['2018','2017','2016','2015','2014','2013','2012','2011','2010'];
  months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  constructor(public http: HttpClient) {
    
  }

  getMonths() {
    return this.months;
  }
  getYears() {
    return this.years;
  }
  getMonthID(month: string) {
    let id = 0;
    let findID = -1;
    this.months.forEach(element => {
      if(month == element) {
        findID = id;
      }
      id++;
    });
    return findID;
  }
  getMonthFromID(id: number) {
    let counter = 0;
    let month = 'error';
    this.months.forEach(element => {
      if(counter == id) {
        month = element;
      }
      counter++;
    });
    return month;
  }

}
