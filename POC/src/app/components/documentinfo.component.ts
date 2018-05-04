import { Component } from '@angular/core';
import { DocumentInfoService } from '../service/posts.service';


@Component({
selector:'documentresponse',
templateUrl:'documentinfo.component.html',
//styleUrls: ['./app.component.css'],
providers:[DocumentInfoService]

})
export class DocumentInfoComponent {
   title = 'app works!';
   posts;

   constructor(private documentInfoService: DocumentInfoService) {
   documentInfoService.getDocumentInfo().subscribe(p=>this.posts = p);
   }
}
