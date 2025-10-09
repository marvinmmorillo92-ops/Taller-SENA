document.addEventListener("DomContentLoaded", () =>{

const formRegistro = document.getElementById("formRegistro");
const API_URL = "http://localhost:4000/api/usuarios";

// Función para mostra mensaje de alerta
function showAlert(message, type = "info") {
    const existing = document.getElementById("formAlert");
    if (existing) existing.remove();

    const div = document.createElement("div");
    div.id = "formAlert";
    div.className = `alert alert-${type} mt-3`;
    div.role = "alert";
    div.textContent = message;
    form.prepend(div);

    setTimeout(() => {
       if (div.parentNode) div.remove();
    }, 5000);
}


});