document.addEventListener("DOMContentLoaded", () => {
  const botonesAgregar = document.querySelectorAll(".btn-danger[data-id]");
  const API_BASE = "http://localhost:4000/api";

  // Cuando hagan clic en "Agregar" //
  botonesAgregar.forEach((boton) => {
    boton.addEventListener("click", () => {
      const card = boton.closest(".card-body");
      const inputCantidad = card.querySelector(".cantidadInput");
      const cantidad = parseInt(inputCantidad.value);
      const nombre = boton.getAttribute("data-nombre");
      const idProducto = boton.getAttribute("data-id");

      // Precio: lo tomamos del párrafo <p>$9.000</p>
      const precioTexto = card.querySelector("p").textContent.replace(/[^\d]/g, "");
      const precio = parseFloat(precioTexto);

      // Validaciones //
      if (!cantidad || cantidad <= 0) {
        alert("Por favor ingresa una cantidad válida.");
        return;
      }

      // Leer o crear el carrito en localStorage //
      const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      // Verificar si ya existe ese producto //
      const existente = carrito.find((item) => item.id_producto === idProducto);

      if (existente) {
        existente.cantidad += cantidad;
      } else {
        carrito.push({
          id_producto: idProducto,
          nombre,
          cantidad,
          precio,
        });
      }

      // Guardar carrito actualizado //
      localStorage.setItem("carrito", JSON.stringify(carrito));

      // Notificación visual //
      boton.textContent = "Agregado";
      boton.disabled = true;

      setTimeout(() => {
        boton.textContent = "Agregar";
        boton.disabled = false;
      }, 1500);
    });
  });
});
