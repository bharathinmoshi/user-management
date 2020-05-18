import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiURL: string = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) { }
  
  addRoles(roleObj)
  {
    return this.httpClient.post(`${this.apiURL}/role/create`,roleObj)
  }

  getAllroles()
  {
    return this.httpClient.get(`${this.apiURL}/role/getall`)
  }

  editRoles(updateRole)
  {
    return this.httpClient.post(`${this.apiURL}/role/edit`,updateRole)
  }

  deleteRoles(id)
  {
    return this.httpClient.post(`${this.apiURL}/role/disable`,id)
  }

  createUser(userObj)
  {
    return this.httpClient.post(`${this.apiURL}/user/create`,userObj)
  }

  loginUser(loginObj)
  {
    return this.httpClient.post(`${this.apiURL}/user/login`,loginObj)
  }

  getallUser()
  {
    return this.httpClient.get(`${this.apiURL}/user/getall`)
  }
}
