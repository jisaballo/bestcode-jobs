import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogsFirebase, Log } from '../../models/log';

export interface LogExt extends Log {

}
/*
  Generated class for the LogsServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LogsServiceProvider {

  logs: LogExt[];

  constructor(public http: HttpClient, private logsService: LogsFirebase) {
    console.log('Hello LogsServiceProvider Provider');
    this.logs = [];
  }

  loadLogs(userID) {
    this.logsService.loadLogs(userID).subscribe(res => {
      this.logs = [];
      if(typeof res != 'undefined') {
        if(typeof res['logs'] != 'undefined') {
          res['logs'].map(element => {
            let log = element as LogExt;

            this.logs.push(log);
          })
        }
        else {
          this.logsService.updateLogs([]);
        }
      }
      else {
        this.logsService.createDocument();
      }
    });
  }

  addLog(logText: string, logType: string) {
    let new_log: LogExt;

    new_log = {
      timestanp: new Date().getTime(),
      type: logType,
      text: logText
    }

    this.logs.push(new_log);
    this.logsService.updateLogs(this.logs);
  }

  addToAuth(logText: string, logType: string) {
    let new_log: LogExt;

    new_log = {
      timestanp: new Date().getTime(),
      type: logType,
      text: logText
    }

    this.logsService.addToAuth(new_log);
  }

}
