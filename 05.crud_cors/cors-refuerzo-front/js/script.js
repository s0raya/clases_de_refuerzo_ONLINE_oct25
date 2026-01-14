const API_URL = 'http://localhost:3000';
const searchForm = document.getElementById('searchForm');
const loadDataBtn = document.getElementById('loadDataBtn');
const loginForm = document.getElementById('loginForm');

// Función para leer credenciales desde el archivo credentials.json

let credentials = null;

async function getCredentials() {
    if (credentials) {
        return credentials;
    }
    
    try {
        const response = await fetch('credentials.json');
        if (response.ok) {
            credentials = await response.json();
            return credentials;
        }
    } catch (error) {
        console.error('Error al cargar credenciales:', error);
    }
    return null;
}

// Hay que comprobar que exista el formulario de login antes de añadir el event listener para que no de error en index.html
if(loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const user = document.getElementById('user').value;
        const pass = document.getElementById('pass').value;
        const errorMessage = document.getElementById('errorMessage');

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user, pass })
            })

            if(!response.ok) {
                errorMessage.textContent = 'Error de autenticación. Por favor, verifica tus credenciales.';
                return;
            }

            localStorage.setItem('user', user);
            localStorage.setItem('pass', pass);

            window.location.href = 'index.html';

        } catch (error) {
            console.error('Error al intentar iniciar sesión:', error);
        }
        
    });
}


// Comprobar que el botón de cargar datos existe antes de añadir el event listener para que no de error en login.html
if(loadDataBtn) {
    const user = localStorage.getItem('user');
    const pass = localStorage.getItem('pass');

    // Si no hay credenciales, redirigir al login
    if (!user || !pass) {
        window.location.href = 'login.html';
    }

    loadDataBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/datos`, {
                headers: {
                    /*
                        Cabeceras personalizadas.
                        Esto provoca un preflight OPTIONS
                        que debe ser aceptado por CORS.
                    */
                    'x-user': localStorage.getItem('user'),
                    'x-pass': localStorage.getItem('pass'),
                },
            });

            if (response.status === 401) {
                localStorage.clear();
                window.location.href = 'login.html';
                return;
            }

            const datos = await response.json();
            mostrarDatos(datos);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            document.getElementById('datosContainer').innerHTML = '<p>Error al cargar los datos</p>';
        }
    });
}

  
function mostrarDatos(datos) {
    const container = document.getElementById('datosContainer');

    if (datos.length > 0) {
        container.innerHTML = `
            <h2>Datos Cargados:</h2>
            <ul>
                ${datos.map(dato => `<li>${dato.nombre} ${dato.apellido}, ${dato.edad} años, ${dato.ciudad}</li>`).join('')}
            </ul>
        `;
    } else {
        container.innerHTML = '<p>No hay datos disponibles</p>';
    }
}
    
// Comprobar que el formulario de búsqueda existe antes de añadir el event listener para que no de error en login.html
if(searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const searchedValue = document.getElementById('searcher').value;
        const resultDiv = document.getElementById('result');
        
        try {
            const response = await fetch(`${API_URL}/buscar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user': localStorage.getItem('user'),
                    'x-pass': localStorage.getItem('pass'),
                },
                body: JSON.stringify({ searchedValue })
            });
            
            if (response.status === 401) {
                window.location.href = 'login.html';
                return;
            }
            
            const data = await response.json();
            
            if (data.existe) {
                resultDiv.innerHTML = `<p>${data.mensaje}</p><pre>${JSON.stringify(data.dato, null, 2)}</pre>`;
            } else {
                resultDiv.innerHTML = `<p>${data.mensaje}</p>`;
            }
        } catch (error) {
            resultDiv.innerHTML = '<p>Error al realizar la búsqueda</p>';
            console.error('Error:', error);
        }
    });
}


