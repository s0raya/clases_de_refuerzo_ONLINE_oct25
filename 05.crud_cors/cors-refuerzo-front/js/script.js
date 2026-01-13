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

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Leer credenciales del archivo
    const fileCredentials = await getCredentials();
    
    // Verificar si las credenciales coinciden
    if (fileCredentials && user === fileCredentials.user && pass === fileCredentials.pass) {
        window.location.href = 'index.html';
    } else {
        errorMessage.textContent = 'El usuario o la contraseña no son correctas';
    }
});


loadDataBtn.addEventListener('click', async () => {
    const creds = await getCredentials();

    try {
        const response = await fetch(`${API_URL}/datos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds)
        });

        const datos = await response.json();
        mostrarDatos(datos);
    } catch (error) {
        console.error('Error al cargar datos:', error);
        document.getElementById('datosContainer').innerHTML = '<p>Error al cargar los datos</p>';
    }
});
  
function mostrarDatos(datos) {
    const container = document.getElementById('datosContainer');

    if (datos.length > 0) {
        let html = '<ul>';
        datos.forEach(dato => {
            html += `<li>${dato.nombre} ${dato.apellido}, ${dato.edad} años, ${dato.ciudad}</li>`;
        });
        html += '</ul>';
        container.innerHTML = html;
    } else {
        container.innerHTML = '<p>No hay datos disponibles</p>';
    }
}
    

searchForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const searchedValue = document.getElementById('searcher').value;
    const resultDiv = document.getElementById('result');
    const creds = await getCredentials();
    
    try {
        const response = await fetch(`${API_URL}/buscar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...creds, searchedValue })
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


