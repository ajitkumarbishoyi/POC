import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Posts}  from '../models/posts';
//import {DocumentInfoComponent} from './components/documentinfo.component';

@Injectable()
export class DocumentInfoService {
   constructor(private http: Http) {
   }

   getDocumentInfo(): Observable<Posts[]> {
     alert('call servicde layer');
     //const url='https://jsonplaceholder.typicode.com/users'+
      return this.http.get("https://jsonplaceholder.typicode.com/users")
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }
}
