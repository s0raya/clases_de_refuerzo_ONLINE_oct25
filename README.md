# clases_de_refuerzo_ONLINE_oct25

- Creamos la estructura HTML
- En la carpeta img están los siguientes elementos: favicon, imagen del body, el logo del header, el icono de hamburguesa y las flechas de cada elemento del navbar.
- Explicar que la flecha de los elementos del navbar ha sido extraida de la web de 'flaticon', para que sepan que se pueden descargar iconos, nosotros lo hemos descargado como png y después se añade con la pseudoclase ::after. Pero hay otras maneras de insertar iconos como por ejemplo añadiendo en el `<head>` del html la URL y así cogemos el icono directamente desde la web. Ejemplo:

```html
    <html>
    <head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    </head>
    <body>
        <i class="fa-solid fa-arrow-right"></i>
    </body>
    </html>
```

- Incluimos las fuente de 'Poppins' de Google fonts, explicamos cómo realizarlo.
- Trabajamos con el HTML
- Hay que crear los dos menús para ocultar uno u otro dependiendo del tamaño de pantalla.
- Vamos a las css reseteándolas primero.
- Para añadir las flechas del menú es con la pseudoclase ::after