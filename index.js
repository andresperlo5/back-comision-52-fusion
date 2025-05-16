const express = require("express");
const app = express();

//middlewares
app.use(express.json());

//rutas
//http://localhost:3001/productos / 
app.use("/productos", require("./routes/productos.routes"));
//http://localhost:3001/usuarios / 
app.use("/usuarios", require("./routes/usuarios.routes"));

app.listen(3001, () => {
  console.log("Servidor andando en el puerto: ", 3001);
});

//CRUD Usuarios
