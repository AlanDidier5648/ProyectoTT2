let array = [];

function generateSortedArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    // Generar un array ordenado de valores aleatorios
    array = [];
    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 200) + 50; // Valores entre 50 y 250
        array.push(value);
    }

    array.sort((a, b) => a - b); // Ordenar el array

    // Crear círculos de visualización junto con los números
    array.forEach(value => {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container');

        const circle = document.createElement('div');
        circle.classList.add('array-circle');
        circle.innerText = value;

        circleContainer.appendChild(circle);
        container.appendChild(circleContainer);
    });
}

async function binarySearch() {
    const searchValue = parseInt(document.getElementById('search-value').value);
    const circles = document.getElementsByClassName('array-circle');
    
    if (isNaN(searchValue)) {
        alert("Por favor, introduce un número válido.");
        return;
    }

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Resaltar el elemento medio que se está comparando
        circles[mid].style.backgroundColor = 'yellow';

        await new Promise(resolve => setTimeout(resolve, 300)); // Pausa para visualización

        if (array[mid] === searchValue) {
            // Si encontramos el valor, resaltamos el círculo en verde
            circles[mid].style.backgroundColor = 'green';
            alert(`¡Valor ${searchValue} encontrado en el índice ${mid}!`);
            return;
        } else if (array[mid] < searchValue) {
            // Descartar la mitad izquierda
            for (let i = left; i <= mid; i++) {
                circles[i].style.backgroundColor = '#3498db'; // Restaurar color
            }
            left = mid + 1;
        } else {
            // Descartar la mitad derecha
            for (let i = mid; i <= right; i++) {
                circles[i].style.backgroundColor = '#3498db'; // Restaurar color
            }
            right = mid - 1;
        }
    }

    // Si el valor no se encuentra
    alert(`Valor ${searchValue} no encontrado en el array.`);
}
