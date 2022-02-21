import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../common/user";
import {Observable} from "rxjs";
import {AssignmentPending} from "../common/assignment-pending";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user: User = new User();
   private baseUrl = 'http://localhost:8081';
  // private baseUrl = 'https://homeworktracker-backend.herokuapp.com';

  constructor(private httpclient: HttpClient) {
  }

  authenticate(username: String, password: String): boolean {

    const loginUrl = `${this.baseUrl}/login?username=${username}&password=${password}`;
    this.httpclient.get<User>(loginUrl).subscribe((data) => {
      if (data.username !== null) {
        sessionStorage.setItem('username', username.toString())
      }
    }, (err: any) => {
    })
    let user = sessionStorage.getItem('username')
    if (user !== null) {
      return true
    } else {
      return false;
    }
  }

  getUserDetails(username: string): Observable<User> {
    const userDetailUrl = `${this.baseUrl}/find-user?username=${username}`
    return this.httpclient.get<User>(userDetailUrl);
  }

  getCourseAssignment(username: string): Observable<AssignmentPending[]> {
    const assignmentCourseUrl = `${this.baseUrl}/find-user-courses?username=${username}`;
    return this.httpclient.get<AssignmentPending[]>(assignmentCourseUrl);
  }

  removeAssignment(username: string, courseName: string): Observable<any> {
    const removeAssignment = `${this.baseUrl}/user-courses?username=${username}&courseName=${courseName}`;
    return this.httpclient.delete(removeAssignment);
  }

  addAssignment(tempAssignmentPending: AssignmentPending, username: string) {
    const addAssignmentUrl = `${this.baseUrl}/user-courses?username=${username}`;
    return this.httpclient.post(addAssignmentUrl, tempAssignmentPending);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    if (user !== null) {
      return true
    }
    return false;
  }

  logOut() {
    sessionStorage.removeItem('username')
  }

  signupService(user: User) : Observable<any>{
    const addUserUrl = `${this.baseUrl}/user`;
    return this.httpclient.post<User>(addUserUrl, user);
  }
}
