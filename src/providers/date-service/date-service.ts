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

  differenceTime(time: number) {
    let result: string;

    if(typeof time != 'undefined') {
      let timeElapsed = new Date().getTime() - (Number)(new Date(time));
      //console.log(new Date(time));

      var msecPerMinute = 1000 * 60;
      var msecPerHour = msecPerMinute * 60;
      var msecPerDay = msecPerHour * 24;

      if(timeElapsed < msecPerMinute) {
        result = 'Hace ' + (timeElapsed/1000).toFixed(0) + ' segundos';
      }
      if(timeElapsed > msecPerMinute && timeElapsed < msecPerHour) {
        result = 'Hace ' + (timeElapsed/1000/60).toFixed(0) + ' minutos';
      }
      if(timeElapsed > msecPerHour && timeElapsed < msecPerDay) {
        let value = (timeElapsed/1000/60/60).toFixed(0);
        if(value == '1'){
          result = 'Hace ' + value + ' hora';
        }
        else {
          result = 'Hace ' + value + ' horas';
        }
      }
      if(timeElapsed > msecPerDay) {
        let value = (timeElapsed/1000/60/60/24).toFixed(0);
        if(value == '1') {
          result = 'Hace ' + value + ' día';  
        }
        else {
          result = 'Hace ' + value + ' días';
        }
      }
    } 
    else {
      result = 'Hace 0 segundos';
    }
    return result;
  }

}
