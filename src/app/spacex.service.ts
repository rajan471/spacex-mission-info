import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as config } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SpacexService {

  constructor(
    private http: HttpClient
  ) { }

  getMissions(queryStr): any {
    const url = config.spacexapi + queryStr;
    return this.http.get(url);
  }
}
