document.addEventListener("DOMContentLoaded", () => {

    //leer el usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {alert ("No has iniciado sesión. Redirigiendo al login.");
    window.location.href = "./perfil.html"; return; }   // me regresa al perfil para hacer el login

// Mostrar datos del usuario en el perfil
document.getElementById("nombreUsuario").textContent = usuario.nombre || "N/A";
document.getElementById("correoUsuario").textContent = usuario.correo || "N/A";
document.getElementById("telefonoUsuario").textContent = usuario.telefono || "N/A";
document.getElementById("ciudadUsuario").textContent = usuario.ciudad || "N/A";
document.getElementById("direccionUsuario").textContent = usuario.direccion || "N/A";

// Manejar cierre de sesión
document.getElementById("btnCerrarSesion").addEventListener("click", () => {
    localStorage.removeItem("usuario");
    window.location.href = "./index.html";

});
});