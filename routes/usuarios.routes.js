const { Router } = require("express");
const {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  crearNuevoUsuario,
  iniciarSesion,
} = require("../controllers/usuarios.controllers");
const router = Router();

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUnUsuarioPorId);

router.post("/", crearNuevoUsuario);
router.post("/login", iniciarSesion);

module.exports = router;
