import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ApiServiceService} from '../api-service.service'


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  userLoginformGroup : FormGroup;
  submitted = false;
  constructor(private http : HttpClient, private router : Router,private _formBuilder: FormBuilder,private apiService : ApiServiceService) { }

  ngOnInit(): void {
    this.userLoginformGroup = this._formBuilder.group({
      user_mobile_no:['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]{0,10}")]],
      user_password: ['', Validators.required],
    });
  }
  get f() { return this.userLoginformGroup.controls };

  login()
  {
   this.submitted = true;
   if(this.userLoginformGroup.valid)
   {
     this.apiService.loginUser(this.userLoginformGroup.getRawValue()).subscribe((data)=>{
       if(data['status'])
       {
         localStorage.setItem("token",data['data'])
         Swal.fire(
          'WELCOME TO USER DASHBOARD',
          'CONTINUE YOUR ACTIVITY',
          'success'
        );
        this.router.navigateByUrl('/user-dashboard')
    this.userLoginformGroup.reset();
       }
     })
   }
   else{
    Swal.fire(
      'Please Fill the Appropriate Detials',
      'Check With Correct Credentials',
      'error'
    );
    this.userLoginformGroup.reset();
   }
  }
}
