// pruebas.test.js
/* const request = require("supertest");
const app = require("./app.js");

describe("Productos API", () => {

  test("GET /api/productos debe devolver lista de productos", async () => {
    const res = await request(app).get("/api/productos");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("POST /api/productos debe crear un producto", async () => {
    const nuevo = {
      nombre: "Prueba Producto",
      precio: 9999,
      stock: 10
    };

    const res = await request(app)
      .post("/api/productos")
      .send(nuevo);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id_producto");
    expect(res.body.nombre).toBe(nuevo.nombre);
  });

});*/


/* const request = require("supertest");
const app = require("./app.js");

describe("Pruebas Carrito", () => {
 
  //Crear carrito (POST)
 
  test("Debe crear un carrito", async () => {
    const nuevo = {
      id_usuario: 1 
    };

    const res = await request(app).post("/api/carrito").send(nuevo);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id_carrito");
  });

   // Listar carritos (GET)
  
  test("Debe listar los carritos", async () => {
    const res = await request(app).get("/api/carrito");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
  
  //Actualizar carrito (PUT)
  
  test("Debe actualizar un carrito existente", async () => {
    
    const creado = await request(app)
      .post("/api/carrito")
      .send({ id_usuario: 1 });

    const idCarrito = creado.body.id_carrito;

    const res = await request(app)
      .put(`/api/carrito/${idCarrito}`)
      .send({ id_usuario: 15 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
  
  //Eliminar carrito (DELETE)
  
  test("Debe eliminar un carrito existente", async () => {
   
    const creado = await request(app)
      .post("/api/carrito")
      .send({ id_usuario: 1 });

    const idCarrito = creado.body.id_carrito;

    const res = await request(app).delete(`/api/carrito/${idCarrito}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
}); */

/* const request = require("supertest");
const app = require("./app.js");

describe("Pruebas DETALLE_CARRITO", () => {

  // Crear detalle
  test("debe crear un detalle correctamente", async () => {
    const data = {
      id_carrito: 3,
      id_producto: 3,
      cantidad: 3
    };
    const res = await request(app)
      .post("/api/detalle_carrito")
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id_detalle");
    expect(res.body.cantidad).toBe(data.cantidad);
  });
  // Listar detalle
  test("Debe listar los detalles del carrito", async () => {
    const res = await request(app).get("/api/detalle_carrito");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Actualizar detalle
  test("Debe actualizar la cantidad", async () => {
    const res = await request(app)
      .put("/api/detalle_carrito/3")
      .send({ cantidad: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
  // Eliminar detalle
  test("Debe eliminar un detalle", async () => {
    const res = await request(app).delete("/api/detalle_carrito/14");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });

});  

const request = require("supertest");
const app = require("./app.js");

describe("Pruebas para Administradores", () => {

   // Crear un administrador
  test("Crear administrador (POST /api/administradores)", async () => {
    const nuevoAdmin = {
      nombre: "Paula Perez",
      correo: "GolosaTet@example.com",
      contrasena: "10933456"
    };

   const res = await request(app)
      .post("/api/administradores")
      .send(nuevoAdmin);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id_admin");
    expect(res.body.nombre).toBe(nuevoAdmin.nombre);
  });

  // Obtener todos
  test("Listar administradores (GET /api/administradores)", async () => {
    const res = await request(app).get("/api/administradores");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Obtener uno por ID
  test("Obtener administrador por ID (GET /api/administradores/:id)", async () => {
    const resLista = await request(app).get("/api/administradores");
    const id = resLista.body[0]?.id_admin;

    const res = await request(app).get(`/api/administradores/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id_admin");
  }); 

  // Actualizar administrador
  test("Debe actualizar administrador", async () => {
    const res = await request(app)
      .put("/api/administradores/7")
      .send({ nombre: "Administrador actualized", correo: "Actualized@gmail.com", contrasena: "933123" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje");
  });

  // Eliminar administrador
  test("Eliminar administrador (DELETE /api/administradores/:id)", async () => {
    const lista = await request(app).get("/api/administradores");
    const id = lista.body[0]?.id_admin;

    const res = await request(app).delete("/api/administradores/9");

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje"); 
  });
});
*/


const request = require("supertest");
const app = require("./app.js");

describe("Pruebas del módulo Login", () => {

  test("Login exitoso (POST /api/login)", async () => {
    const usuarioValido = {
      correo: "maro9@gmail.com",
      contrasena: "123456"
    };

    const res = await request(app)
      .post("/api/login")
      .send(usuarioValido);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("mensaje", "Inicio de sesión exitoso");
    expect(res.body).toHaveProperty("usuario");
  });

  test("Error por contraseña incorrecta", async () => {
    const usuario = {
      correo: "maro9@gmail.com",
      contrasena: "111111"
    };

    const res = await request(app)
      .post("/api/login")
      .send(usuario);

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });

  test("Usuario no existe", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({
        correo: "noexiste@example.com",
        contrasena: "12345"
      });

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty("error");
  });

});
