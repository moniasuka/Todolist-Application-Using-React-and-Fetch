import React, {useState} from "react";

export const Todo = () => {
    //planteamientos 
    //1) estructura de datos adecuada: Arreglos
    //["tarea1" , "lavar platos" , "sacar la basura"]
    //Para agregar utilizamos el metodo .push()
    //Poder recorrer los arreglos usamos .map((item, index)=>{return()})
    //Podemos remover .filter((item, index)=>{return(index != 2)})

    const [listTodos, setListTodos] = useState([])
    const [todo, setTodo] = useState("")



    //contador
    const [count, setCount] = useState(0);

   
    
        // Function to increment count by 1
        const decrementCount = () => {
        // Update state with decremented value
        setCount(count - 1);
        };

       // Function to increment count by 1
       const incrementCount = () => {
        // Update state with incremented value
        setCount(count + 1);
        };




    //para borrar tareas

    const deleteTodo = (indiceTarea) => {   
    setListTodos((prevState) => 
    {return prevState.filter((item, index) => { return index !== indiceTarea;})}
    )};

   


    return (
        
        <div className="card d-inline-flex p-2 w-50">
            
            <input placeholder="What needs to be done?" type="text" onKeyUp={(e)=>{
                if(e.keyCode =="13"){
                    let arrAux = listTodos.slice()
                    arrAux.push(e.target.value)
                    setListTodos(arrAux)
                    e.target.value="";
                    incrementCount();
                    
                }
            }}
            />
                
            <ul>
               
                {listTodos.length>0 ? listTodos.map((tarea, index) => {  
                         
                    return (
                        <>
                        <li className="list-group-item d-flex justify-content-between" key={index}>  {tarea}  <button className="btn btn-outline-light" onClick={(e)=>{deleteTodo(index); decrementCount()}}><i className="fa fa-times"></i></button> </li> 
                    
                        </>
                    
                    )
                 
                }) :   <> </> }
           
            </ul>
            <div>
               <p>{count} items left</p> 
            </div>
        </div>
        

    )
}