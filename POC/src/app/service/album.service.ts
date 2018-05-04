import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Album}  from '../models/album';

@Injectable()
export class AlbumService {
   constructor(private http: Http) {
   }

   getAlbums(): Observable<Album[]> {
    return this.http.get("https://jsonplaceholder.typicode.com/albums")
         .map((res: Response) => res.json())
         .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
   }

}
