import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError, flatMap } from 'rxjs/operators';
import { Collaborator } from './collaborator.model';

@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {
  private aíPath = 'api/collaborators';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Collaborator[]> {
    const k = this.http.get(this.aíPath).pipe(
      catchError(this.handlerError),
      map(this.jsonDataToCollaborator)
    );
    this.getui();
    return k;

  }
  getui() {
    console.log(this.http.get(this.aíPath));
  }
  getById(id: string): Observable<Collaborator> {  
    console.log("diego ID")
    console.log(id) 
    const url = `${this.aíPath}/${id}`;
    return this.http.get(url).pipe
      (catchError(this.handlerError),
        map(this.jsonToCollaborator));
  }
  private jsonToCollaborator(jsonData: any): Collaborator {
    console.log("json")
    console.log(jsonData)
    const jso = jsonData as Collaborator;
    return jso;
  }
  private jsonDataToCollaborator(jsonData: any[]): Collaborator[] {
    const collaborator: Collaborator[] = [];
    jsonData.forEach(element => collaborator.push(element as Collaborator));
    collaborator.forEach(element => {
      console.log(element.id);
    });
    return collaborator;

  }
  create(collaborator: Collaborator): Observable<Collaborator> {
    console.log(collaborator)       
    return this.http.post(this.aíPath, collaborator).pipe(
      catchError(this.handlerError), map(this.jsonToCollaborator)
    );
  }
  update(collaborator: Collaborator): Observable<Collaborator> {
    
    const url = `${this.aíPath}/${collaborator.id}`;
    return this.http.put(url, collaborator).pipe(
      catchError(this.handlerError),
      map(() => collaborator));
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

