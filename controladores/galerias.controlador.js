"use strict"

//Método de prueba

var Galerias = require("../modelos/galerias.modelo.js");

function pruebaGalerias(req,res){

	res.status(200).send({mensaje: "Probando el controlador de galerias"});
}

function crearFoto(req,res){

	var galerias = new Galerias();

	var parametros = req.body;

	
	if(req.files){

		var imagenRuta = req.files.imagen.path;
		var imagenSplit = imagenRuta.split("\\");
		galerias.imagen =imagenSplit[2];
		galerias.save((error, imagenGuardada)=>{
			if(error){
				res.status(500).send({mensaje: "Error al guardar la imagen"})

			}else{
				if(!imagenGuardada){
					res.status(404).send({mensaje: "No se ha podido guardar la imagen"})
				}else{
					res.status(200).send({imagenGuardada})
				}
			}
		});
	}
}

function mostrarGalerias(req,res){
	Galerias.find((error,mostrandoGalerias)=>{

		if(error){
			res.status(500).send({mensaje: "Error en la petición"})
		}else{
			res.status(200).send({mostrandoGalerias})
		}
	}).sort("_id");
}

module.exports = {
	pruebaGalerias,
	crearFoto,
	mostrarGalerias
}