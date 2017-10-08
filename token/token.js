"use strict"

var token = require("jwt-simple");

var momento = require("moment");

var claveSecreta = "armadillo";

//método del token

exports.crearToken = function(seleccionUsuario){

	//datos a codificar

	var cargarToken = {

		sub: seleccionUsuario._id,
		nombre: seleccionUsuario.usuario,
		now: momento().unix(),
		exp: momento().add(30, "days").unix()

	}

	return token.encode(cargarToken, claveSecreta);

}