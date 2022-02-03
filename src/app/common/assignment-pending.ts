export class AssignmentPending {

  courseName?: string;
  assignmentPendingDate?: Date;

  constructor(courseName: string, assignmentPendingDate: Date) {
    this.courseName = courseName;
    this.assignmentPendingDate = assignmentPendingDate;
  }
}
