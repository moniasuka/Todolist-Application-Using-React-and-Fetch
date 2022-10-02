import React, {useState} from "react";

export const Todo = () => {
    //planteamientos 
    //Estructura de datos adecuada: Arreglos
    //["tarea1" , "lavar platos" , "sacar la basura"]
    //Para agregar utilizamos el metodo .push()
    //Poder recorrer los arreglos usamos .map((item, index)=>{return()})
    //Podemos remover .filter((item, index)=>{return(index != 2)})

    //se introducen los hooks para lograr cambios en el arreglo (agregar entries o borrar entries) 

    const [listTodos, setListTodos] = useState([])
    const [todo, setTodo] = useState("")



    //se introduce el hook para el contador de entries en la lista
    const [count, setCount] = useState(0);

   
    
        // Funcion para decrementar el count de entries en a lista en 1 (al ejecutar la funcion decrementCount como resultado del evento "deleteTodo" (presionar el boton con la x))
        const decrementCount = () => {
        // se actualiz el state a la variable count disminuyendo 1 
        setCount(count - 1);
        };

      // Funcion para incrementar el count de entries en a lista en 1 (al ejecutar la funcion .slice() y .push() como resultado del evento "onKeyup" (presionar y soltar la tecla enter) despues de que un valor fue introducido al input pr el usuario)
       const incrementCount = () => {
        // se actualiza el state a la variable count agregandole 1
        setCount(count + 1);
        };




    //funcion creada para borrar tareas

    const deleteTodo = (indiceTarea) => {   
    setListTodos((prevState) => 
    {return prevState.filter((item, index) => { return index !== indiceTarea;})}
    )};

   

    //creacion de input para que el usuario introduzca y/o borre entries
    //el elemento input incluye un evento que se ejecuta cuando el usuario presiona enter, esto crea una copia del arreglo original con la funcion .slice() y guarda la copia en el arreglo auxiliar
    //al arreglo auxiliar se le agrega el valor introducido por el usuario con ayuda de la funcion .push() y e.target.value , que guarda el valor agregado por el usuario
    //despues de esto, se pasan los datos del arreglo auxiliar de vuelta al arreglo listTodos y se resetea el vaor de e.target.value a ="" para que el input deje de mostrar el entry del usuario
    
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