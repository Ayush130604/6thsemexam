const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/User');
const session = require('express-session');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');


//routing
const authRoute = require('./routes/auth');
const todoRoute = require('./routes/todo');


// mongoose connect
mongoose.connect('mongodb://127.0.0.1:27017/6thSemTest')
.then(()=>{
    console.log("DB is Connected Successfully");
})
.catch((err)=>{
    console.log("DB is Failed to connect");
    console.log(err);
})


// this is for ejs files
app.set('view engine','ejs');
app.set('views' , path.join(__dirname , "views"));


// for set public folder
app.use(express.static(path.join(__dirname , 'public')));


// for setting post request middleware
app.use(express.urlencoded({extended : true}));


// for set up session middleware 
let connect = {
    secret: 'My personal Secret key',
    resave: false,
    saveUninitialized: true,
    // here i comment out the cookie part because i did not require cookie parser middle ware 
    // cookie: { secure: true }
    // if i dont comment it then my flash does not able to retrieve the data from the flash
  }
app.use(session(connect));


// to override the post request into patch prequest
app.use(methodOverride('_method'));

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


passport.use(new LocalStrategy(User.authenticate()));




app.use(authRoute);
app.use(todoRoute);


const port = 8000;
app.listen(port , ()=>{
    console.log(`Server is Connected at port no http://localhost:${port}`);
})