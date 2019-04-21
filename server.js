let express=require('express');
let app=express();
let bodyParser=require('body-parser');
let _=require('lodash');
let {User}=require('./model/user');
//Middleware for authentication
let {authenticate}=require('./authenicate');

//Parsing the request body
app.use(bodyParser.json());

//Home Page
app.get('/',(req,res)=>{
    console.log("Welcome to page");
    res.send("Send a welcome page");
});

//Signup API 
app.post('/signup',(req,res)=>{
    let body=_.pick(req.body,['first_name','last_name','email_id','password','mobile_number']);
    
    var user=new User(body);
    user.save().then((token)=>{
        res.status(200).send({message:'Signed up Successfully.',token:token})
    }).catch((err)=>{console.log(err);res.status(401).send()})
});

//Login API
app.post('/login',(req,res)=>{
    let body=_.pick(req.body,['email_id','password']);
    let user=new User(body);
    user.findUser()
        .then((token)=>{userToken=token;res.status(200).header({'x-auth':token}).send({message:'Logged in Successfully.',token:token})})
        .catch((err)=>{res.status(401).send({Error:err})})
});

//Create Event
app.post('/createEvent',authenticate,(req,res)=>{
    
    console.log("User authenticated");
    // let venues=_.pick(req.body.data);
    // user.createEvent(venues)
})

app.listen('3000',()=>{
    console.log("Server is active");
}
);
