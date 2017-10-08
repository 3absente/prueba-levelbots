"use strict"

var express = require("express");

var ControladorSlides = require("../controladores/slides.controlador.js");

var api = express.Router();

var multipart = require("connect-multiparty");

var md_aut = require("../token/aut.js");

var fichero = multipart({

	uploadDir: "./ficheros/slides"
})

api.get("/probando-controlador-slides", ControladorSlides.pruebaSlides);

api.post("/crear-slide", (md_aut.autenticacion, fichero), ControladorSlides.crearSlides);

api.get("/mostrar-slides", ControladorSlides.mostrarSlides);

api.put("/actualizar-slide/:id",(md_aut.autenticacion, fichero), ControladorSlides.actualizarSlide);

api.delete("/borrar-slide/:id", md_aut.autenticacion, ControladorSlides.borrarSlide);

api.get("/tomar-imagen-slide/:imagen", ControladorSlides.tomarImagenSlide);

module.exports = api;