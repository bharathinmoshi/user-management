import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormGroup, FormControl,FormBuilder,Validators , FormGroupDirective ,FormsModule  } from '@angular/forms';
import {ApiServiceService} from '../api-service.service';
import * as $ from 'jquery';
import Swal from 'sweetalert2';
import {Router} from '@angular/router'


@Component({
  selector: 'app-create-roles',
  templateUrl: './create-roles.component.html',
  styleUrls: ['./create-roles.component.scss']
})
export class CreateRolesComponent implements OnInit {
  rolesForm : FormGroup;
  rolesArr : Array <any> = [];
  submitted = false;
  editRolename : any;
  editId : any;
  constructor(private formBuilder: FormBuilder,private router : Router,private http : HttpClient,private apiService : ApiServiceService) {
    this.rolesForm = this.formBuilder.group({
      role_name: ['', Validators.required],
  });
  this.getAllroles();
  this.alertforSignup();
   }
   get f() { return this.rolesForm.controls; }
  ngOnInit(): void {
  }

  alertforSignup()
  {
    Swal.fire(
      'PLEASE CRAETE A ROLES THEN CLICK ON CREATE USER',
      'CHECK FOR CURD OPERATIONS OF ROLES',
      'warning'
    );  
  }
  
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
            console.log(this.rolesArr)
          }
        });
      }
    })
  }


  // FUCTION FOR POST THE ROLES
  onSubmit()
  {
    this.submitted = true;
    if (this.rolesForm.invalid) {
      return;
  }
  else{ 
   this.apiService.addRoles(this.rolesForm.getRawValue()).subscribe((data)=>{
    if(data['status'])
    {
      this.rolesForm.reset();
      this.getAllroles();
    }
   })
  }
  }


  // FUCTION FOR MODAL POPUP
  editroles(id,rolename)
  {
    this.editId = id;
    this.editRolename = rolename;
  }

  // FUNCTION FOR UPDATE THE ROLES
  updateRole()
  {
   let editObj = {_id:this.editId,role_name:this.editRolename};
   this.apiService.editRoles(editObj).subscribe((data)=>{
     if(data['status'])
     {
      this.getAllroles();
      $("[data-dismiss=modal]").trigger({ type: "click" });
      $("#editRoles").hide();
      Swal.fire(
        'UPDATED SUCESSFULLY',
        'WELL DONE',
        'success'
      );
     }
     else{
      $("[data-dismiss=modal]").trigger({ type: "click" });
      $("#editRoles").hide();
      Swal.fire(
        'Something Went Wrong',
        'Try Again',
        'error'
      );
     }
   })
  }

  // FUNCTION FOR DELETE THE ROLES

  deleteRoles(deleteId)
  {
    let deleteObj = {_id:deleteId}
    this.apiService.deleteRoles(deleteObj).subscribe((data)=>{
      if(data['status'])
      {
        this.getAllroles();
        Swal.fire(
          'Deleted Succesfully',
          'WELL DONE',
          'success'
        );
      }
      else{
        Swal.fire(
          'Something Went Wrong',
          'Try Again',
          'error'
        );
      }
    })
  }

  // NAVIGATE TO CREATE USER-PAGE
  addUser()
  {
    this.router.navigateByUrl("/create-user")
  }
}
