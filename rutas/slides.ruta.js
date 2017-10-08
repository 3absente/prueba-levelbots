"use strict"

var express = require("express");

var ControladorSlides = require("../controladores/slides.controlador.js");

var api = express.Router();

api.get("/probando-controlador-slides", ControladorSlides.pruebaSlides);

module.exports = api;