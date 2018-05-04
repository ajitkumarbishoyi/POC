import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Todo}  from '../models/todo';

@Injectable()
export class TodoService {
   constructor(private http: Http) {
   }

   getTodos(): Observable<Todo[]> {
    return this.http.get("https://jsonplaceholder.typicode.com/todos")
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

}
