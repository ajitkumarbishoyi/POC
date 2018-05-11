import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams, Headers } from "@angular/http";

import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/toPromise';
import { environment } from "../../environments/environment";

import { DocumentStore}  from '../models/documentstore';

@Injectable()
export class DocumentService {

  private customersUrl = "http://127.0.0.1:8080/fileupload/api/document";  // URL to web API
    private headers = new Headers({'Content-Type': 'application/json'});



    constructor(private http: Http) { }


    create(documentstore: DocumentStore): Promise<DocumentStore> {
    alert('DocumentStore'+DocumentStore);
    return this.http
      .post(this.customersUrl, JSON.stringify(documentstore), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as DocumentStore)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
      console.error('Error', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }

}
