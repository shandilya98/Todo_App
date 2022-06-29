import {useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import "./home.css";
export default function Home (){

    const [itemContent, setItemContent] = useState('');
    const [listItems, setListItems] = useState([]);
    const [isUpdating ,setIsUpdating] = useState();
   const [updateItemText, setUpdateItemText] = useState('');
    // adding todo items to the databse
  
  
    const addItem = async(e) =>{
     e.preventDefault(); 
      try{
     const res = await axios.post('http://localhost:5500/api/item', {item: itemContent})
     setListItems(prev => [...prev, res.data])
     setItemContent('');
   }catch(err){
  console.log(err);
   }
  
  }  
    //creating a function to fetch all todo list items from database --using useEffect()
    useEffect(()=>{
      const getItemsList = async() =>{
        try{
         const res = await axios.get('http://localhost:5500/api/items')
         console.log(res.data);
         
        }catch(err){
         console.log(err);
        }
      }
      getItemsList()
    }, []);
  
  // Delete item on clicking the button
   const deleteItem = async (id) =>{
    try{
        const res = await axios.delete('http://localhost:5500/api/item/${id}') 
        const newListItems =  listItems.filter(item => item._id !== id);
        setListItems(newListItems);
      }catch(err){
  console.log(err);
    }
   }
  
   //update item
   const updateItem = async (e) =>{
    e.preventDefault()
    try {
      const res = await axios.put('http://localhost:5500/api/item/${isUpdating}',{item: updateItemText}) 
      console.log(res.data);
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const  updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    } catch (err) {
      console.log(err);
    }
   }
   // before updating item we need to show input field where we will create our updated item
  const renderUpdateForm = () => (
    <form className='update-form' onSubmit={(e) =>{updateItem(e)}}>
      <input className ="update-new-input" type= "text" placeholder ="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value ={setUpdateItemText}/>
      <button className ="update-new-btn" type = "submit">Update</button>
    </form>
  )
  
    return (
      <div className="App">
        <h2>Todo App</h2>
        <form className='form' onSubmit = {e => addItem(e)}>
          <input type="text" placeholder="Add your new todo"  onChange={e => {setItemContent(e.target.value)}} value = {itemContent}/>
          <button type="submit">+</button>
        </form>
        <div className="todo-listItems">
          {  
          listItems.map(item =>(
            <div className="todo-item">
              {
                isUpdating === item._id
                ? renderUpdateForm()
                 : <>
              
            <p className = "item-content">{item.item}</p>
            <button className = "update-item" onClick={()=>{setIsUpdating(item._id)}}>Update</button>
            <button className = "delete-item" onClick={()=>{deleteItem(item._id)}}>Delete</button>
            </>
           }
          </div>
          ))
  
          }
         
        </div>
      </div>
    );
  }
  

  
