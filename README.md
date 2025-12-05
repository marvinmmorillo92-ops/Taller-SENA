# 🍰 Dulzuras de Angelly

Un sistema web desarrollado para la gestión y venta de productos de repostería artesanal.  
Incluye módulos de autenticación de usuarios, gestión de carrito de compras, historial de pedidos y administración básica.  

---

## 🧁 Introducción

**Dulzuras de Angelly** es una aplicación web que permite a los usuarios visualizar productos de repostería, agregarlos al carrito, realizar compras y mantener un historial de pedidos.  
El proyecto fue creado con un enfoque educativo y práctico, utilizando tecnologías modernas en frontend y backend para simular un entorno de comercio electrónico real.

---

## 📜 Resumen

Este sistema está compuesto por:
- Un **frontend dinámico** que permite la interacción del usuario con los productos y su carrito.
- Un **backend RESTful** que gestiona usuarios, productos, carritos y detalle de compras.
- Una **base de datos relacional MySQL**, diseñada para garantizar integridad referencial y trazabilidad de las compras.

---

## 🧰 Tecnologías usadas

| Categoría | Tecnologías |
|------------|-------------|
| **Frontend** | HTML5, CSS3, JavaScript, Bootstrap 5 |
| **Backend** | Node.js, Express.js |
| **Base de Datos** | MySQL |
| **Herramientas adicionales** | dotenv, MySQL2, Visual Studio Code |

---

## 🧩 Estructura del proyecto

📦 Dulzuras-de-Angelly
├── 📁 Backend
│ ├── db.js # Configuración de conexión MySQL
│ ├── server.js # Servidor principal Node.js con Express
│ ├── .env # Variables de entorno
│ ├── 📄 dulzuras.sql # Script de estructura de la base de datos
│ ├── 📄 dulzuras_*.sql # Scripts específicos de tablas (productos, usuarios, etc.)
│ └── 📄 package.json # Dependencias del proyecto backend
│
├── 📁 Frontend
│ ├── 📁 assets # Imágenes y recursos gráficos
│ ├── 📁 CSS # Hojas de estilo personalizadas
│ ├── 📁 JS # Lógica del frontend (productos, carrito, sesión, etc.)
│ └── 📁 HTML # Páginas principales del sitio
│
└── README.md

---

## 🗄️ Descripción general de la base de datos

La base de datos **`dulzuras`** está compuesta por las siguientes tablas principales:

| Tabla | Descripción |
|--------|-------------|
| **usuarios** | Contiene la información personal de los usuarios registrados. |
| **productos** | Lista de productos disponibles para la venta, con nombre, precio y stock. |
| **carrito** | Representa un carrito activo o cerrado asociado a un usuario. |
| **detalle_carrito** | Registra los productos agregados a cada carrito, incluyendo cantidad y precio. |
| **opiniones** *(opcional)* | Permite almacenar comentarios o valoraciones de los usuarios. |

Las relaciones principales son:
- `usuarios (1) ── (N) carrito`
- `carrito (1) ── (N) detalle_carrito`
- `detalle_carrito (N) ── (1) productos`

Todas las claves foráneas están configuradas con **ON DELETE CASCADE** para mantener la integridad referencial.

---

## ⚙️ Instalación y configuración

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/tuusuario/Dulzuras-de-Angelly.git
cd Dulzuras-de-Angelly/Backend
2️⃣ Instalar dependencias
npm install
3️⃣ Configurar las variables de entorno

Crea un archivo .env dentro de la carpeta Backend con el siguiente contenido (ajusta según tu configuración local):

PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=dulzuras
4️⃣ Importar la base de datos

Importa el archivo dulzuras.sql en tu servidor MySQL (por ejemplo, desde MySQL Workbench o phpMyAdmin):

SOURCE C:/ruta/a/tu/proyecto/Backend/dulzuras.sql;
🚀 Iniciar el entorno

Ejecuta el servidor Node.js desde la carpeta Backend:

node server.js
Luego, abre tu navegador y accede a:

http://localhost:4000
💡 Notas finales

Asegúrate de tener el servicio de MySQL corriendo antes de iniciar el servidor.

El puerto por defecto del backend es 4000, pero puedes cambiarlo en el .env.

El proyecto fue diseñado con enfoque modular para facilitar su expansión futura (por ejemplo, agregar panel de administración o autenticación avanzada).

👨‍💻 Autor

Marvin Morillo
Proyecto académico de desarrollo web — 2025
