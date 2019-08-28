import { Injectable } from '@angular/core';

import { CanActivate, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private rout:Router){}
  canActivate(): boolean{
    
if(localStorage.getItem('uid')!=null)
{
  return true;
}
else
{
  alert("You are not authorise to view this page..,.Login first!")
  this.rout.navigateByUrl('/login');
}
  }   
}
