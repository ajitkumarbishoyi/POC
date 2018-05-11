import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { DashBoardComponent } from './components/dashboard.component';
import { NgbdAccordionBasic } from './components/accordion.component';
import { UserComponent } from './components/user.component';
import { UserService } from './service/user.service';
import { DocumentInfoService } from './service/posts.service';
import { HttpModule } from '@angular/http';
import { DocumentInfoComponent } from './components/documentinfo.component';
import { DataTablesModule } from 'angular-datatables';
import {routing} from './app.routing';
import { AlbumService } from './service/album.service';
import { TodoService } from './service/todo.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfComponent } from './components/pdf.component';
import { ImageViewerModule } from 'ng2-image-viewer';
import { ImageViewerComponent } from './components/image-viewer.component';
import { UploadService } from './service/upload.service';
import { DocumentService } from './service/document.service';
//import { FileUpload } from 'ng2-fileupload';
//import { FileUpload } from 'ng2-fileupload';
@NgModule({
  declarations: [
    AppComponent,LoginComponent,DashBoardComponent,NgbdAccordionBasic,UserComponent,DocumentInfoComponent,PdfComponent,ImageViewerComponent
  ],
  imports: [
    BrowserModule,FormsModule,HttpModule,ReactiveFormsModule,routing,DataTablesModule,PdfViewerModule,ImageViewerModule,NgbModule.forRoot()
  ],
  providers: [UserService,DocumentInfoService,AlbumService,TodoService,UploadService,DocumentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
