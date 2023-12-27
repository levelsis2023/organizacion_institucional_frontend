import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
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
    institutionId: string = ''
  ): Observable<any> {
    const params = new HttpParams()
      .set('term', term)
      .set('sort', sort)
      .set('direction', direction)
      .set('page', page.toString())
      .set('pag_mostrar', limit.toString())
      .set('status', status)
      .set('institution_id', institutionId);

    return this.http.get<any>('api/areas', { params });
  }


  public store(data: any) {
    return this.http.post<any>('api/areas', data);
  }

  public show(id: number) {
   return this.http.get<any>('api/areas/' + id);
  }

  public update(id: number, data: any) {
    return this.http.put<any>('api/areas/' + id, data);
  }

  public destroy(id: number) {
    return this.http.delete<any>('api/areas/' + id);
  }

}