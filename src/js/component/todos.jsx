import React, { useState , useEffect } from "react";

export const Todo = () => {
  //planteamientos
  //Estructura de datos adecuada: Arreglos
  //["tarea1" , "lavar platos" , "sacar la basura"]
  //Para agregar utilizamos el metodo .push()
  //Poder recorrer los arreglos usamos .map((item, index)=>{return()})
  //Podemos remover .filter((item, index)=>{return(index != 2)})

  //se introducen los hooks para lograr cambios en el arreglo (agregar o borrar tareas)
  const [listTodos, setListTodos] = useState([]);
  const [count, setCount] = useState(0);


  //se introduce el hook para lograr cambios al usuario a traves de las APIs
  const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";
  const [usuario, setUsuario] = useState("");

  //Funcion para crear usuario
  const crearUsuario = async (e) => {
    let URI = `${BASE_URL}user/${usuario}`;
    let aux = e.target.value;
    setUsuario(aux);
    console.log(aux);

    try {
      let respuesta = await fetch(URI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify([]),
      });
      console.log(respuesta);
      if (respuesta.ok) {
        alert("Usuario creado correctamente");
        return;
      } else {
        alert("Error al crear usuario, o el usuario ya existe");
      }
      let respuestaJSON = await respuesta.json();
      console.log(respuestaJSON);
    } catch {
      (e) => console.log(e);
    }
  };

//Funcion para cargar la lista de tareas al servidor a traves del API cada vez que se carga a pagina por primera vez
// despues de colocar el usuario. Si existe la lista de tareas, la carga, de lo contrario retorna "respuesta fallida"
    const pullListaTareas = async () => {
    let URI = `${BASE_URL}user/${usuario}`;
    try {
        let apirespuesta = await fetch(URI);
        if (apirespuesta.ok) {
        let respuestaJSON = await apirespuesta.json();
        console.log("1" , respuestaJSON);
        console.log("2", listTodos);
        setListTodos(respuestaJSON);
        console.log("3", listTodos);       
        setCount(respuestaJSON.length);
        console.log("4", count)
        } else {
        console.log("respuesta fallida");
        setListTodos([]);
        }
    } catch {
        (err) => console.log(err);
    }};

    // cada vez que se carga la pagina se hace un pull de la lista de tareas que el usuario tiene
    useEffect(() => { pullListaTareas()}, [usuario]);

    // funcion para eliminar tareas con APIs
      const eliminarTarea = async (indiceTarea) => {
        let URI = `${BASE_URL}user/${usuario}`;

        let auxArr = listTodos.filter((tarea, index) => {
          return index !== indiceTarea;
        });
       
        if (auxArr.length > 0) {
          try {
            let respuesta = await fetch(URI, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(auxArr),
            });

            if (respuesta.ok) {
              console.log("Se eliminó exitósamente la tarea");
              pullListaTareas();
            } else {
              console.log("error");
            }
          } catch {
            (e) => console.log(e);
          }
        } else {
          let respuesta =  fetch(URI, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(auxArr),
          });
        }
      };

    // funcion para agregar tareas con APIs
      const agregarTarea = async (e) => {            
          let arrAux = listTodos.slice();
          arrAux.push({
            label: e,
            done: false
          });
          console.log("esta es la tarea nueva: ", arrAux)
          setListTodos(arrAux);
          console.log(usuario,e, arrAux)
          pullListaTareas();       

          let URI = `${BASE_URL}user/${usuario}`;
          try {
            let respuesta = await fetch(URI, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(arrAux),
            });
              console.log("este es el resultaod de JSON stringify: ", JSON.stringify(arrAux))
            if (respuesta.ok) {
              console.log("Se agregó la tarea exitosamente");             
              pullListaTareas();
            } else {
              console.log("error");
            }
          } catch {
            (e) => console.log(e);
          }
            
      };
           

    //funcion para borrar todas las tareas a la vez                  
      const borrarTodasTareas = async (e) => {
      let URI = `${BASE_URL}user/${usuario}`;
      let respuesta =  await fetch(URI , {
        method: "DELETE",
        headers: { "Content-Type": "application/json"},
        body:[],
      }); 
      pullListaTareas();             
      if (respuesta.ok) {
        alert("Se vació la lista de tareas exitosamente");
      } else {
        console.log("error", respuesta);

      }        
    };

  //dentro del return:
  //creacion de input para que el usuario introduzca y/o borre tareas
  //el input incluye un evento que cuando se ejecuta (al presionar enter), le asigna lo que se haya escrito a la constante usuario.
  // luego se incluye un botón para crear un usuario nuevo a través del evento onClick
  // después se incuye otro input para que el usuario pueda agregar tareas nuevas y éstas se agreguen al arreglo original al presionar enter
  //al final se agrega el contador para llevar cuenta de cuántas tareas quedan después de agregar o eliminar y al lado, un botón para eliminar todas las tareas a la vez si el usuario lo desea

  return (


    <div className="card d-inline-flex p-2 w-50">
     
    {/*Este input es para colocar un nombre de usuario y guardarlo en la constante Usuario para luego verificar
     si tiene una lista de tareas a desplegar en pantalla */}
      <input
        placeholder="Type Username"
        type="text"
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            let user = e.target.value;
            setUsuario(user);
            e.target.value = "";
          }
        }}
      />
         {/*Este boton es para agregar usuarios nuevos a traves de una API con fecth request*/}
        <button type="button" onClick={(e) => crearUsuario(e)}> Create username</button>

        {/*Este input es para agregar tareas nuevas luego de presionar enter*/}
      <input placeholder="What needs to be done?"
        type="text"
        onKeyUp={(e) => {
          if (e.keyCode == "13") {
            agregarTarea(e.target.value);
            e.target.value = "";
            
          }
        }}
      />

      <ul>
        {listTodos.length > 0 && listTodos && listTodos != undefined ? (
          listTodos.map((tarea, index) => {
            return (
              
                <li className="list-group-item d-flex justify-content-between" key={index}>
                    {tarea.label}                  
                    <button className="btn btn-outline-light" onClick={(e) => {eliminarTarea(index)}}>
                      <i className="fa fa-times"></i>
                    </button>
                </li>
           
            );
          })
        ) : (
          <>Nothing pending</>
        )}
      </ul>
      <div>
        <p>{count} items left</p>
      </div> 
      <div>     
        <button className="btn btn-outline-dark" 
        onClick={(e)=> {borrarTodasTareas(e)}}>Empty this list</button>
      </div> 
    </div>
  );
};
