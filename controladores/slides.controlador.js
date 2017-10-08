"use strict"


var Slides = require("../modelos/slides.modelo.js");
//Método de prueba

function pruebaSlides(req,res){

	res.status(200).send({mensaje: "Probando el controlador de slides"});
}



function crearSlides(req,res){
	var slides = new Slides();

	var parametros = req.body;
	slides.titulo = parametros.titulo;
	slides.descripcion = parametros.descripcion;

	
	if(req.files){

		var imagenRuta = req.files.imagen.path;
		var imagenSplit = imagenRuta.split("\\");
		slides.imagen =imagenSplit[2];

		if(slides.titulo != null && slides.descripcion != null){
			slides.save((error, slideGuardado)=>{
				if(error){
					res.status(500).send({mensaje: "Error al guardar el slide"})

				}else{
					if(!slideGuardado){
						res.status(404).send({mensaje: "No se ha podido guardar el slide"})
					}else{
						res.status(200).send({mensaje: "Slide guardado"})
					}
				}
			});
		}
	}
}

function mostrarSlides(req,res){

}

module.exports = {
	pruebaSlides,
	crearSlides,
	mostrarSlides
}