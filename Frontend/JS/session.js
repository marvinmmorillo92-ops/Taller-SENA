// JS/session.js
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreSesion = document.getElementById("nombreSesion");
const cerrarSesionHeader = document.getElementById("cerrarSesionBtn");

  if (usuario && nombreSesion) {
    // Mostrar saludo o nombre corto
    const primerNombre = usuario.nombres.split(" ")[0].tolowerCase();
    nombreSesion.textContent = `Hola, ${primerNombre.charAt(0).toUpperCase() + primerNombre.slice(1)}`;
  } else if (nombreSesion) {

    nombreSesion.textContent = "Iniciar sesión";

  }
// Cerrar sesión desd e el header
if (cerrarSesionHeader){

    cerrarSesionHeader.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario");
        window.location.href = "../HTML/login.html";
    });
}

});
