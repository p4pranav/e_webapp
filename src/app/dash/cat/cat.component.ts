import { Component, OnInit } from '@angular/core';
import { CatserService } from 'src/app/service/catser.service';

@Component({
  selector: 'app-cat',
  templateUrl: './cat.component.html',
  styleUrls: ['./cat.component.css']
})
export class CatComponent implements OnInit {

  getData;
  resData;
  catData;
 constructor(private catser:CatserService) { }

 ngOnInit() 
 {
   this.getData=this.catser.fetchCat()
   .subscribe(res=>
   {
    this.resData=res;
    if(this.resData.err==0)
    {
      this.catData=this.resData.cdata;
    }
   })
 }
 delCat(id)
 {
   this.catser.delCat(id)
   .subscribe(res=>
   {
     this.resData=res;
     if(this.resData.err==0)
     {
       alert(this.resData.msg);
       setTimeout(()=>
     {
       
     })
     }
   })
 }
 ngOnDestroy()
 {
   if(this.getData)
   {
     this.getData.unsubscribe();
   }
 }

}
