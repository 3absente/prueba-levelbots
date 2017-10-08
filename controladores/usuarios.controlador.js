"use strict"

//Importamos modelo usuarios

var Usuarios = require("../modelos/usuarios.modelo.js");

//dependencia para encriptar contraseña

var bcrypt = require("bcrypt-nodejs");

//importamos el token
var token = require("../token/token.js");

//Método de prueba

function pruebaUsuarios(req,res){

	res.status(200).send({mensaje: "Probando el controlador de usuarios"});
}

function crearUsuarios(req,res){
	var usuarios = new Usuarios();

	var parametros = req.body;
	//console.log(parametros);
	usuarios.usuario = parametros.usuario;

	if(parametros.password){
		bcrypt.hash(parametros.password, null,null, function(error, hash){
			usuarios.password=hash;

			if(parametros.usuario != null){
				usuarios.save((error, usuarioGuardado)=>{
					if(error){
						res.status(500).send({mensaje: "Error al guardar el usuario"})
					}else{
						res.status(200).send({usuarioGuardado})
					}
				})
			}
		})
	}
	
}


function ingresoUsuario(req,res){

	var parametros = req.body;
	var usuario = parametros.usuario;
	var password = parametros.password;

	Usuarios.findOne({usuario:usuario},(error, seleccionUsuario)=>{

		if(error){
			res.status(500).send({mensaje: "Error al ingresar el usuario"})

		}else{
			if(!usuario ){
				res.status(404).send({mensaje: "El usuario no existe"})
			}else{
				bcrypt.compare(password, seleccionUsuario.password, function(error,ok){
					if(ok){
						
						//res.status(200).send({seleccionUsuario});
					
						if(parametros.token){
							res.status(200).send({token: token.crearToken(seleccionUsuario)})
						}
					}else{
						res.status(404).send({mensaje: "El usuario no ha podido ingresar"})
					}
				})
			}

		}

	})

}

function actualizarUsuario(req,res){
	var id= req.params.id;

	var actualizar = req.body;

	if(id != req.usuarioToken.sub){
		return res.status(500).send({mensaje: "No tienes permisos para actualizar este usuario"});
	}

	//recorremos la base de datos con el método FindByIdAndUpdate
	Usuarios.findByIdAndUpdate(id, actualizar, {new:true}, (error, usuarioActualizado)=>{

		if(error){
			res.status(500).send({mensaje: "Error al actualizar el usuario"});
		}else{
			if(!usuarioActualizado){
				res.status(404).send({mensaje: "no se ha podido actualizar el usuario"});
			}else{
				res.status(200).send({usuarioActualizado});
			}	
		}
	})



}

function borrarUsuario(req,res){

	var id= req.params.id;

	Usuarios.findByIdAndRemove(id, (error, usuarioBorrado)=>{

		if(error){
			res.status(500).send({mensaje:"Error al borrar el usuario"})
		}else{
			if(!usuarioBorrado){
				res.status(404).send({mensaje:"No se ha podido borrar el usuario"})
			}else{
				res.status(200).send({usuarioBorrado})
			}
		}
	})	

}

module.exports = {
	pruebaUsuarios,
	crearUsuarios,
	ingresoUsuario,
	actualizarUsuario,
	borrarUsuario
}