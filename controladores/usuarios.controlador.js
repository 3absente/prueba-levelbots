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

module.exports = {
	pruebaUsuarios,
	crearUsuarios,
	ingresoUsuario
}