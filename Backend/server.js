const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
app.use(express.json());
app.use(cors());


// ================= tabla usuarios ================== //
// Crear usuario
app.post("/api/usuarios", (req, res) => {
  const { nombres, documento, correo, contrasena, ciudad, direccion } = req.body;

  if (!nombres || !documento || !correo || !contrasena || !ciudad || !direccion) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  db.query("INSERT INTO usuarios (nombres, documento, correo, contrasena, ciudad, direccion) VALUES(?, ?, ?, ?, ?, ?)",
    [nombres, documento, correo, contrasena, ciudad, direccion], (err, resultado) => {
      if (err) {
        console.error("Error en INSERT:", err);
        return res.status(500).json({ error: "Error al insertar los datos en la tabla usuarios" });
      }

      res.json({id_usuario: resultado.insertId, nombres, documento, correo, contrasena, ciudad, direccion});
    }
  );
});

// Listar usuarios
app.get("/api/usuarios", (req, res) => {
  db.query("SELECT * FROM usuarios", (err, resultados) => {
    if (err) return res.status(500).json({ error: "Error en la base de datos" });
    res.json(resultados);
  });
});

// Eliminar usuario
app.delete("/api/usuarios/documento/:documento", (req, res) => {
  const { documento } = req.params;

  db.query("DELETE FROM usuarios WHERE documento = ?", [documento], (err, resultado) => {
    if (err) {
      console.error("Error en DELETE por documento:", err);
      return res.status(500).json({ error: "Error al eliminar el usuario" });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado con ese documento" });
    }

    res.json({ message: "Usuario eliminado correctamente por documento" });
  });
});

//Actualizar usuario
app.put("/api/usuarios/documento/:documento", (req, res) => {
  const { documento } = req.params;
  const { nombres, correo, contrasena, ciudad, direccion } = req.body;

  // Validar que venga al menos un dato
  if (!nombres && !correo && !contrasena && !ciudad && !direccion) {
    return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
  }

  db.query("UPDATE usuarios SET nombres = ?, correo = ?, contrasena = ?, ciudad = ?, direccion = ? WHERE documento = ?",
    [nombres, correo, contrasena, ciudad, direccion, documento], (err, resultado) => {
      if (err) {
        console.error("Error en el UPDATE:", err);
        return res.status(500).json({ error: "Error al actualizar el usuario" });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Usuario no encontrado con ese documento" });
      }

      res.json({ message: "Usuario actualizado correctamente" });
    }
  );
});

// ================= tabla productos ================== //

// Crear producto
app.post("/api/productos", (req, res) => {
  const { nombre, precio, stock} = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: "Nombre y precio son obligatorios" });
  }

  db.query("INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
    [nombre, precio, stock !== undefined ? stock : null], (err, resultado) => {
      if (err) {
        console.error("Error en el INSERT productos:", err);
        return res.status(500).json({ error: "Error al insertar el producto" });
      }

      res.json({id_producto: resultado.insertId, nombre, precio, stock: stock !== undefined ? stock : null});
    }
  );
});

// enlistar productos
app.get("/api/productos", (req, res) => {
  db.query("SELECT * FROM productos", (err, resultados) => {
    if (err) {
      console.error("Error en el SELECT productos:", err);
      return res.status(500).json({ error: "Error en la base de datos" });
    }
    res.json(resultados);
  });
});

// Actualizar producto por ID
app.put("/api/productos/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock } = req.body;

  if (!nombre && !precio && stock === undefined) {
    return res.status(400).json({ error: "Debe enviar al menos un campo para actualizar" });
  }

  db.query("UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id_producto = ?",
    [nombre, precio, stock, id],
    (err, resultado) => {
      if (err) {
        console.error("Error en UPDATE de productos:", err);
        return res.status(500).json({ error: "Error al actualizar el producto" });
      }

      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "producto no encontrado" });
      }

      res.json({ message: "Producto actualizado correctamente" });
    }
  );
});

// Eliminar producto por ID
app.delete("/api/productos/:id", (req, res) => {const { id } = req.params;

  db.query("DELETE FROM productos WHERE id_producto = ?", [id], (err, resultado) => {
    if (err) {
      console.error("Error en DELETE productos:", err);
      return res.status(500).json({ error: "error al eliminar el producto" });
    }

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "producto no encontrado" });
    }

    res.json({ message: "poducto eliminado corectamente" });
  });
});

// ================= carrito ================== //


