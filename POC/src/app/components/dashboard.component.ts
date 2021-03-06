import { Component,OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../service/user.service';
import { DocumentInfoService } from '../service/posts.service';
import { AlbumService } from '../service/album.service';
import { TodoService } from '../service/todo.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import {NgbPopoverConfig} from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs/Subject';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { Observable } from 'rxjs/Rx';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {BrowserModule, DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { UploadService } from '../service/upload.service';
import { DocumentService } from '../service/document.service';
import { DocumentStore}  from '../models/documentstore';
//const uploadURL = 'https://localhost:4200/assets/store';

//import {DataTableModule} from "angular2-datatable";
//import {DocumentInfoComponent} from  './components/documentinfo.component';



@Component({
  moduleId: module.id,
  selector: 'dashboard',
  //templateUrl: './app.component.htm',
  //styleUrls: ['./app.component.css']
  templateUrl:`dashboard.component.html`,
  styleUrls:[`dashboard.component.css`],
  providers: [NgbTooltipConfig,NgbPopoverConfig,NgbActiveModal] // add NgbTooltipConfig to the component providers
  //'<h1>Hello {{name}} </h1> <p><strong>Email:</strong>{{email}}</p> <p><strong>Address:</strong>{{address.street}}{{address.city}}{{address.state}}</p>',

})
export class DashBoardComponent implements OnInit {

  images: string[] = [];
  name:string;
  selectedfile=null;
//  @ViewChild('fileInput') el:ElementRef;
  page:number=1;
  pdfSrc:string='';
  url:string='';
 empDataFiles='';
  posts;
  albums;
  todos;
//  dtTrigger: Subject<any> = new Subject();
  title = 'app works!';
  users;
  private fileText;
//  posts;
  //title = 'app';
  file = null;
    successMsg= null;
    errorMsg= null;
    error = null;
    documentStore: any = { documentID: 'documentName', documentType: 'documentPath'  };
  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private documentInfoService: DocumentInfoService,
    private config: NgbTooltipConfig,
  private   configdata: NgbPopoverConfig,
  private  albumService:AlbumService,
  private todoService:TodoService,
//  private rd: Renderer2,
  private http: Http,
//  private el: ElementRef,
  private activeModal: NgbActiveModal,
  private uploadService:UploadService,
  private documentService:DocumentService
    )
    {
    userService.getUsers().subscribe(p=>this.users = p);
    }

  ngOnInit() {

}
  loginAccordion()  : void {
  this.router.navigate(['dashboard']);
  //this.location.back();
}
displayData()  :void {


   this.router.navigate(['dashboard']);
}
getDisplayID(): void {

  //alert(id);
        this.documentInfoService.getDocumentInfo().subscribe(posts => this.posts = posts);
      //  this.dtTrigger.next();
        this.router.navigate(['dashboard']);
    }


    getDisplayName(): void {

      //alert(id);
            this.albumService.getAlbums().subscribe(albums => this.albums = albums);
          //  this.dtTrigger.next();
            this.router.navigate(['dashboard']);
        }

        getTodos(): void {

          //alert(id);
                this.todoService.getTodos().subscribe(todos => this.todos = todos);
              //  this.dtTrigger.next();
                this.router.navigate(['dashboard']);
            }
      onFileSelected(event:any){

      var img: any = document.querySelector('#file');

       //alert('files 1' +img);
         if (typeof (FileReader) !== 'undefined') {

          var reader = new FileReader();

          reader.onload = (event: any) => {
          this.pdfSrc = event.target.result;

          }

          reader.readAsArrayBuffer(event.target.files[0]);

//this.getFiles(img);
          }
          }


          readUrl(event:any) {
            if ((event.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/) )) {
              var img: any = document.querySelector('#file');

            var reader = new FileReader();
            reader.onload = (event:any) => {

                this.url = event.target.result;

              }

              reader.readAsDataURL(event.target.files[0]);
            }
            else{

              var img: any = document.querySelector('#file');


                 if (typeof (FileReader) !== 'undefined') {

                  var reader = new FileReader();

                  reader.onload = (event: any) => {
                  this.pdfSrc = event.target.result;

                  }

                  reader.readAsArrayBuffer(event.target.files[0]);

                    }
            }

this.getFiles(img);

          }



    changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any) : void {
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = function(e){
    //  this.url = inputValue.result;
      // you can perform an action with readed data here
      console.log(myReader.result);
    }

    myReader.readAsText(file);
  }

  fileUpload(event) {
    var reader = new FileReader();
    reader.readAsText(event.target.files[0]);
    var me = this;
    reader.onload = function () {
      me.fileText = reader.result;
    }
  }

addTodo(titleid:string,titlename:string,titletype:string){

var csvData = [
{
title_id: titleid,
title_name: titlename,
title_type: titletype
}];
var options = {
fieldSeparator: ',',
quoteStrings: '"',
decimalseparator: '.',
showLabels: true,
showTitle: true,
headers: ['DocumentID','DocumentName','DocumentType','FileLocation']
};
const file =new Angular2Csv(csvData, 'MyUploadReport',options);


}


getFiles(files: any) {


 var empDataFiles: FileList = files.files;
        this.file = empDataFiles[0];


    }

    postfile() {


            if (this.file !== undefined) {
                this.uploadService.postFormData(this.file).map(responce => {
                }).catch( error =>
                    this.errorMsg = "Failed to Upload File"
                );
                 this.successMsg = "Successfully uploaded !!";

            } else {
                this.errorMsg = "Failed to Upload File";
            }
        }

         save(): void {
        this.documentService.create(this.documentStore);


  }
}
