"use strict"

var express = require("express");

var multipart = require("connect-multiparty");

var md_aut = require("../token/aut.js");


var fichero = multipart({
	uploadDir: "./ficheros/galeria"
});

var ControladorGalerias = require("../controladores/galerias.controlador.js");

var api = express.Router();

api.get("/probando-controlador-galerias", ControladorGalerias.pruebaGalerias);

api.post("/crear-foto", (md_aut.autentication, fichero), ControladorGalerias.crearFoto);

module.exports = api;