"use strict"

var express = require("express");
var bodyParser = require("body-parser");

//Variable express
var app = express();


//cargar rutas
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var rutaUsuarios = require("./rutas/usuarios.ruta.js");
var rutaSlides = require("./rutas/slides.ruta.js");
var rutaGalerias = require("./rutas/galerias.ruta.js");


//rutas base
/*app.get("/pruebas", function(req,res){
	res.status(200).send({message: "Bienvenido"})
})*/

app.use("/api", rutaUsuarios);
app.use("/api", rutaSlides);
app.use("/api", rutaGalerias);

//exportamos la clase app.js
module.exports = app;