app.post("/api/carrito", (req, res) => {
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ error: "El id_usuario es obligatorio" });
  }

  db.query(
    "INSERT INTO carrito (id_usuario) VALUES (?)",
    [id_usuario],
    (err, resultado) => {
      if (err) {console.error("Error en INSERT carrito:", err); return res.status(500).json({ error: "Error al crear el carrito" });
      }

      res.json({id_carrito: resultado.insertId, id_usuario});
    }
  );
  });

// Listar carritos (con usuario)
app.get("/api/carrito", (req, res) => {db.query(`SELECT c.id_carrito, u.nombres AS usuario, c.fecha FROM carrito c
     INNER JOIN usuarios u ON c.id_usuario = u.id_usuario`,
    (err, resultados) => {
      if (err) {
        console.error("Error en SELECT carrito:", err);
        return res.status(500).json({ error: "Error al obtener los carritos" });
      }
      res.json(resultados);
    }
  );
});

// actualizar carrito 
app.put("/api/carrito/:id", (req, res) => {
  const { id } = req.params;
  const { id_usuario } = req.body;

  if (!id_usuario) {
    return res.status(400).json({ error: "El id_usuario es obligatorio" });
  }

  db.query(
    "UPDATE carrito SET id_usuario=? WHERE id_carrito=?",
    [id_usuario, id], (err, resultado) => {
      if (err) {
        console.error("Error en UPDATE carrito:", err);
        return res.status(500).json({ error: "Error al actualizar el carrito" });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Carrito no encontrado" });
      }
      res.json({ message: "Carrito actualizado correctamente" });
    }
  );
});

// Eliminar carrito
app.delete("/api/carrito/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM carrito WHERE id_carrito = ?", [id], (err, resultado) => {
    if (err) {console.error("Error en DELETE carrito:", err);
      return res.status(500).json({ error: "Error al eliminar el carrito" });}
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }
    res.json({ message: "Carrito eliminado correctamente" });
  });
});

// ================= detalle carrito ================== //
// Crear detalle de carrito 

app.post("/api/detalle_carrito", (req, res) => {
  const { id_carrito, id_producto, cantidad } = req.body;

  if (!id_carrito || !id_producto || !cantidad) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  db.query("INSERT INTO detalle_carrito (id_carrito, id_producto, cantidad) VALUES (?, ?, ?)",
    [id_carrito, id_producto, cantidad], (err, resultado) => {
      if (err) {
        console.error("Error en INSERT detalle_carrito:", err);
        return res.status(500).json({ error: "Error al agregar producto al carrito" });
      }

      res.json({id_detalle: resultado.insertId, id_carrito, id_producto, cantidad});
    }
  );
});

// Listar productos de los carritos
app.get("/api/detalle_carrito", (req, res) => {
  db.query(
    `SELECT d.id_detalle, c.id_carrito, u.nombres AS usuario, p.nombre AS producto, d.cantidad
     FROM detalle_carrito d
     INNER JOIN carrito c ON d.id_carrito = c.id_carrito
     INNER JOIN usuarios u ON c.id_usuario = u.id_usuario
     INNER JOIN productos p ON d.id_producto = p.id_producto`,
    (err, resultados) => {
      if (err) {
        console.error("Error en SELECT detalle_carito:", err);
        return res.status(500).json({ error: "Error al obtener los detalles del carrito" });
      }
      res.json(resultados);
    }
  );
});

// Actualizar la cantidad de un producto en el carrito
app.put("/api/detalle_carrito/:id", (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;

  if (!cantidad) {
    return res.status(400).json({ error: "La cantidad es obligatoria" });
  }

  db.query("UPDATE detalle_carrito SET cantidad=? WHERE id_detalle=?",
    [cantidad, id], (err, resultado) => {
      if (err) {
        console.error("Error en el UPDATE detalle_carrito:", err);
        return res.status(500).json({ error: "Error en actualizar el detalle" });
      }
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Detalle no encontrado" });
      }
      res.json({ message: "El detalle ha sido actualizado correctamente" });
    }
  );
});

// Eliminar producto del carrito
app.delete("/api/detalle_carrito/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM detalle_carrito WHERE id_detalle=?", [id], (err, resultado) => {
    if (err) {
      console.error("Error en DELETE detalle_carrito:", err);
      return res.status(500).json({ error: "Error al eliminar el detalle" });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ error: "Detalle no encontrado" });
    }
    res.json({ message: "El detalle de carrito ha sido  eliminado correctamente" });
  });
});

// ================= administradores ================== //

