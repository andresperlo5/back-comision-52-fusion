const express = require("express");
const {
  obtenerTodosLosProductos,
  obtenerUnProductoPorID,
  crearNuevoProducto,
  actualizarProductoPorID,
  eliminarUnProductoPorId,
  crearEditarImagen,
  cambiarEstadoProducto,
} = require("../controllers/productos.controllers");
const authMiddleware = require("../middlewars/auth.middleware");
const multerMiddlewars = require("../middlewars/multer.middlewars");
const router = express.Router();

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerUnProductoPorID);
router.post("/", crearNuevoProducto);
router.put(
  "/addEditImage/:idProducto",
  multerMiddlewars.single("imagen"),
  crearEditarImagen
);
router.put("/changeState/:idProducto", cambiarEstadoProducto);
router.put("/:id", actualizarProductoPorID);
router.delete("/:id", eliminarUnProductoPorId);

module.exports = router;
