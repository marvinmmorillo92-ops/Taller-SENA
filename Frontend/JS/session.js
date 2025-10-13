// JS/session.js
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreSesion = document.getElementById("nombreSesion");

  if (usuario && nombreSesion) {
    // Mostrar saludo o nombre corto
    const primerNombre = usuario.nombres.split(" ")[0];
    nombreSesion.textContent = `Hola, ${primerNombre}`;
  }
});
