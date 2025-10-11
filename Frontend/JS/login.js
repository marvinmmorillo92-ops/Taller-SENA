document.addEventListener('DOMContentLoaded', () => {

const form = document.getElementById("formLogin");
const API_URL = "http://localhost:4000/api/auth/login";

function showAlert(message, type = "danger") {
    const existing = document.getElementById('login.alert');
    if (existing) existing.remove();

    const div = document.createElement('div');
}


});