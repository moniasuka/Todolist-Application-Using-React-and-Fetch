import React, {useState} from "react";

export const Todo = () => {
    //planteamientos 
    //1) estructura de datos adecuada: Arreglos
    //["tarea1" , "lavar platos" , "sacar la basura"]
    //Para agregar utilizamos el metodo .push()
    //Poder recorrer los arreglos con For, .map((item, index)=>{return()})
    //Podemos remover .filter((item, index)=>{return(index != 2)})

    const [listTodos, setListTodos] = useState([])
    const [todo, setTodo] = useState("")



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
                }
            }}
            />
                
            <ul>
                {listTodos.length>0 ? listTodos.map((tarea, index) => {        
                    return (
                        <>
                        <li className="list-group-item d-flex" key={index}>  {tarea}  <button onClick={(e)=>{deleteTodo(index)}}><i className="fa fa-times align-items-end"></i></button> </li> 
                        </>
                    )
                
                }) :   <> </> }
            
            </ul>
        </div>
        

    )
}