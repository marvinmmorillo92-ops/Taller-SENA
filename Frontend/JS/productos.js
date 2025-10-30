document.addEventListener("DOMContentLoaded", async () => {
  const API_BASE = "http://localhost:4000/api";
  const contenedor = document.getElementById("contenedorProductos");
  const formBuscar = document.getElementById("formBuscar");
  const inputBuscar = document.getElementById("inputBuscar");


 // Renderizar productos
  function mostrarProductos(productos) {
    contenedor.innerHTML = "";
    if (productos.length === 0) {
      contenedor.innerHTML = `<p class="text-center text-muted mt-3">No se encontraron productos</p>`;
      return;
    }

    productos.forEach((p) => {
      const col = document.createElement("div");
      col.classList.add("col-md-3");

      col.innerHTML = `
        <div class="card mb-3">
          <img src="../assets/img/${obtenerNombreImagen(p.nombre)}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="precio">$${Number(p.precio).toLocaleString("es-CO")}</p>
            <div class="d-flex justify-content-center align-items-center mb-2">
              <button class="btn btn-danger w-100" data-id="${p.id_producto}" data-nombre="${p.nombre}">Agregar</button>
              <input type="number" class="form-control form-control-sm mx-2 cantidadInput text-center" value="1" min="1" style="width:60px;">
            </div>
          </div>
        </div>
      `;

      contenedor.appendChild(col);
    });
  }
 

  // Cargar todos los productos
 async function cargarProductos(filtro = "") {
  let url = `${API_BASE}/productos`;
  if (filtro) url += `?filtro=${encodeURIComponent(filtro)}`;
  const resp = await fetch(url);
  const data = await resp.json();
  mostrarProductos(data);
  inicializarCarrito(); // activa los botones “Agregar”
}


  // Evento del buscador
  formBuscar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const texto = inputBuscar.value.trim();
    await cargarProductos(texto);
  });
  

  try {
    //  Obtener productos desde la base de datos
    const resp = await fetch(`${API_BASE}/productos`);
    const productos = await resp.json();

    //Generar tarjetas dinámicamente
    productos.forEach((p) => {
      const col = document.createElement("div");
      col.classList.add("col-md-3");

      col.innerHTML = `
        <div class="card mb-3">
          <img src="../assets/img/${obtenerNombreImagen(p.nombre)}" class="card-img-top" alt="${p.nombre}">
          <div class="card-body">
            <h5 class="card-title">${p.nombre}</h5>
            <p class="precio">$${Number(p.precio).toLocaleString("es-CO")}</p>
            <div class="d-flex justify-content-center align-items-center mb-2">
              <button class="btn btn-danger w-100" data-id="${p.id_producto}" data-nombre="${p.nombre}">Agregar</button>
              <input type="number" class="form-control form-control-sm mx-2 cantidadInput text-center" value="1" min="1" style="width:60px;">
            </div>
          </div>
        </div>
      `;

      contenedor.appendChild(col);
    });

    //Agregar funcionalidad de “Agregar al carrito”
    inicializarCarrito();

  } catch (error) {
    console.error("Error al cargar productos:", error);
  }

  //Intenta adivinar el nombre del archivo de imagen a partir del nombre del producto
  function obtenerNombreImagen(nombre) {
    const base = nombre.toLowerCase().replace(/\s+/g, "");
    return `${base}.png`;
  }

  //  Funcion para manejar el carrito
  function inicializarCarrito() {
    const botonesAgregar = document.querySelectorAll(".btn-danger[data-id]");

    botonesAgregar.forEach((boton) => {
      boton.addEventListener("click", () => {
        const card = boton.closest(".card-body");
        const inputCantidad = card.querySelector(".cantidadInput");
        const cantidad = parseInt(inputCantidad.value);
        const nombre = boton.getAttribute("data-nombre");
        const idProducto = boton.getAttribute("data-id");
        const precioTexto = card.querySelector(".precio").textContent.replace(/[^\d]/g, "");
        const precio = parseFloat(precioTexto);

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
      });
    });
  }



});
