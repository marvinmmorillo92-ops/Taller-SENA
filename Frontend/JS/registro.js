document.addEventListener("DOMContentLoaded", () => {

const form = document.getElementById("formRegistro");
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

form.addEventListener("submit", async (e) =>{
e.preventDefault();


// Obtener los valores de los campos del formulario
const nombres = document.getElementById("inputAddress").value.trim();
const documento = document.getElementById("inputDocumentoID").value.trim();
const correo = document.getElementById("inputEmail4").value.trim();
const contrasena = document.getElementById("inputPassword4").value;
const ciudad = document.getElementById("inputCiudad").value.trim();
const direccion = document.getElementById("inputDireccion").value.trim()
?document.getElementById("gridCheck").checked
:true;

// Validar que todos los campos obligatorios estén llenos

if (!nombres || !documento || !correo || !contrasena || !ciudad || !direccion) {
return showAlert("Por favor, complete todos los campos obligatorios.", "warning");
}

const emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailregex.test(correo)) return showAlert("Por favor, ingrese un correo electrónico válido.", "warning");
if (contrasena.length < 6) return showAlert("La contraseña debe tener al menos 6 caracteres.", "warning");


const submitBtn = form.querySelector("button[type='submit']");
const originaltext = submitBtn ? submitBtn.textContent : null;
if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "Registrando...";
}

try {
    const resp = await fetch(API_URL, {
        method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({nombres, documento, correo, contrasena, ciudad, direccion}),
    });

    const json = await resp.json();

    if (!resp.ok) {
        const msg = json.error || json.message || "Error en el registro";
        showAlert(msg, "danger");
      } else {
        showAlert("Registro exitoso. Bienvenido/a " + (json.nombres || "") + "!", "success");
        form.reset();

        //Redirigir al perfil del usuario
       // window.location.href = "./perfil.html";

      }
}
catch (error) {
    console.error("Error en la solicitud:", error);
    showAlert("Error en la solicitud. Por favor, intente nuevamente más tarde.", "danger");
}
finally {
    if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originaltext;
    }
}


});

});