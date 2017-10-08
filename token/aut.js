"use strict"

var token = require("jwt-simple");
var momento = require("moment");
var claveSecreta = "armadillo";

//método de autentificación

//middleware

exports.autenticacion = function(req,res,next){

	if(!req.headers.authorization){
		return res.status(403).send({mensaje: "La petición no tiene la cabecera de autenticación"});

	}else{
		var tokenEnviado = req.headers.authorization.replace(/['"]+/g,'');

		try{

			var cargarToken = token.decode(tokenEnviado,claveSecreta);

			if(cargarToken.exp <= momento().unix()){
				return res.status(403).send({mensaje: "El token ha expirado"});
			}

		}catch(excepcion){
			console.log(excepcion);
			return res.status(403).send({mensaje: "El token no es válido"});
		}

		req.usuarioToken = cargarToken;

		next();
	}
}