import { Injectable } from '@angular/core';

@Injectable()
export class DataService {

  dataSummary = [

    ];
  personalData: {
    'headLine': string
    'lines': [
      { 'name': string, 'content': string },
      { 'name': 'ת.ז', 'content': string },
      { 'name': 'קופ"ח', 'content': string },
      { 'name': 'תאריך לידה', 'content': string }
    ]
  };

  constructor() {}


}
