// JS/session.js
document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const nombreSesion = document.getElementById("nombreSesion");
  const cerrarSesionHeader = document.getElementById("cerrarSesionHeader");

  // Obtener nombre del archivo actual (ej: index.html, perfil.html)
  const paginaActual = window.location.pathname.split("/").pop().toLowerCase();

  // Evitar que el script actúe en login.html (para no causar redirecciones infinitas)
  if (paginaActual === "login.html") return;

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
      const loginPath = window.location.pathname.includes("/HTML/")
        ? "./login.html"
        : "./HTML/login.html";
      window.location.href = loginPath;
    });
  }

  // ============================================================
  // Cerrar sesión desde el header
  // ============================================================
  if (cerrarSesionHeader) {
    cerrarSesionHeader.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuario");

      const loginPath = window.location.pathname.includes("/HTML/")
        ? "./login.html"
        : "./HTML/login.html";

      window.location.href = loginPath;
    });
  }

  // ============================================================
  // Bloquear acceso a páginas protegidas
  // ============================================================
  const paginasProtegidas = ["perfil.html", "carrito.html"];
  if (!usuario && paginasProtegidas.includes(paginaActual)) {
    alert("Debes iniciar sesión para acceder a esta página.");
    const loginPath = window.location.pathname.includes("/HTML/")
      ? "./login.html"
      : "./HTML/login.html";
    window.location.href = loginPath;
  }
});
