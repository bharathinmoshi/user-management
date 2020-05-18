import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ApiServiceService} from '../api-service.service';


@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.scss']
})
export class CreateUsersComponent implements OnInit {
  userformGroup :  FormGroup;
  submitted = false;
  rolesArr : Array <any> = [];
  constructor(private router : Router,private _formBuilder: FormBuilder,private http : HttpClient,private apiService : ApiServiceService) {
    this.getAllroles();
   }

  ngOnInit(): void {
    this.userformGroup = this._formBuilder.group({
      user_name: ['', Validators.required],
      role_name:['', Validators.required ],
      user_mobile_no:['', [Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9]{0,10}")]],
      about_me:['',  Validators.required ],
      user_password: ['', Validators.required],
    });
  }
  get f() { return this.userformGroup.controls };


   // FUCTION FOR GET ALL THE ROLES LIST
   getAllroles()
   {
     this.rolesArr = [];
     this.apiService.getAllroles().subscribe((data)=>{
       if(data['status'])
       {
         data['results'].forEach(roleElement => {
           if(roleElement.isActive)
           {
             this.rolesArr.push(roleElement);
           }
         });
       }
     })
   }
 


  // CRAETE USER 
  createUser()
  {
    this.submitted = true;
    if(this.userformGroup.invalid)
    {
      Swal.fire(
        'Details are Missing',
        'Please Check all the fields',
        'error'
      );
    }
    else{
     if(this.userformGroup.valid)
     {
      this.apiService.createUser(this.userformGroup.getRawValue()).subscribe((data)=>{
        if(data['status'])
        {
          Swal.fire(
            'Hooray User-Created Sucessfully',
            'Well Done',
            'success'
          );
          this.router.navigateByUrl('/login')
          this.userformGroup.reset();
        }
        else{
          Swal.fire(
            'Details are Missing',
            'Please Check all the fields',
            'error'
          );
          this.userformGroup.reset();
        }
        })
     } 
    }

  }

}
