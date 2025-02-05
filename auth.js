const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

router.get('/signup' , (req,res)=>{
    res.render('auth/signup');
});

router.post('/signup' ,async (req,res) => {
    let {username,email,password} = req.body;
    const user = new User({username , email});
    const newUser = await User.register(user , password);
    req.login(newUser, function(err) {
        if (err) { return next(err); }
        return res.redirect('/todo');
    })
})


router.get('/' , (req,res)=>{
    res.render('auth/login');
})

router.post('/login' , 
    passport.authenticate('local' , {
        failureRedirect: '/login', 
        failureMessage: true 
    }), 
    (req,res) =>{
        // req.flash('success' , "Hey Welcome back");
        res.redirect('/todo');
    }
)

router.get('/logout' ,(req,res)=>{
    ()=>{
        req.logout();
    }
    // req.flash('success' , "successfully logout");
    res.redirect('/login');
})



module.exports = router;