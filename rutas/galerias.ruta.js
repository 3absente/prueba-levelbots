"use strict"

var express = require("express");

var ControladorGalerias = require("../controladores/galerias.controlador.js");

var api = express.Router();

api.get("/probando-controlador-galerias", ControladorGalerias.pruebaGalerias);

module.exports = api;