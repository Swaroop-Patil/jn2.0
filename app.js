const express= require("express");
const bodyParser=require("body-parser");    //requiring the modules,packages(exp,b-p,request) we installed
const request=require("request");
const https=require("https");


const app=express(); //new instance 
const Port=process.env.Port || 3000;


app.use(express.static("public")); //to serve up static files(css,images) to server

app.use(bodyParser.urlencoded({extended:true}));

new BrowserWindow({
    webPreferences:{
        nodeIntegration:true,
        contextIsolation: false
    }
});

app.get("/",function(req,res){
    res.sendFile(__dirname +  "/index.html");
});

app.post("/",function(req,res){

    const firstName=req.body.fname;
    const email=req.body.email;
    const courseTaken=req.body.course;
    const phno=req.body.phno;
     
    
    console.log(firstName);
    console.log(email);
    console.log(phno);
    console.log(courseTaken);

    const data= {
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields: {
                FNAME:firstName,
                COURSE:courseTaken,
                PHONE:phno

                }
            }
        ]
    };
    const jsonData=JSON.stringify(data);   //to convert to flatpack json
    
    const url="https://us12.api.mailchimp.com/3.0/lists/41fde289d6";


    const options={
          method:"POST",
          auth:"Swaroop Patil:724c7388cb7bb6fbecc326339d678792-us12"
    }

    const request=https.request(url,options,function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })


    request.write(jsonData);
    request.end();

}
);
//using app to set our server to listen on port 3000


app.listen(3000,function(){
    console.log("Server runnning on 3000");
});

    //6dbd187e42793c6a7c70954bf4600429-us12                                  

    //41fde289d6