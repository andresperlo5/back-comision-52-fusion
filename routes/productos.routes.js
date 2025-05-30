const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
} = require("../controllers/productos.controllers");
const authMiddleware = require("../middlewars/auth.middleware");
const router = express.Router();

router.get("/", authMiddleware("usuario"), obtenerTodosLosProductos);
router.get("/:id", obtenerUnProductoPorID);
router.post("/", crearNuevoProducto);
router.put("/:id", actualizarProductoPorID);
router.delete("/:id", eliminarUnProductoPorId);

module.exports = router;
