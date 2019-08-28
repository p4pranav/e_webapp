import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CatserService } from 'src/app/service/catser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addcat',
  templateUrl: './addcat.component.html',
  styleUrls: ['./addcat.component.css']
})
export class AddcatComponent implements OnInit {
myForm:FormGroup;
image;
 resData;
 msg;
  constructor( private fb:FormBuilder, private catser:CatserService, private router:Router) { }

  ngOnInit() {
    this.Validate();
}
Validate()
{
 this.myForm=this.fb.group(
   {
     'category':['',Validators.required],
     'description':['',Validators.required],
   }
 )
}
addImage(event)
{
    if(event.target.files && event.target.files.length>0)
    {
      this.image=event.target.files[0];
      console.log(this.image);
      
    }
}
addCat()
{
  let category=this.myForm.controls.category.value;
  let desc=this.myForm.controls.description.value;
  let formData=new FormData();
  formData.append('cname',category);
  formData.append('descp',desc)
  formData.append('Image',this.image)
  this.catser.addCat(formData)
  .subscribe(res=>
  {
    this.resData=res;
    if(this.resData.err==0)
    {
      alert('Category Added');
      setTimeout(()=>
    {
      this.router.navigate(['/admin/cat'])
    },2000)
    }
    else
    {
      this.msg=this.resData.msg;  
    }
   
  })
}
}
