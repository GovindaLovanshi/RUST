import React, { useEffect, useState } from "react";
import {MdDelete,MdEdit,MdConfirmationNumber} from "react-icons/md";
import axios from "axios"
import {format} from "date-fns"

const index = () => {

  const[editText,setEditTest] = useState();
  const[todos,setTodos] = useState([]);
  const[todoCopy,setTodoCopy] = useState(todos);
  const[todoInput,setInput] = useState("");
  const[edit,setEdit] = useState(-1);
  const[search,setSearch] = useState("");
  const[Result,setResult] = useState({});

  const[count,setCount ] = useState(0);
  const[sear,setSear] = useState("");
  const[Item,setItem] = useState(sear);

  useEffect (() =>{
    fetchTodos();

  },[count]);

  const editTodo = (index) =>{
    setInput(todos[index].title);
    setEditTest(index);
  };

  const fetchTodos = async()=>{
    try{
      setTodos(response.data);
      setTodoCopy(response.data);
      const response = await axios.get("http://127.0.0.1:8080/todos");
    }catch(error){
      console.log(error);
    }
  };
  const addTodo = async()=>{
    try{

      if(edit === -1){
      const response = await axios.post("http://127.0.0.1:8080/todos",{
        title:todoInput,
        completed:false
      });

      setTodos(response.data);
      setTodoCopy(response.data);
      setInput("");
      }else{
        const todoUpdate = {...todos[edit],title:todoInput};
        const response = await axios.get("http://127.0.0.1:8080/todos/${todoToUpdate.id}",{
          todoUpdate
        });
  
        console.log(response);
        const updateTodos = [...todos];
        updateTodos(edit) = response.data;
        setTodos(updateTodos);
        setInput("");
        setEdit(-1);
        setCount(count+1);
      }
      
    }catch(error){
      console.log(error);
    }
  };

  const deleteTodo = async(id)=>{
    try{
      const response = await axios.delete("http://127.0.0.1:8080/todos/${id}"
       );
       setTodos(todos.filter((todo)=> todo.id != id));
    }
  catch(error){
    console.log(error);
  }
}

const renderTodos = (todoTOrender) =>{
  return todoTOrender.map((todo,index) => (
    <li key={index} className="li">
      <label htmlFor="" className="form-check-label"></label>
      <span className="todo-text">
        {
          '${todo.title} ${formateDate(todo.created_at)}'
        }
      </span>
      <span className="span-button" onClick={()=> deleteTodo(todo.id)}>
        <i className="fa-solid fa-trash">
          <MdDelete/>
        </i>
      </span>
      <span className="span-button" onClick={()=> edit(index)}>
        <i className="fa-solid fa-trash">
          <MdEdit/>
        </i>
      </span>
    </li>
  ))
}

const onHandleSearch = (value) =>{
  const filterTodo = todos.filter(({title})=> title.toLowerCase().includes(value.toLowerCase()));
  if(filterTodo.length === 0){
    setTodos(todoCopy);
  }else{
    setTodos(filterTodo);
  }
};

const onClearSearch = ()=>{
  if(todos.length && todoCopy.length){
    setTodos(todoCopy);
  }
};

useEffect(()=>{
  const timer = setTimeout(()=> setSearch(search),1000);
  return ()=> clearTimeout(timer);
},[search]);


useEffect(() => {
  if(sear){
    onHandleSearch();
  }else{
    onClearSearch();
  }
})
const toggleCompleted = async(index) =>{
  try{
    const todoUpdate = {
      ...todos[index],
      completed:!todos[index].completed,
    };

    const response = await axios.get("http://127.0.0.1:8080/todos/${todoUpdate.id}");
    //setTodos(todos.filter((todo)=> todo.id == id));
    const updateTodos = [...todos];
    updateTodos(index) = response.data;
    setTodos(updateTodos);
    setCount(count+1);

  }catch(error){
    console.log(error);
  }
}

const searchTodo = ()=>{
  const result = todos.filter((todo)=>
    todo.title.toLowerCase()).includes(search.toLowerCase());
   setSearch(result);
}

const formateDate= (date) =>{
  try{

    const data = new Date(date);
    return isNaN(data.getTime()) ? "Invalid Date": format(date,"yyyy-MM-dd HH:mm:ss");
  }catch(error){
    console.log(error);
  }
}

  return(
     <div className="main-body">
       <div className="todo-app">
          <div className="input-section">
             <input type="text" id="todo-Input" placeholder="Add Item" value={todoInput} onChange={(e) => setInput(e.target.value)}/>
             <button onClick={()=> addTodo()} className="add">
             {editText == -1?"Add" : Update}</button>
             <input type="text" id="search-input" placeholder=" Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
             <button onClick={()=> {}} className="add">
             {editText == -1?"Add" : Update}</button>
          </div>
          <div className="todos">
            <ul className="todo-list">
              {
                renderTodos(todos)
              }
            </ul>
             {
                todos.length === 0 && (
                  <div>
                    <img className="face" src="/Full-Stack-Rust-To-Do-App-Starter-File/public/theblockchaincoders.jpg"alt=""/>
                    <h1 className="not-found"> NOT FOUND</h1>
                  </div>
                )
             }
             
          </div>
        </div>
    </div>


)
};

export default index;