// Crear administrador
app.post("/api/administradores", (req, res) => {
  const { nombre, correo, contrasena } = req.body;

  db.query("INSERT INTO administradores (nombre, correo, contrasena) VALUES (?, ?, ?)",
    [nombre, correo, contrasena], (err, resultado) => {
      if (err) {
        console.error("Error al crear nuevo administrador:", err);
        return res.status(500).json({ error: "Error al crear nuevo administrador" });
      }
      res.json({id_admin: resultado.insertId, nombre, correo});
    }
  );
});

// Obtener todos los administradores de la base de datos
app.get("/api/administradores", (req, res) => {
  db.query("SELECT id_admin, nombre, correo FROM administradores", (err, resultados) => {
    if (err) {
      console.error("Error SELECT al obtener datos de administradores:", err);
      return res.status(500).json({ error: "Error al obtener los datos de los administradores" });
    }
    res.json(resultados);
  });
});

// Obtener un administrador por ID
app.get("/api/administradores/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT id_admin, nombre, correo FROM administradores WHERE id_admin = ?", [id], (err, resultados) => {
    if (err) {
      console.error("Error SELECT al obtener administrador:", err);
      return res.status(500).json({ error: "Error al obtener administrador" });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ error: "Administrador no encontrado" });
    }
    res.json(resultados[0]);
  });
});

// Actualizar administrador por ID
app.put("/api/administradores/:id", (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contrasena } = req.body;

  db.query("UPDATE administradores SET nombre = ?, correo = ?, contrasena = ? WHERE id_admin = ?",
    [nombre, correo, contrasena, id], (err, resultado) => {
      if (err) {
        console.error("Error UPDATE al actualizar el administrador:", err);
        return res.status(500).json({ error: "Error al actualizar el administrador" });
      }
      res.json({ mensaje: "El administrador se ha actualizado correctamente" });
    }
  );
});

// Eliminar administrador por ID
app.delete("/api/administradores/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM administradores WHERE id_admin = ?", [id], (err, resultado) => {
    if (err) {
      console.error("Error DELET al eliminar el administrador:", err);
      return res.status(500).json({ error: "Error al eliminar el administrador" });
    }
    res.json({ mensaje: "Administrador ha sido eliminado correctamente" });
  });
});

// ================= Tabla opiniones ================== //

// crear opinion
app.post("/api/opiniones", (req, res) => {
  const { id_usuario, comentario } = req.body;

  db.query("INSERT INTO opiniones (id_usuario,comentario) VALUES (?, ?)",
    [id_usuario, comentario], (err, resultado) => {
      if (err) {
        console.error("Error al crear el comentario", err);
        return res.status(500).json({ error: "error al crear el comentario" });
      }
      res.json({id_opinion: resultado.insertId, id_usuario, comentario});
    }
  );
});

// Obtener todos los comentarios de la base de datos
app.get("/api/opiniones", (req, res) => {
  db.query("SELECT id_opinion, id_usuario, comentario FROM opiniones", (err, resultados) => {
    if (err) {
      console.error("Error SELECT al obtener las opiniones", err);
      return res.status(500).json({ error: "Error al obtener las opiniones" });
    }
    res.json(resultados);
  });
});

// Obtener opiniones por ID
app.get("/api/opiniones/:id", (req, res) => {
  const { id } = req.params;

  db.query("SELECT id_opinion, id_usuario, comentario FROM opiniones WHERE id_opinion = ?", [id], (err, resultados) => {
    if (err) {
      console.error("Error SELECT al obtener opinion", err);
      return res.status(500).json({ error: "Error al obtener la opinion" });
    }
    if (resultados.length === 0) {
      return res.status(404).json({ error: "Opinion no encontrada" });
    }
    res.json(resultados[0]);
  });
});


// Actualizar comentario por ID
app.put("/api/opiniones/:id", (req, res) => {
  const { id } = req.params;
  const { comentario } = req.body;

   db.query("UPDATE opiniones SET comentario = ? WHERE id_opinion = ?",
    [comentario, id], (err, resultado) => {
      if (err) {
        console.error("Error UPDATE al actualizar ", err);
        return res.status(500).json({ error: "Error al actualizar el comentario" });
      }
      res.json({ mensaje: "El comentario se ha actualizado correctamente" });
    }
  );
});

// Eliminar un comentario por ID
app.delete("/api/opiniones/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM opiniones WHERE id_opinion = ?", [id], (err, resultado) => {
    if (err) {
      console.error("Error DELET:", err);
      return res.status(500).json({ error: "Error al eliminar el comentario" });
    }
    res.json({ mensaje: "Comentario ha sido eliminado correctamente" });
  });
});

// Iniciar servidor
app.listen(4000, () => {
  console.log("El servidor está corriendo en http://localhost:4000");
});
