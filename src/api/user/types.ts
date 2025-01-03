export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  avatar?: string;
  patronymic?: string;
  dateOfBirth?: string;
  passportSeries?: string;
  passportNumber?: string;
  passportIssuedBy?: string;
  passportIssueDate?: string;
}
