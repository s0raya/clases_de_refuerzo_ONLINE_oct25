# 🐉 Dragon Ball Characters App

## 🚀 Descripción del Proyecto

Esta aplicación permite visualizar personajes de Dragon Ball obtenidos desde la DragonBall API, además de buscar, paginar y guardar personajes en una lista de favoritos.
El objetivo es trabajar conceptos fundamentales de JavaScript, como DOM, fetch, eventos, filtrados y localStorage, aplicados en una pequeña SPA.

## 🎯 Funcionalidades

### ✅ 1. Listado dinámico de personajes

- Los personajes se obtienen desde la API pública mediante fetch.
- Renderizado automático en pantalla.

### ✅ 2. Paginación

- Botones Siguiente y Anterior conectados a las URLs proporcionadas por la API.
- La aplicación actualiza las URLs de paginación en cada consulta.

### ✅ 3. Buscador en tiempo real

- Filtrado de personajes en la vista principal mediante el parámetro name.
- Si el campo queda vacío, se recarga la lista completa.

### ✅ 4. Sistema de favoritos

- Cualquier personaje puede añadirse/eliminarse con un clic.
- Los favoritos se almacenan en localStorage para persistencia.
- Existe un buscador independiente para filtrar únicamente los favoritos.

### ✅ 5. Renderizado reutilizable

La función renderCharFavs() se utiliza para:

- Listado principal
- Listado de favoritos
- Filtrados por búsqueda

## 🛠️ Tecnologías Utilizadas

- **HTML5**
-- **CSS3**
-- **JavaScript**
-- **Fetch API**
-- **LocalStorage**
-- **DragonBall API**