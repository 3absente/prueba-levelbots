"use strict"
// Utilizar orden "use strict" para poder meter instrucciones estándares de javascript

//Librería Mongodb

var mongoose = require("mongoose");

//modulo express

var app = require("./app");
var port = process.env.PORT || 1234;

//conexión a base de datos

mongoose.connect("mongodb://localhost:27017/mongodb", (error, respuesta)=>{
	if(error){
		throw error;
	}else{
		console.log("La conexión a la base de datos es correcta");
		app.listen(port, function(){
			console.log("Servidor del ApiRest en http://localhost:"+port);
		})
	}
})

