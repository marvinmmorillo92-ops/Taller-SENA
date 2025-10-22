document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE = "http://localhost:4000/api";
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const tbody = document.querySelector("tbody");
  const btnPagar = document.querySelector(".btn-pagar");

  if (!usuario) {
    alert("Debes iniciar sesión para ver tu carrito");
    window.location.href = "./login.html";
    return;
  }

  // Renderiasar los productos del carrito //
  function renderizarCarrito() {
    tbody.innerHTML = "";

    if (carrito.length === 0) {
      tbody.innerHTML = `
        <tr><td colspan="4" class="text-center">Tu carrito está vacío</td></tr> `;
      return;
    }

    carrito.forEach((item, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>$${(item.precio * item.cantidad).toLocaleString("es-CO")}</td>
        <td>
          <button class="btn btn-sm btn-danger" data-index="${index}">X</button>
        </td>  `;
      tbody.appendChild(fila);
    });

    // Fila total //
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    const filaTotal = document.createElement("tr");
    filaTotal.innerHTML = `
      <td colspan="2" class="fw-bold">PRECIO TOTAL</td>
      <td colspan="2" class="fw-bold">$${total.toLocaleString("es-CO")}</td>`;
    tbody.appendChild(filaTotal);
  }

  renderizarCarrito();

  //  Eliminar producto //
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-danger")) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderizarCarrito();
    }
  });

  // Pagar carrito //
  btnPagar.addEventListener("click", async () => {
    if (carrito.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    try {
      // Crear un nuevo carrito en la BD //
      const respCarrito = await fetch(`${API_BASE}/carrito`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: usuario.id_usuario }),
      });

      const nuevoCarrito = await respCarrito.json();

      // Insertar cada producto //
      for (const item of carrito) {
        await fetch(`${API_BASE}/detalle_carrito`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id_carrito: nuevoCarrito.id_carrito,
            id_producto: item.id_producto,
            cantidad: item.cantidad,
          }),
        });
      }

      alert("Compra registrada correctamente");
      localStorage.removeItem("carrito");
      location.reload();

    } catch (error) {
      console.error("Error al pagar:", error);
      alert("Ocurrio un error al procesar el pago");
    }
  });
});
