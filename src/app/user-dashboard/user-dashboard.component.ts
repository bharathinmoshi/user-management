import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators, FormControl,FormGroupDirective} from '@angular/forms';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {ApiServiceService} from '../api-service.service';
import * as jwt_decode from "jwt-decode";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  usersArray : Array <any> = [];
  userToken :any;
  user_id : any;
  constructor(private http : HttpClient, private router : Router,private _formBuilder: FormBuilder,private apiService : ApiServiceService) {
    this.getallUsers();
   }

  ngOnInit(): void {
  }

  getallUsers()
  {
    this.userToken = localStorage.getItem('token') ;
    this.user_id = jwt_decode(this.userToken);
    this.usersArray = [];
    this.apiService.getallUser().subscribe((data)=>{
      if(data['status'])
      {
        data['results'].forEach(users => {
          if(users._id == this.user_id._id)
          {
            this.usersArray.push(users)
          }
        })
      }
    })
  }

  logout()
  {
    this.router.navigateByUrl("/login");
    localStorage.clear();
  }
}
