import {ModuleWithProviders} from '@angular/core';
import {Routes,RouterModule} from '@angular/router';


import {LoginComponent} from './components/login.component';
import {DashBoardComponent} from './components/dashboard.component';
import {NgbdAccordionBasic} from './components/accordion.component';
import {UserComponent} from './components/user.component';
import {DocumentInfoComponent} from './components/documentinfo.component';
import {PdfComponent} from './components/pdf.component';
import {ImageViewerComponent} from './components/image-viewer.component';
//import {UserComponent} from './components/service/user.component';

const appRoutes : Routes=[
  {
    path:'login',
    component:LoginComponent
},
{
  path:'dashboard',
 component:DashBoardComponent
},{
  path:'accordion',
  component:NgbdAccordionBasic
},
{
  path:'userresponse',
  component:UserComponent
},

{
  path:'postresponse/:id',
  component:DocumentInfoComponent
},
{
  path:'pdf',
  component:PdfComponent
},
{
  path:'app-image-viewer',
  component:ImageViewerComponent
}


];

export const routing :ModuleWithProviders = RouterModule.forRoot(appRoutes);
