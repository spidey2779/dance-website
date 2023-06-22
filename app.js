const express =require("express");
const path=require("path");
const bodyparser=require('body-parser')
const fs=require("fs");
const app=express();
const port=80;
// app.use('/user',UserRouter)
const mongoDB = "mongodb://127.0.0.1/dancewebsite";
const mongoose = require('mongoose');
// const mongoDB=require('./data');
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}
).then(() => {

    console.log("DataBase connected")
})
    .catch((err) => {
        console.log("error connecting" + err)
    })

//defining the schema
const Contactschema=new mongoose.Schema({
    name:{type:String,required:true},
    phone:String,
    email:String,
    address:String,
    desc:String,
})

const Contact=mongoose.model('contact_collectioin',Contactschema);

//don't forget to npm init

// app.use(express.static('public',option)); this is another way to implement express
//EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));
app.use(express.urlencoded());//this line should definitely include 

//PUG SPECIFIC STUFF  (setting engine)
app.set('view engine','pug');//set the template engine as pug
app.set('./views',path.join(__dirname,'views'));//set the views directory

//END POINTS
app.get('/',(req,res)=>{
    const params={'title':'Dance Website','content':''};
    res.status(200).render('home.pug',params);
});
app.get('/contact',(req,res)=>{
    const params={'title':'Dance Website','content':''};
    res.status(200).render('contact.pug',params);
});

//post request of contact 
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved to data base");
        console.log(myData)
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    })
    // res.status(200).render('contact.pug')
})





//START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`
    );
});
