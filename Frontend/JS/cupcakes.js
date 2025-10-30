document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE = "http://localhost:4000/api";
  const contenedor = document.getElementById("contenedorProductos");

  try {
    const resp = await fetch(`${API_BASE}/productos?filtro=cupcake`);
    const productos = await resp.json();

    if (!productos.length) {
      contenedor.innerHTML = `<p class="text-center">No se encontro cupcakes disponible.</p>`;
      return;
    }

    productos.forEach((p) => {
      const div = document.createElement("div");
      div.className = "col-md-3";

      div.innerHTML = `
        <div class="card mb-3">
         <img src="../assets/img/${obtenerNombreImagen(p.nombre)}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p>$${parseInt(p.precio).toLocaleString("es-CO")}</p>
            <div class="d-flex justify-content-center align-items-center mb-2">
              <button class="btn btn-danger w-100" data-id="${p.id_producto}" data-nombre="${p.nombre}" data-precio="${p.precio}">Agregar</button>
              <input type="number" class="form-control form-control-sm mx-2 cantidadInput text-center" value="1" min="1" style="width:60px;">
            </div>
          </div>
        </div>
      `;

      contenedor.appendChild(div);
    });

function obtenerNombreImagen(nombre) {
    const base = nombre.toLowerCase().replace(/\s+/g, "");
    return `${base}.png`;
  }
    // funcion para agregar al carrito
    contenedor.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-danger")) {
        const boton = e.target;
        const card = boton.closest(".card-body");
        const cantidadInput = card.querySelector(".cantidadInput");
        const cantidad = parseInt(cantidadInput.value);
        const nombre = boton.dataset.nombre;
        const idProducto = boton.dataset.id;
        const precio = parseFloat(boton.dataset.precio);

        if (!cantidad || cantidad <= 0) {
          alert("Por favor ingresa una cantidad válida.");
          return;
        }

        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const existente = carrito.find((item) => item.id_producto === idProducto);

        if (existente) {
          existente.cantidad += cantidad;
        } else {
          carrito.push({ id_producto: idProducto, nombre, cantidad, precio });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        boton.textContent = "Agregado";
        boton.disabled = true;
        setTimeout(() => {
          boton.textContent = "Agregar";
          boton.disabled = false;
        }, 1500);
      }
    });
  } catch (error) {
    console.error("Error al cargar los productos:", error);
    contenedor.innerHTML = `<p class="text-center text-danger">Error al cargar los productos.</p>`;
  }
});
