document.addEventListener("DOMContentLoaded", () => {

  // Si ya hay un usuario guardado, saltar el login
  const usuarioGuardado = localStorage.getItem("usuario");
  if (usuarioGuardado) {
    window.location.href = "./perfil.html";
    return;
  }
  const form = document.getElementById("formLogin"); // Referencia el formulario
  const API_URL = "http://localhost:4000/api/login"; // URL del endpoint de login

  // Función para mostrar alertas


  function showAlert(message, type = "danger") {
    const existing = document.getElementById("loginAlert");
    if (existing) existing.remove();

    const div = document.createElement("div");
    div.id = "loginAlert";
    div.className = `alert alert-${type} mt-3`;
    div.role = "alert";
    div.textContent = message;
    form.prepend(div);

    setTimeout(() => div.remove(), 4000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("correo").value.trim();
    const contrasena = document.getElementById("contrasena").value.trim();

    if (!correo || !contrasena) {
      return showAlert("Por favor, complete toda la información");
    }

    try {
      const resp = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const json = await resp.json();

      if (!resp.ok) {
        return showAlert(json.error || "Error al iniciar sesión");
      }

      //  Guardar usuario en localStorage
      localStorage.setItem("usuario", JSON.stringify(json.usuario));
      showAlert("Inicio de sesión exitoso, redirigiendo...", "success");

      // Redirigir al perfil del usuario
      setTimeout(() => {
        window.location.href = "./perfil.html"; }, 1500);
    } catch (error) {console.error("Error en login:", error);
      showAlert("Error en la conexión con el servidor.");
    }
  });
});
