import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { StudentIdService } from '../student-id.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  incorrectCredentials = false;
  error:any;
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  constructor(private router: Router, 
    private userServices:UserServicesService,
    private studentId: StudentIdService){}
  login(event:Event){
    event.preventDefault();
    console.log("Login button clicked");
    console.log(this.loginForm.value);
    this.userServices.login(this.loginForm.value)
    .subscribe((res:any)=>{
      console.log(res.student_id);
      if(res.login == 'success'){
        this.studentId.setStudentId(res.student_id);
        this.router.navigate(['/dashboard']);
      }else{
        this.incorrectCredentials = true;
        this.error = res.error;
      }
    })
  }
}
