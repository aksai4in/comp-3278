import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentIdService {
  studentId: any;
  constructor() { }
  setStudentId(id:any){
    this.studentId = id;
  }
  getStudentId(){
    return this.studentId;
  }
}
