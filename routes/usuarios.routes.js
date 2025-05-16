const { Router } = require("express");
const {
  obtenerTodosLosUsuarios,
} = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/", obtenerTodosLosUsuarios);

module.exports = router;
