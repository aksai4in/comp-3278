import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  sendEmail(data: any) {
    return this.http.post('http://127.0.0.1:8000/sendEmail',data);
  }
  logout(data: any) {
    return this.http.post('http://127.0.0.1:8000/logout',data);
  }
  getCourse(data: any) {
    return this.http.post('http://127.0.0.1:8000/getCourse',data);
  }
  getStudentCourses(data: any) {
    return this.http.post('http://127.0.0.1:8000/getStudentCourses',data);
  }
  getUpcomingClasses(data: any) {
    return this.http.post('http://127.0.0.1:8000/dashboard',data);
  }

  getStudent(data: any) {
    return this.http.post('http://127.0.0.1:8000/getStudent',data);
  }
  updateStudent(data: any) {
    return this.http.post('http://127.0.0.1:8000/updateStudent',data);
  }
  

  constructor(private http: HttpClient) { }
  login(data:any){
    return this.http.post('http://127.0.0.1:8000/login',data);
  }
  getLoginHistory(data: any) {
    return this.http.post('http://127.0.0.1:8000/loginHistory',data);
  }
  getSchedule(data: any) {
    return this.http.post('http://127.0.0.1:8000/schedule',data);
  }
}
