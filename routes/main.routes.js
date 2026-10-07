const express = require('express');
const router = express.Router(); //Se necesita un router -> Objeto que conecta las rutas
const DaoGame = require('./../dao/game');

//http://127.0.0.1:5000/
router.get("/",DaoGame.getAll);
router.post("/",DaoGame.create);
router.get("/:id",DaoGame.getById);

router.get("/test", (req, res)=>{
  res.send("<h2>Algo X</h2><br><h3>Funciona porfavor</h3>"+"<button>Presiona</button>");
});

module.exports = router;