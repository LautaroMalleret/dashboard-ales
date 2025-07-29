# 🧩 Dashboard Ales - Panel de administración de catálogo

Este proyecto es un **panel administrativo web** desarrollado con **React + TypeScript + Vite + TailwindCSS**, destinado a la gestión de productos para un catálogo de indumentaria. Está diseñado para ser utilizado por el dueño de un negocio, permitiéndole **visualizar, agregar, editar y eliminar productos**, así como filtrarlos de forma dinámica.

## 🚀 Funcionalidades principales

- 🔐 Inicio de sesión con autenticación JWT.
- 📦 Visualización de productos en una tabla interactiva.
- 🧮 Filtros dinámicos por tipo de producto, tipo de prenda y nombre.
- ➕ Agregar productos mediante un formulario modal.
- 📝 Editar productos existentes.
- ❌ Eliminar productos con confirmación.
- ☁️ Subida de imágenes a servicios externos (ej: ImgBB) para obtener URLs públicas.

## 🖼️ Vista previa

> 📸 Próximamente imágenes o gifs del dashboard en acción.

## 🛠️ Tecnologías utilizadas

Frontend:
- <b>React</b> + <b>Vite</b> + <b>TypeScript</b>
- <b>TailwindCSS</b> para estilos rápidos y responsivos
- <b>React Icons</b> y animaciones para una mejor UX

Backend (externo):
- <b>Node.js + Express</b> con API REST (no incluido en este repositorio)
- Base de datos: <b>MongoDB Atlas</b>


## 🔧 Cómo correr el proyecto

1. Cloná el repositorio:

```bash
git clone https://github.com/LautaroMalleret/dashboard-ales.git
cd dashboard-ales
```
2. Instalá las dependencias:

```bash
npm install
```
3. Creá un archivo .env con la siguiente variable:
```bash
VITE_API_URL=http://tudominio.api.com
```
4. Ejecutá el proyecto:
```bash
npm run dev
```

## ✅ Estado del proyecto
🚧 En desarrollo: El frontend está completamente funcional, pero puede seguir optimizándose en cuanto a validaciones, feedback visual y modularización del código.

## 📩 Contacto
Creado por Lautaro Malleret
📧 lautaromalleret@gmail.com
