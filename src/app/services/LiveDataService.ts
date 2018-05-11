import { Injectable } from '@angular/core';
import {HttpClientAPI} from './HttpClient';
import {DataService} from './DataService';
import {API_URI} from './apiUri';

import { find } from 'lodash';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';

@Injectable()
export class LiveDataService extends DataService {

    constructor(public http: HttpClientAPI) {
      super();
    }
    public getMenuData(): Observable<any> {
      return this.http.get(API_URI.menuData);
    }
   
}

