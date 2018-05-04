import { Component } from '@angular/core';
import {BrowserModule, DomSanitizer,SafeResourceUrl} from '@angular/platform-browser'

@Component({
  moduleId: module.id,
  selector: 'pdf',
  templateUrl: 'pdf.component.html',
  //styleUrls: ['./app.component.css']
})
export class PdfComponent {
  pdfSrc = 'https://vadimdez.github.io/ng2-pdf-viewer/pdf-test.pdf';
  page:number = 1;
  pageurl:SafeResourceUrl;

  constructor(private domSanitizer:DomSanitizer) {
  }

  ngOnInit() {
    this.pageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.pdfSrc);
  }
}
