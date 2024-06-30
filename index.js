// Función para filtrar las entradas
function filterEntries() {
    const searchValue = document.getElementById('search').value.trim();
    const storedData = JSON.parse(localStorage.getItem('data') || '[]');
    const filteredData = storedData.filter((entry) => entry.includes(searchValue));
    updateResults(filteredData);
}

// Función para eliminar todas las entradas
function deleteAllEntries() {
    localStorage.removeItem('data');
    updateResults([]);
}

// Función para mostrar errores
function showError(message) {
    const errorMessageDiv = document.getElementById('error-message');
    errorMessageDiv.textContent = message;
    errorMessageDiv.style.display = 'block';
    setTimeout(() => {
        errorMessageDiv.style.display = 'none';
    }, 3000);
}

// Agregamos eventos a los nuevos elementos
document.getElementById('search').addEventListener('input', filterEntries);
document.getElementById('clear').addEventListener('click', () => {
    document.getElementById('search').value = '';
    filterEntries();
});
document.getElementById('delete-all').addEventListener('click', deleteAllEntries);

// Modificamos la función handleButtonClick para mostrar errores
function handleButtonClick(event) {
    event.preventDefault(); // Previene el reinicio de la página
    const inputValue = document.getElementById('entrada').value.trim();
    if (inputValue === '') {
        showError('Por favor, ingrese un valor válido');
        return;
    }
    // Recuperar datos almacenados
    const storedData = JSON.parse(localStorage.getItem('data') || '[]');
    storedData.push(inputValue);
    localStorage.setItem('data', JSON.stringify(storedData));
    updateResults(storedData);
    document.getElementById('entrada').value = ''; // Limpiar la entrada después de enviar
}

// Modificamos la función updateResults para mostrar los errores
function updateResults(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    if (data.length === 0) {
        resultsDiv.textContent = 'No hay entradas';
    } else {
        data.forEach((entry) => {
            const paragraph = document.createElement('p');
            paragraph.textContent = entry;
            resultsDiv.appendChild(paragraph);
        });
    }
}

// Capturar evento de clic en el botón de enviar
document.getElementById('boton').addEventListener('click', handleButtonClick);

// Actualizar resultados al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const storedData = JSON.parse(localStorage.getItem('data') || '[]');
    updateResults(storedData);
});


