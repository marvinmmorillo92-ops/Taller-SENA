// JS/session.js
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreSesion = document.getElementById("nombreSesion");
  const cerrarSesionHeader = document.getElementById("cerrarSesionHeader");
  const verPerfilHeader = document.getElementById("verPerfilHeader");

  // ============================================================
  // Detectar ruta actual y si estamos dentro de /HTML/
  // ============================================================
  const paginaActual = window.location.pathname.split("/").pop().toLowerCase();
  const enCarpetaHTML = window.location.pathname.includes("/HTML/");

  // ============================================================
  // Evitar que el script actúe en páginas públicas
  // ============================================================
  // No debe actuar ni redirigir en estas páginas:
  const paginasPublicas = ["login.html", "index.html", ""];
  if (paginasPublicas.includes(paginaActual)) return;

  // ============================================================
  // Mostrar nombre del usuario o texto "Iniciar sesión"
  // ============================================================
  if (usuario && nombreSesion) {
    const primerNombre = usuario.nombres.split(" ")[0];
    nombreSesion.textContent = `Hola, ${primerNombre.toUpperCase()}`;
    nombreSesion.style.cursor = "default";
  } else if (nombreSesion) {
    nombreSesion.textContent = "Iniciar sesión";
    nombreSesion.style.cursor = "pointer";

    // Si no hay usuario, permitir clic para ir al login
    nombreSesion.addEventListener("click", () => {
      const loginPath = enCarpetaHTML ? "./login.html" : "./HTML/login.html";
      window.location.href = loginPath;
    });
  }

  // ============================================================
  // Ver perfil desde el header
  // ============================================================
  if (verPerfilHeader) {
    verPerfilHeader.addEventListener("click", (e) => {
      e.preventDefault();
      const perfilPath = enCarpetaHTML ? "./perfil.html" : "./HTML/perfil.html";
      window.location.href = perfilPath;
    });
  }

  // ============================================================
  // Cerrar sesión desde el header
  // ============================================================
  if (cerrarSesionHeader) {
    cerrarSesionHeader.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");
      const loginPath = enCarpetaHTML ? "./login.html" : "./HTML/login.html";
      window.location.href = loginPath;
    });
  }

  // ============================================================
  // Bloquear acceso a páginas protegidas
  // ============================================================
  const paginasProtegidas = ["perfil.html", "carrito.html"];

  if (!usuario && paginasProtegidas.includes(paginaActual)) {
    alert("Debes iniciar sesión para acceder a esta página.");
    const loginPath = enCarpetaHTML ? "./login.html" : "./HTML/login.html";
    window.location.href = loginPath;
  }
});
