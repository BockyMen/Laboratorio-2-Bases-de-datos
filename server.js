const express = require('express');
const mainRoutes = require('./routes/main.routes');

const api = express();
const port = 5000; 

api.use(express.json()); 
api.use("/main", mainRoutes)

//Inicializar API a escuchar peticiones
api.listen(port, ()=>{
  console.log("Server Running in http://localhost:5000");
});