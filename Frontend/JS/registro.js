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

from.addEventListener("submit", async (e) =>{
e.preventDefault();


// Obtener los valores de los campos del formulario
const nombre = document.getElementById("inputAddress").value.trim();
const documento = document.getElementById("inputDocumentoID").value.trim();
const correo = document.getElementById("inputEmail4").value.trim();
const contrasena = document.getElementById("inputPassword4").value;
const ciudad = document.getElementById("inputCiudad").value.trim();
const direccion = document.getElementById("inputDireccion").value.trim();
const acepta = document.getElementById("gridCheck")
?document.getElementById("gridCheck").checked
:true;

// Validar que todos los campos obligatorios estén llenos

if (!nombre || !documento || !correo || !contrasena || !ciudad || !direccion) {
return showAlert("Por favor, complete todos los campos obligatorios.", "warning");
}

const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailregex.test(correo)) return showAlert("Por favor, ingrese un correo electrónico válido.", "warning");
if (contrasena.length < 6) return showAlert("La contraseña debe tener al menos 6 caracteres.", "warning");
if (!acepta) return showAlert("Debe aceptar los términos y condiciones.", "warning");

const submitBtn = form.querySelector("button[type='submit']");
const originaltext = submitBtn ? submitBtn.textContent : null;
if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando...";
}




});

});