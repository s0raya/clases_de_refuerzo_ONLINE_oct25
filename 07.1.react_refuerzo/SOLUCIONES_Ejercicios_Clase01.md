# Soluciones sugeridas — Ejercicios Clase 1

Referencia para el profesor. Los alumnos pueden intentar primero por su cuenta.

---

## Ejercicio 1: Mensaje con variable

```jsx
function App() {
  const mensaje = "Bienvenidos a React"
  return <h1>{mensaje}</h1>
}
```

---

## Ejercicio 2: Componente Saludo con props

```jsx
function Saludo({ nombre }) {
  return <p>Hola, {nombre}</p>
}

function App() {
  return (
    <>
      <Saludo nombre="Ana" />
      <Saludo nombre="Luis" />
    </>
  )
}
```

---

## Ejercicio 3: Contador con Sumar y Restar

```jsx
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Sumar</button>
      <button onClick={() => setCount(count - 1)}>Restar</button>
    </div>
  )
}
```

---

## Ejercicio 4: Contador con límite 0–10

```jsx
function App() {
  const [count, setCount] = useState(0)

  const sumar = () => {
    if (count < 10) setCount(count + 1)
  }

  const restar = () => {
    if (count > 0) setCount(count - 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={sumar} disabled={count >= 10}>Sumar</button>
      <button onClick={restar} disabled={count <= 0}>Restar</button>
    </div>
  )
}
```

---

## Estilos en React

**1. CSS global**  
Ya lo usas: `import './index.css'` o `import './App.css'` en el componente. Las reglas afectan a toda la app; usa clases específicas para no pisar otros componentes.

**2. Módulos CSS (recomendado para componentes)**  
El archivo se llama `Componente.module.css`. Las clases son locales al componente.

```css
/* Card.module.css */
.contenedor {
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}
.titulo {
  font-size: 1.25rem;
  color: #333;
}
```

```jsx
// Card.jsx
import styles from './Card.module.css'

function Card({ titulo, children }) {
  return (
    <div className={styles.contenedor}>
      <h2 className={styles.titulo}>{titulo}</h2>
      {children}
    </div>
  )
}
```

**3. Estilos en línea (objeto con camelCase)**  
Útil para valores dinámicos.

```jsx
const estilo = {
  padding: '12px',
  backgroundColor: isActive ? '#4CAF50' : '#eee',
  borderRadius: '8px',
}
return <div style={estilo}>Contenido</div>
```

**4. Librerías (opcional)**  
Para diseño rápido: **Tailwind CSS**, **Styled Components**, **Emotion**, **Material UI**, etc. En bootcamp suele bastar con CSS global + módulos CSS.

---

