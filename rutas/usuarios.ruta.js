"use strict"

var express = require("express");

var ControladorUsuarios = require("../controladores/usuarios.controlador.js");

var api = express.Router();

var md_aut = require("../token/aut.js");

api.get("/probando-controlador-usuarios",md_aut.autenticacion, ControladorUsuarios.pruebaUsuarios);

api.post("/crear-usuarios", ControladorUsuarios.crearUsuarios);

api.post("/login", ControladorUsuarios.ingresoUsuario);

api.put("/actualizar-usuario/:id", md_aut.autenticacion, ControladorUsuarios.actualizarUsuario);

module.exports = api;