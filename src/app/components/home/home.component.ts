import {Component, OnInit} from '@angular/core';
import {LoginService} from "../../services/login.service";
import {User} from "../../common/user";
import {AssignmentPending} from "../../common/assignment-pending";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User = new User();
  usernameFromSession: string = '';
  assignmentCourse: AssignmentPending[] = [];

  assignmentName: string = '';
  pendingDate: Date;


  constructor(private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.userFromSession();
    this.loadDataForUser(this.usernameFromSession);
    this.loadCourseAndAssignment(this.usernameFromSession);
  }

  userFromSession(): void {
    this.usernameFromSession = sessionStorage.getItem('username')!;
  }

  private loadDataForUser(usernameFromSession: string) {
    this.loginService.getUserDetails(usernameFromSession).subscribe((tempUser) => {
      this.user = tempUser;
    }, (err: any) => {
    });

  }

  private loadCourseAndAssignment(usernameFromSession: string) {
    this.loginService.getCourseAssignment(usernameFromSession).subscribe((data) => {
      this.assignmentCourse = data;
    }, (err: any) => {
    })
  }

  deleteAssignment(assignmentItem: AssignmentPending) {
    this.loginService.removeAssignment(this.usernameFromSession, assignmentItem.courseName!).subscribe((data) => {
    }, (err: any) => {
    })
    this.loadCourseAndAssignmentTimeout();

  }

  private loadCourseAndAssignmentTimeout() {
    setTimeout(() => {
      this.loadCourseAndAssignment(this.usernameFromSession);
    }, 200);
  }

  addAssignment() {
    console.log("Name==>", this.assignmentName);
    console.log("Date==>", this.pendingDate);
    let tempAssignmentPending: AssignmentPending = new AssignmentPending(this.assignmentName, this.pendingDate);
    console.log("tempAssignmentPending==>", tempAssignmentPending);
    this.loginService.addAssignment(tempAssignmentPending, this.usernameFromSession).subscribe(() => {
    }, (err: any) => {
    });
    this.loadCourseAndAssignmentTimeout();
    this.assignmentName = '';
    this.pendingDate = new Date();
  }
}
