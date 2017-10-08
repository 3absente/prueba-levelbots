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

	Slides.find((error,mostrandoSlides)=>{

		if(error){
			res.status(500).send({mensaje: "Error en la petición"})
		}else{
			res.status(200).send({mostrandoSlides})
		}
	}).sort("_id");
}

function actualizarSlide(req,res){

	var slides = Slides();

	var id = req.params.id;
	var parametros = req.body;

	slides.titulo = parametros.titulo;
	slides.descripcion = parametros.descripcion;

	var cambioImagen = false;

	if(parametros.actualizarImagen=="false"){
		slides.imagen = parametros.rutaImagenActual;

		noHayCambioImagen=true;
	}
	if(cambioImagen){
		if(slides.titulo != null && slides.descripcion !=null && slides.imagen!=null){

			var actualizar = {
					"titulo": slides.titulo,
					"descripcion": slides.descripcíon,
					"imagen": slide.imagen
			}

			Slides.findByIdAndUpdate(id, actualizar, (error, slidesActualizado)=>{
				if(error){
					res.status(500).send({mensaje: "Error al actualizar el Slide"})
				}else{
					if(!slideActualizado){
						res.status(404).send({mensaje:"No se ha podido actualizar el Slide"})
					}else{
						res.status(200).send({slideActualizado})
					}
				}
			} )
		}
	}
}	

module.exports = {
	pruebaSlides,
	crearSlides,
	mostrarSlides,
	actualizarSlide
}