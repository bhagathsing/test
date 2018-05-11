import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class HttpClientAPI {
  constructor(private http: HttpClient) {}

  public uri = 'http://10.562.71.12:9222/';
  public  staticUri = '/assets/data/';

  public get( url: string, params?: {}, map?: any ): Observable<any> {
    return this.http.get( this.getUrl(url, params))
      .map( map ? map : this.map)
      .catch( this.handleError);
  }
  public post( url: string, params?: {}, map?: any ): Observable<any> {
    return this.http.post( this.getUrl(url), params)
      .map( map ? map : this.map)
      .catch( this.handleError);
  }
  public put( url: string, params: {}, map ): Observable<any> {
    return this.http.put( this.getUrl(url), params)
      .map( map ? map : this.map)
      .catch( this.handleError);
  }
  public delete( url: string, params: {}, map ): Observable<any> {
    return this.http.delete( this.getUrl(url, params))
      .map( map ? map : this.map)
      .catch( this.handleError);
  }
  private getUrl(url: string, params?: {}): any {
    let requestParams = '';
    if (params) {
      if (Object.keys(params).length !== 0) {
        Object.keys(params).forEach(key => {
          requestParams += key + '=' + params[key] + '&';
        });
      }
    }
    if ( url.indexOf('.json') > -1) {
      return this.staticUri + url;
    }
    if (requestParams) {
      return this.uri +  url + '?' + requestParams;
    }else {
      return this.uri +  url;
    }
  }

  private handleError(error: Response | any) {
    let msg: string;
    if (error instanceof Response) {
      msg = `${error.status} - ${error.statusText || ''} ${error || error.statusText || 'Unknown error.'}`;
    } else {
      msg = error.message ? error.message : error.toString();
    }
    return Observable.throw( msg );
  }
  private map( res  ) {
    return  res;
  }
}
