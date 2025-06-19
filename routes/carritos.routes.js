const { Router } = require("express");
const {
  agregarProductosCarrito,
  eliminarProductoCarritioId,
  obtenerTodosLosProductosDelCarrito,
} = require("../controllers/carritos.controllers");
const authMiddleware = require("../middlewars/auth.middleware");
const router = Router();

router.get("/", authMiddleware("usuario"), obtenerTodosLosProductosDelCarrito);

router.put(
  "/agregarProducto/:idProducto",
  authMiddleware("usuario"),
  agregarProductosCarrito
);
router.put(
  "/eliminarProducto/:idProducto",
  authMiddleware("usuario"),
  eliminarProductoCarritioId
);

module.exports = router;
