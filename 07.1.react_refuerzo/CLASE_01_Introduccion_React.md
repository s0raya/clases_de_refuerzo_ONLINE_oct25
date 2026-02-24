# Clase 1: Introducción a React

Material de refuerzo para bootcamp — primera toma de contacto con React.

---

## 1. ¿Qué es React?

**React** es una **librería de JavaScript** para construir interfaces de usuario (UIs). Creada por Meta (Facebook), se usa para:

- Crear **páginas web interactivas** (SPAs, dashboards, apps)
- Dividir la interfaz en **piezas reutilizables** llamadas **componentes**
- Actualizar solo lo que cambia en pantalla (DOM virtual)

**No es un framework completo**: no incluye rutas, estado global ni HTTP. Se centra en “la vista” y se combina con otras herramientas (Vite, React Router, etc.).

---

## 2. Conceptos que vamos a ver hoy

| Concepto   | En una frase                                      |
|-----------|----------------------------------------------------|
| Componente | Función (o clase) que devuelve lo que se pinta    |
| JSX       | HTML dentro de JavaScript                          |
| Props     | Datos que pasas de un componente a otro (solo lectura) |
| Estado    | Datos que cambian con el tiempo (useState)        |

---

## 3. Cómo está montado este proyecto (Vite + React)

```
07.1.react_refuerzo/
├── index.html          → Página única; dentro hay <div id="root"></div>
├── src/
│   ├── main.jsx        → Punto de entrada: “engancha” React al div#root
│   ├── App.jsx         → Componente principal (donde empezamos a programar)
│   ├── App.css         → Estilos del App
│   └── index.css       → Estilos globales
└── package.json        → Dependencias (react, react-dom, vite)
```

**Flujo:**  
`index.html` carga `main.jsx` → `main.jsx` hace `createRoot(...).render(<App />)` → React pinta `App` dentro de `#root`.

Comando para desarrollar:

```bash
npm run dev
```

---

## 4. Tu primer componente

Un componente en React es una **función** que **devuelve JSX** (parecido a HTML).

Ejemplo mínimo:

```jsx
function Saludo() {
  return <h1>Hola, bootcamp</h1>
}

export default Saludo
```

- El nombre del componente va en **PascalCase**.
- Lo que devuelve se escribe en **JSX**: etiquetas como en HTML, pero dentro de `.jsx`.
- `className` en lugar de `class`, y otras reglas de JSX que veremos.

---

## 5. JSX en 60 segundos

- Escribes **HTML** dentro de JavaScript.
- **Una sola raíz**: si devuelves varias etiquetas, envuélvelas en un padre, por ejemplo `<div>...</div>` o `<></>` (fragmento).
- **Atributos:** `class` → `className`, `for` → `htmlFor`.
- **JavaScript dentro de JSX:** usa `{ }`.

```jsx
const nombre = "Alumnos"
return (
  <div>
    <h1>Hola, {nombre}</h1>
    <p>2 + 2 = {2 + 2}</p>
  </div>
)
```

---

## 6. Props: pasar datos a un componente

Las **props** son argumentos que recibe un componente. Son **solo lectura**.

```jsx
function TarjetaUsuario({ nombre, rol }) {
  return (
    <div className="tarjeta">
      <h3>{nombre}</h3>
      <p>{rol}</p>
    </div>
  )
}

// Uso:
<TarjetaUsuario nombre="Ana" rol="Estudiante" />
<TarjetaUsuario nombre="Luis" rol="Profesor" />
```

El componente no modifica `nombre` ni `rol`; solo los muestra.

---

## 7. Estado: datos que cambian (useState)

Cuando algo **cambia con el tiempo** (clicks, formularios, listas), usamos **estado**.

```jsx
import { useState } from 'react'

function Contador() {
  const [numero, setNumero] = useState(0)  // valor inicial 0

  return (
    <div>
      <p>Has hecho click {numero} veces</p>
      <button onClick={() => setNumero(numero + 1)}>Sumar</button>
    </div>
  )
}
```

- `useState(0)` devuelve: `[valorActual, funciónParaCambiarlo]`.
- Solo se debe cambiar el estado con `setNumero` (nunca `numero = ...`).
- Al llamar a `setNumero`, React **vuelve a pintar** el componente con el nuevo valor.

En tu proyecto, `App.jsx` ya tiene un ejemplo así con el contador.

---

## 8. Recorrido rápido por tu App.jsx

En `src/App.jsx` tienes algo parecido a esto:

```jsx
import { useState } from 'react'
// ...

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* ... logos ... */}
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}
```

- `count` es el estado (número de clicks).
- `setCount` lo actualiza; al hacer click, se suma 1.
- `{count}` en el JSX muestra el valor actual.

---

## 9. Ejercicios en clase (hazlos en App.jsx)

### Ejercicio 1: Mensaje con variable

- Crea una variable `mensaje = "Bienvenidos a React"` y muéstrala dentro de un `<h1>`.

### Ejercicio 2: Componente reutilizable

- Crea un componente `Saludo` que reciba la prop `nombre` y muestre `Hola, {nombre}`.
- En `App`, usa `<Saludo nombre="tu nombre" />` al menos dos veces con nombres distintos.

### Ejercicio 3: Pequeño contador

- Ya tienes un contador; modifícalo para que tenga también un botón “Restar” que reste 1 al estado.

### Ejercicio 4 (opcional): Contador con límite

- Que el contador no baje de 0 ni suba de 10 (deshabilitar o no hacer nada si ya está en el límite).

---

## 10. Resumen

- **React** = librería para construir la UI con **componentes**.
- **Componente** = función que devuelve **JSX**.
- **JSX** = “HTML” en JavaScript; una raíz, `className`, y `{ }` para expresiones.
- **Props** = datos que pasas a un componente (solo lectura).
- **Estado** = datos que cambian; se usa `useState` y la función setter para actualizar.

En la siguiente clase se pueden ver: más hooks (`useEffect`), listas y keys, y formularios controlados.

---

## Enlaces útiles

- [React (documentación oficial)](https://react.dev)
- [Aprender React – Guía paso a paso](https://react.dev/learn)
