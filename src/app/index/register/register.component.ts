import { Component, OnInit ,OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { UloginService } from 'src/app/service/ulogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
 
})
export class RegisterComponent implements OnInit {
myForm:FormGroup;
UserForm;
UserData;
resData;
errMsg;
  constructor( private fb:FormBuilder,private ls:UloginService,private router:Router) { }

  ngOnInit() {
    this.validate()
  }
validate()
{
  this.myForm=this.fb.group(
    {
      'name':['',Validators.required],
      'email':['',Validators.required],
      'contact':['',Validators.required],
      'password':['',Validators.required]
    }
  )}

regUser()
{

  const UserData=this.myForm.getRawValue();
  console.log(UserData);
  this.UserData=this.ls.user(UserData)
  .subscribe(res=>
    {
      this.resData=res;
      if(this.resData.err==0)
      {
        alert("insert successfully")

      }
      else{
        this.errMsg=this.resData.msg;
      }
    },err=>{})
  }
}