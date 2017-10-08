"use strict"

//Método de prueba

function pruebaSlides(req,res){

	res.status(200).send({mensaje: "Probando el controlador de slides"});
}

module.exports = {
	pruebaSlides
}