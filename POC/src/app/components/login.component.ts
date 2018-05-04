import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
//import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    selector:'login',
    templateUrl: 'login.component.html',
  //  styles: [`input.ng-invalid{border-left:5px solid red;}input.ng-valid{border-left:5px solid green;}`]
})

export class LoginComponent implements OnInit {
  //  model: any = {};
    loading = false;
  //  returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
      //  private authenticationService: AuthenticationService,
      //  private alertService: AlertService
      ) { }

    ngOnInit() {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
      //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
  loginFields()  : void {
  this.router.navigate(['dashboard']);
  //this.location.back();
}

    }
