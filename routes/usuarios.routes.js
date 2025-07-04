const { Router } = require("express");
const {
  obtenerTodosLosUsuarios,
  obtenerUnUsuarioPorId,
  crearNuevoUsuario,
  iniciarSesion,
  recuperarContraseniaUsuario,
  cambioDeContraseniaUsuarioToken,
} = require("../controllers/usuarios.controllers");
const router = Router();
const { check } = require("express-validator");

router.get("/", obtenerTodosLosUsuarios);
router.get(
  "/:id",
  [check("id", "ERROR: Formato de ID no corresponde a MongoDB").isMongoId()],
  obtenerUnUsuarioPorId
);

router.post(
  "/",
  [
    check("nombreUsuario", "Campo NOMBRE Vacio").notEmpty(),
    check("emailUsuario", "Formato Incorrecto").isEmail(),
    check(
      "contrasenia",
      "ERROR: Debe tener un minimo de 8 caracteres"
    ).isLength({ min: 8 }),
  ],
  crearNuevoUsuario
);
router.post("/login", iniciarSesion);
router.post("/recoveryPassEmail", recuperarContraseniaUsuario);
router.post("/changeNewPassUser", cambioDeContraseniaUsuarioToken);

module.exports = router;
