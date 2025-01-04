document.getElementById('array-size').addEventListener('input', () => {
    const arraySizeInput = document.getElementById('array-size');
    const arraySize = parseInt(arraySizeInput.value);

    // Validar que el tamaño sea un número entre 1 y 30
    if (isNaN(arraySize) || arraySize < 1 || arraySize > 30) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un tamaño válido entre 1 y 30.',
        });

        // Limpiar el contenedor del array y los índices si el tamaño es inválido
        document.getElementById('array-container').innerHTML = '';
        document.getElementById('array-indexes').innerHTML = '';
        return;
    }

    // Limpiar los contenedores
    const arrayContainer = document.getElementById('array-container');
    const arrayIndexes = document.getElementById('array-indexes');
    arrayContainer.innerHTML = '';
    arrayIndexes.innerHTML = '';

    // Generar casillas y animarlas
    for (let i = 0; i < arraySize; i++) {
        // Crear la casilla del array
        const arrayBox = document.createElement('div');
        arrayBox.className = 'array-box';
        arrayBox.textContent = '-'; // Placeholder para los valores
        arrayContainer.appendChild(arrayBox);

        // Crear el índice correspondiente
        const index = document.createElement('div');
        index.textContent = `[${i}]`;
        index.className = 'array-index';
        arrayIndexes.appendChild(index);
    }

    // Animar las casillas emergentes
    anime({
        targets: '.array-box, .array-index',
        opacity: [0, 1],
        scale: [0, 1],
        easing: 'easeOutBack',
        duration: 800,
        delay: anime.stagger(40), // Retraso entre cada elemento
    });
});


let arrayValues = [];

function addValueToArray() {
    const arrayValueInput = document.getElementById('array-value');
    const value = parseInt(arrayValueInput.value);
    const arrayContainer = document.getElementById('array-container');

    // Validar el valor ingresado
    if (isNaN(value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un número válido.',
        });
        return;
    }

    // Buscar la primera casilla disponible
    const emptyBox = Array.from(arrayContainer.children).find(box => box.textContent === '-');

    if (!emptyBox) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite Alcanzado',
            text: 'Todas las casillas del array están ocupadas.',
        });
        return;
    }

    // Insertar el valor en la casilla disponible
    emptyBox.textContent = value;
    arrayValues.push(value);

    // Animar la casilla al agregar el valor
    anime({
        targets: emptyBox,
        backgroundColor: ['#fff', '#d1ffd8'],
        duration: 500,
        easing: 'easeOutQuad',
    });

    // Limpiar el input
    arrayValueInput.value = '';
}