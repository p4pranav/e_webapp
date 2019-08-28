const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const multer=require('multer');
let DIR='./attach';
//for file upload with multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })
  
  let upload = multer({ storage: storage }).single('Image');


mongoose.connect("mongodb://localhost/fashstore");

let loginModel=require('./database/login');
let userModel=require('./database/userRegister');
let catModel=require('./database/category')


const bodyParser=require('body-parser');
const app=express();
app.use('/myimages',express.static('attach'));
app.use(cors());
app.use(bodyParser.json());

app.post('/api/login',function(req,res) 
{
    let email=req.body.email;
    let pass=req.body.password;
    loginModel.find({'email':email,'password':pass},function(err,data)
      {
         if(err){
            res.json({'err':1,'msg':'Some error occor'})
         }
         else if (data.length==0)
         {
             res.json({'err':1,'msg':'Email or pass is not correct'})
         }
         else
         {
             res.json({'err':0,'msg':'Login Successfully','ulogin':email})
         }
      })
      
    
})
app.post('/api/adminlogin',function(req,res) 
{
    let email=req.body.email;
    let pass=req.body.password;
    loginModel.find({'email':email,'password':pass},function(err,data)
      {
         if(err){
            res.json({'err':1,'msg':'Some error occor'})
         }
         else if (data.length==0)
         {
             res.json({'err':1,'msg':'Email or pass is not correct'})
         }
         else
         {
             res.json({'err':0,'msg':'Login Successfully','ulogin':email})
         }
      })
      
    
})
app.post('/api/user',function(req,res) 
{
    let name=req.body.name;
    let email=req.body.email;
    let contact=req.body.contact;
    let pass=req.body.password;
    let ins=new userModel({'name':name,'email':email, 'contact':contact, 'password':pass});
    ins.save(function(err)
     {
         if(err)
         {
            res.json({'err':1,'msg':'Not Insert Successfully'});
         }
         res.json({'err':0,'msg':'Insert Successfully'});
     })
    
    
})
app.post('/api/login',function(req,res) 
{
    let email=req.body.email;
    let pass=req.body.password;
    userModel.find({'email':email,'password':pass},function(err,data)
      {
         if(err){
            res.json({'err':1,'msg':'Some error occor'})
         }
         else if (data.length==0)
         {
             res.json({'err':1,'msg':'Email or pass is not correct'})
         }
         else
         {
             res.json({'err':0,'msg':'Login Successfully','ulogin':email})
         }
      })
    
})


app.post('/api/addcat',function(req,res)
{
   upload(req,res,function(err)
      {
             if(err)
             {}
             else
             {
                 let cname=req.body.cname;
                 let descp=req.body.descp;
                 let fname=req.file.filename;
                 ins=new catModel({'category':cname,'description':descp,'image':fname});
                 ins.save(function(err)
                {
                    if(err){}
                    else
                    {
                        res.json({'err':0,'msg':'category save'})
                    }
                })
             }
      })
})

app.get('/api/fetchcat',function(req,res)
{
    catModel.find({},function(err,data)
      {
           if(err){}
           else
           {
               res.json({'err':0,'cdata':data})
           }
      })
})


app.get('/api/delcat/:id',function(req,res)
{
    let cid=req.params.id;
    catModel.remove({'_id':cid},function(err)
{
    if(err){}
    else
    {
        res.json({'err':0,'msg':'Category Deleted'})
    }
})
})

app.listen(8899,function()
{
    console.log("Work on 8899");
})