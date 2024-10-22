let array = [];

function generateArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    // Generar un array con valores aleatorios
    array = [];
    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 200) + 50; // Valores entre 50 y 250
        array.push(value);
    }

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

async function linearSearch() {
    const searchValue = parseInt(document.getElementById('search-value').value);
    const circles = document.getElementsByClassName('array-circle');
    
    if (isNaN(searchValue)) {
        alert("Por favor, introduce un número válido.");
        return;
    }

    for (let i = 0; i < array.length; i++) {
        // Resaltar el círculo que estamos comparando
        circles[i].style.backgroundColor = 'yellow';

        await new Promise(resolve => setTimeout(resolve, 300)); // Pausa para visualización

        if (array[i] === searchValue) {
            // Si encontramos el valor, resaltamos el círculo en verde
            circles[i].style.backgroundColor = 'green';
            alert(`¡Valor ${searchValue} encontrado en el índice ${i}!`);
            return;
        } else {
            // Si no coincide, restauramos el color
            circles[i].style.backgroundColor = '#3498db';
        }
    }

    // Si el valor no se encuentra
    alert(`Valor ${searchValue} no encontrado en el array.`);
}
