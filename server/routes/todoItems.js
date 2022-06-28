const router = require('express').Router();
// import Todo model
const todoItemsModel = require('../models/TodoItems');
//Add  Todo items to the database
 router.post('/api/item', async(req, res) =>{
    try{
        const newItem = new todoItemsModel({
           item : req.body.item
        })
        //save the item to database
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    }
    catch(err){
        res.status(500).json(err)
      }
 })

 //Get the todo items from the database
 router.get('/api/items', async(req, res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({});
         res.status(200).json(allTodoItems)
    } catch(err){
        res.json(err);

    }
 })

 // Update the todo item in the database
 router.put('/api/items/:id', async(req, res)=>{
    try{
     const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
     res.status(200).json('item updated');
    }catch(err){
     res.json(err);
    }
 })
 // delete the item from the database
 router.delete('/api/item/:id', async(req,res)=>{
    try{
        //find the item by its id and delete it
     const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
     res.status(200).json('item deleted');
    }catch(err){
      res.json(err);
    }
 })
 //export the router
 module.exports = router;