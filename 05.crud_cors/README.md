# Ejercicio: Login, CRUD y CORS (Express + Frontend simple)
- Objetivo del ejercicio
- Que el alumnado entienda de forma práctica:
- Cómo se comunica un frontend con un backend
- Qué es una petición HTTP
- Para qué sirven las cabeceras (headers)
- Cómo funciona CORS
- Cómo probar una API con Postman

⚠️ No es un sistema de seguridad real, es un ejercicio didáctico.

## Flujo básico de la aplicación

1. El usuario entra en login.html
2. Envía usuario y contraseña (POST /login)
3. El backend valida las credenciales
4. Si son correctas:
    - El frontend guarda los datos en localStorage
    - Se redirige a index.html
5. Las rutas protegidas requieren headers personalizados
6. El backend valida los headers con un middleware 

## CORS (muy importante)

El frontend y el backend están en orígenes distintos.

Para permitir la comunicación, el backend configura CORS:

```js
app.use(cors({
  origin: 'http://127.0.0.1:5501',
  allowedHeaders: ['Content-Type', 'x-user', 'x-pass'],
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
```

### Qué explicar aquí

- El navegador bloquea peticiones si CORS no está bien
- Las cabeceras personalizadas provocan un preflight OPTIONS
- Postman no usa CORS

## Endpoints principales

`POST /login`
- Envía usuario y contraseña en el body
- Devuelve 200 si es correcto, 401 si no

`GET /datos (protegido)`

- Devuelve todos los datos
- Requiere headers x-user y x-pass

`POST /buscar (protegido)`

- Busca por nombre
- Envía el valor a buscar en el body

`POST /datos (protegido)`

- Crea un nuevo dato
- Valida campos obligatorios

`PUT /datos/:id (protegido)`

- Modifica un dato existente

`DELETE /datos/:id (protegido)`

- Elimina un dato

## Uso de Postman

Postman se usa para:

1. Probar el backend sin frontend

2. Ver claramente:
    - Método HTTP
    - Headers
    - Body
    - Código de estado
