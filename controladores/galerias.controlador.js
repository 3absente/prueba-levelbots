"use strict"

//Método de prueba

function pruebaGalerias(req,res){

	res.status(200).send({mensaje: "Probando el controlador de galerias"});
}

module.exports = {
	pruebaGalerias
}