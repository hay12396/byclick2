//
// Not in use yet //
//
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {City, Street } from '../models/personal.interface'

import {Observable, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

// import { cities, streets } from '../models/address'; to be done later

@Injectable()
export class DataService {
  constructor(
    private http: HttpClient
  ) {}

  getCities(): Observable<any> {
    return this.http
    .get('/api/cities')
    .pipe(
      map(data => { return data; }),
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getStreets(): Observable<any> {
    return this.http
      .get('/api/streets')
      .pipe(
        map(data => { return data; }),
        catchError(error => {
          return throwError(error);
        })
      );
  }
}
