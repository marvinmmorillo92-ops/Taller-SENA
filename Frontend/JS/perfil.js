document.addEventListener("DOMContentLoaded", () => {

    //leer el usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {alert ("No has iniciado sesión. Redirigiendo al login...");
    window.location.href = "./login.html"; return; }   // me regresa para hacer el login

// Mostrar datos del usuario en el perfil
document.getElementById("nombreUsuario").textContent = usuario.nombres || "N/A";
document.getElementById("correoUsuario").textContent = usuario.correo || "N/A";
document.getElementById("ciudadUsuario").textContent = usuario.ciudad || "N/A";
document.getElementById("direccionUsuario").textContent = usuario.direccion || "N/A";


// Mostrar carrito de compras
const API_BASE= "http://localhost:4000/api";

// Formatear fecha
function formatearFecha(fecha) {
  if (!fecha) return "Sin fecha";
  const d = new Date(fecha);
  return d.toLocaleString("es-CO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}


// Funcion para llenar tabla carrito
function llenarTabla(idTabla, datos, columnas) {
  const tbody = document.getElementById(idTabla);
  tbody.innerHTML = ""; // Limpiar tabla

  if (!datos || datos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="${columnas}" class="text-center">No hay registros</td></tr>`;
    return;
  }

  datos.forEach((fila) => {
    const tr = document.createElement("tr");
    tr.innerHTML =
  columnas === 2
    ? `<td>${fila.producto}</td><td>${fila.cantidad}</td>`
    : `<td>${fila.producto}</td><td>${fila.cantidad}</td><td>${formatearFecha(fila.fecha)}</td>`;

    tbody.appendChild(tr);
  });
}


// Cargar carrito pendiente
async function cargarCarritoPendiente(idUsuario) {
  try {
    const resp = await fetch(`${API_BASE}/detalle_carrito`);
    const data = await resp.json();

    // Filtrar productos del carrito del usuario
    const pendientes = data.filter((d) => d.usuario === usuario.nombres);
    llenarTabla("tablaCarritoPendiente", pendientes, 2);
  } catch (err) {
    console.error("Error al cargar carrito:", err);
  }
}

// Cargar historial de compras (si tuvieras una tabla de compras)
async function cargarHistorial(idUsuario) {
  try {
    const resp = await fetch(`${API_BASE}/detalle_carrito`);
    const data = await resp.json();

    // Simulamos historial (carritos antiguos)
    const historial = data.filter((d) => d.usuario === usuario.nombres && d.fecha);
    llenarTabla("tablaHistorial", historial, 3);
  } catch (err) {
    console.error("Error al cargar historial:", err);
  }
}

//llamada a las funciones
cargarCarritoPendiente(usuario.id_usuario);
cargarHistorial(usuario.id_usuario);


// Manejar cierre de sesión
document.getElementById("btnLogout").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "./login.html";

});


//manejar edicion de perfil


// Mostrar formulario con datos actuales
document.getElementById("btnEditar").addEventListener("click", () => {
  document.getElementById("formEditarPerfil").style.display = "block";
  document.getElementById("btnEditar").style.display = "none";

  // Llenar campos con la info actual del usuario
  document.getElementById("nombreEditar").value = usuario.nombres;
  document.getElementById("correoEditar").value = usuario.correo;
  document.getElementById("ciudadEditar").value = usuario.ciudad;
  document.getElementById("direccionEditar").value = usuario.direccion;
});

// Cancelar edición
document.getElementById("btnCancelar").addEventListener("click", () => {
  document.getElementById("formEditarPerfil").style.display = "none";
  document.getElementById("btnEditar").style.display = "block";
});

// Guardar cambios
document.getElementById("formEditarPerfil").addEventListener("submit", async (e) => {
  e.preventDefault();

  const datosActualizados = {
    nombres: document.getElementById("nombreEditar").value,
    correo: document.getElementById("correoEditar").value,
    contrasena: document.getElementById("contrasenaEditar").value || "",
    ciudad: document.getElementById("ciudadEditar").value,
    direccion: document.getElementById("direccionEditar").value
  };

  try {
    const resp = await fetch(`${API_BASE}/usuarios/documento/${usuario.documento}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datosActualizados)
    });

    if (!resp.ok) throw new Error("Error al actualizar los datos");

    alert("Perfil actualizado correctamente");

    // Actualizar datos guardados en localStorage
    const actualizado = { ...usuario, ...datosActualizados };
delete actualizado.contrasena; // nunca guardar contraseña
localStorage.setItem("usuario", JSON.stringify(actualizado));


    // Refrescar la página o actualizar campos mostrados
    location.reload();

  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al actualizar tu perfil intenta de nuevo");
  }
});

});