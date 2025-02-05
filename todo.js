const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');


router.get('/todo' ,async (req,res) =>{
    let alltodo = await Todo.find({});
    res.render('todo/main', {alltodo});
})

router.post('/todo' ,async (req,res)=>{
    let {title , desc} = req.body;
    await Todo.create({title , desc});
    res.redirect('/todo');
})


router.get('/new' , (req,res)=>{
    res.render('todo/new');
})

router.get('/show/:id' , async (req,res) =>{
    let {id} = req.params;
    let todo = await Todo.findById(id);
    res.render('todo/show' , {todo});
})

router.get('/edit/:id' , async(req,res)=>{
    let {id} = req.params;
    let todo = await Todo.findById(id);
    res.render('todo/edit' , {todo});
})

router.patch('/edit/:id' ,async (req,res)=>{
    let {id} = req.params;
    let {title , desc} = req.body;
    await Todo.findByIdAndUpdate(id ,{title , desc})
    res.redirect(`/show/${id}`)    
})

router.delete('/:id' ,async (req,res)=>{
    let {id} = req.params;  
    await Todo.findByIdAndDelete(id);
    res.redirect('/todo');
})

module.exports = router;