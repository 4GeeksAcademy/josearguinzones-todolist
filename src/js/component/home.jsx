import React from "react";
import { useState,useEffect } from "react";

//create your first component
const Home = () => {
	const[tarea,setTarea]=useState("");
	const[lista,setLista]=useState([]);

	useEffect(()=>{
		// crearUsuario()
		obtenerlistadetareas();
	},[])

	useEffect(()=>{
		actualizarlistadetareas();
	},[lista])

	const crearUsuario=async()=>{
		const response=await fetch("https://playground.4geeks.com/apis/fake/todos/user/josearguinzones",{
			method:"POST",
			body:JSON.stringify([]),
			headers:{"Content-Type":"application/json"}
		})
		const data=await response.json()
		console.log(data);

	}	
		const actualizarlistadetareas=async()=>{
			const response=await fetch("https://playground.4geeks.com/apis/fake/todos/user/josearguinzones",{
			method:"PUT",
			body:JSON.stringify(lista),
			headers:{"Content-Type":"application/json"}
		})
		const data=await response.json()
		console.log(data);
		}

		const obtenerlistadetareas=async()=>{
			const response=await fetch("https://playground.4geeks.com/apis/fake/todos/user/josearguinzones")
			const data=await response.json()
			console.log(data);
			setLista(data)
		}

		function guardartarea(e){
			e.preventDefault()
			setLista([...lista,{"label":tarea,"done":false}]);
			setTarea("");
		}

		function eleminartarea(id){
			let actualizado=[]
			actualizado=lista.filter((item,index)=>{
				if(index!=id){
					return item;
				}
			})
			setLista(actualizado);
		}


	return (
		<div className="text-center container">
			<input className="form-control" type="text" value={tarea} onChange={(e)=>setTarea(e.target.value)}/ >
				<button className="btn btn-success" onClick={guardartarea}>
					Agregar Tarea
				</button>
			<div>
				<ul className="list-group">
					{lista.map((item,id)=>(
						<li className="list-group-item" key={id}>{item.label}
							<button className="btn btn-danger float-end" onClick={(e)=>eleminartarea(id)}>
								x
							</button>
						</li>
					))}
				</ul>
			</div>
			<p>
				tareas pendientes:{lista.length}
			</p>
		</div>
	);
};

export default Home;