"use strict"

//Método de prueba

var Galerias = require("../modelos/galerias.modelo.js");

var fs = require("fs");

var path = require("path");

function pruebaGalerias(req,res){

	res.status(200).send({mensaje: "Probando el controlador de galerias"});
}

function crearFoto(req,res){

	var galerias = new Galerias();

	var parametros = req.body;

	
	if(req.files){

		var imagenRuta = req.files.imagen.path;
		var imagenSplit = imagenRuta.split("\\");
		galerias.foto =imagenSplit[2];
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

function borrarFoto(req,res){
	var id = req.params.id;

	Galerias.findOne({_id: id}, (error, capturarfoto)=>{

		if(error){
			res.status(500).send({mensaje: " Error al capturar la foto"})
		}else{
			if(!capturarfoto){
				res.status(404).send({mensaje: "No se ha podido capturar la foto"})
			}else{
			
				var antiguaImagen = capturarfoto.imagen;
				var rutaImagen = "./ficheros/galeria/"+antiguaImagen;
				fs.unlink(rutaImagen);

			}
		}

	})

	setTimeout(function(){
		Galerias.findByIdAndRemove(id, (error, borrarfoto)=>{

			if(error){
				res.status(500).send({mensaje: " Error al borrar la foto"})
			}else{
				if(!borrarfoto){
					res.status(404).send({mensaje: "No se ha podido borrar la foto"})
				}else{
					res.status(200).send({borrarfoto})
				}
			}

		})

	}, 1000)
}

function tomarImagenGaleria(req,res){

	var imagen = req.params.foto;
	var rutaImagen = "./ficheros/galeria/"+imagen;

	fs.exists(rutaImagen, function(exist){

		if(exist){
			res.sendFile(path.resolve(rutaImagen))
		}else{
			res.status(404).send({mensaje: "Imagen not found"})
		}

	})

}

module.exports = {
	pruebaGalerias,
	crearFoto,
	mostrarGalerias,
	borrarFoto,
	tomarImagenGaleria
}