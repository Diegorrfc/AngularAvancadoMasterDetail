import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Category } from './Category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private aíPath = 'api/categories';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Category[]> {    
    const k = this.http.get(this.aíPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataTocategories)
    );
    this.getui();    
    return k;

  }
  getui(){
    console.log(this.http.get(this.aíPath));
  }
  getById(id: number): Observable<Category> {
    const url = `${this.aíPath}/${id}`;
    return this.http.get(url).pipe
      (catchError(this.handlerError),
        map(this.jsonTocategory));
  }
  private jsonTocategory(jsonData: any): Category {
    const jso = jsonData as Category;
    return jso;
  }
  private jsonDataTocategories(jsonData: any[]): Category[] {
    const categories: Category[] = [];
    jsonData.forEach(element => categories.push(element as Category));
    categories.forEach(element => {
      console.log(element.id)
    });
    return categories;

  }
  create(category: Category): Observable<Category> {
    return this.http.post(this.aíPath, category).pipe(
      catchError(this.handlerError), map(this.jsonTocategory)
    );
  }
  update(category: Category): Observable<Category> {
    const url = `${this.aíPath}/${category.id}`;
    return this.http.put(url, category).pipe(
      catchError(this.handlerError),
      map(() => category));
  }
  delete(id: number): Observable<any> {
    const url = `${this.aíPath}/${id}`;
    return this.http.delete(url).pipe(
      catchError(this.handlerError),
      map(() => null));
  }
  private handlerError(error: any): Observable<any> {
    console.log('error na requisição: ', error);
    return throwError(error);
  }
}

