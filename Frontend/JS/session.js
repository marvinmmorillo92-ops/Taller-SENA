// JS/session.js
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreSesion = document.getElementById("nombreSesion");
const cerrarSesionHeader = document.getElementById("cerrarSesionHeader");

  if (usuario && nombreSesion) {
    // Mostrar saludo o nombre corto
     const primerNombre = usuario.nombres.split(" ")[0];
    nombreSesion.textContent = `Hola, ${primerNombre.toUpperCase()}`;
  } else if (nombreSesion) {

    nombreSesion.textContent = "Iniciar sesión";

  }
// Cerrar sesión desd e el header
if (cerrarSesionHeader){

    cerrarSesionHeader.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("usuario");

        //Detecta ruta actual

        let loginPath = "./HTML/login.html";
if (window.location.pathname.includes("/HTML/")) {
loginPath = "../HTML/login.html";

}

Window.location.herf = loginPath;

    });
}

// Forzar login si no hay usuario en localStorage
const paginasProtegidas = ["/HTML/perfil.html", "/HTML/carrito.html"];
const paginaActual = window.location.pathname.split("/").pop();

if (!usuario && paginasProtegidas.includes(paginaActual)) {
    alert("Debes iniciar sesion, Redirigiendo al login...");
    const loginPath = window.location.pathname.includes("/HTML/") ? "./login.html" : "./HTML/login.html";
    
    loginPath = "../login.html";
    window.location.href = loginPath;    
}



});
