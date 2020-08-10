import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private url: string) { }

  public get<T>(url: string, itemType: any): Observable<T> {
    return this.http.get<T>(this.url).pipe(
        map((data: any) => data.map((item: any) => {
          return new ModelMapper(itemType).map(item);
    })));
 }
}
