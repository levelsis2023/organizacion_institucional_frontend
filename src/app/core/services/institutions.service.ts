import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstitutionsService {

  constructor(
    private http: HttpClient
  ) { }

  public index(
    term: string = '',
    sort: string = 'id',
    direction: string = 'asc',
    page: number = 0,
    limit: number = 10,
    status: string = '',
    role: string = ''
  ): Observable<any> {
    const params = new HttpParams()
      .set('term', term)
      .set('sort', sort)
      .set('direction', direction)
      .set('page', page.toString())
      .set('pag_mostrar', limit.toString())
      .set('status', status)
      .set('role', role);

    return this.http.get<any>('api/institutions', { params });
  }


  public store(data: any) {
    return this.http.post<any>('api/institutions', data);
  }

  public show(id: number) {
   return this.http.get<any>('api/institutions/' + id);
  }

  public update(id: number, data: any) {
    return this.http.put<any>('api/institutions/' + id, data);
  }

  public destroy(id: number) {
    return this.http.delete<any>('api/institutions/' + id);
  }

  public subinstitutions(id: number) {
    return this.http.get<any>('api/institutions/' + id + '/subinstitutions');
  }

}