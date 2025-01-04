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
    for (let i = 0; i <= arraySize; i++) { // <= para incluir el índice [0]
        // Crear la casilla del array
        const arrayBox = document.createElement('div');
        arrayBox.className = 'array-box';

        // Asignar INF al índice [0]
        arrayBox.textContent = i === 0 ? 'INF' : '-'; // INF para [0], placeholder para otros
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

    // Reiniciar arrayValues con INF en el índice [0]
    arrayValues = Array(arraySize + 1).fill(null);
    arrayValues[0] = 'INF'; // INF asignado permanentemente al índice [0]
});


let arrayValues = [];

function addValueToArray() {
    const arrayValueInput = document.getElementById('array-value');
    const value = parseInt(arrayValueInput.value);
    const arrayContainer = document.getElementById('array-container');

    if (isNaN(value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un número válido.',
        });
        return;
    }

    const emptyBox = Array.from(arrayContainer.children).find((box, index) => index > 0 && box.textContent === '-');

    if (!emptyBox) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite Alcanzado',
            text: 'Todas las casillas del array están ocupadas.',
        });
        return;
    }

    const index = Array.from(arrayContainer.children).indexOf(emptyBox);
    emptyBox.textContent = value;
    arrayValues[index] = value;

    heapifyUp(arrayValues, index);
    drawTree(arrayValues); // Actualizar el árbol

    anime({
        targets: emptyBox,
        backgroundColor: ['#fff', '#d1ffd8'],
        duration: 500,
        easing: 'easeOutQuad',
    });

    arrayValueInput.value = '';
}

function heapifyUp(array, index) {
    let currentIndex = index;
    let parentIndex = Math.floor(currentIndex / 2); // Ajustamos para comenzar en [1]

    while (currentIndex > 1 && array[currentIndex] > array[parentIndex]) {
        // Intercambiar valores si el hijo es mayor que el padre
        [array[currentIndex], array[parentIndex]] = [array[parentIndex], array[currentIndex]];

        // Actualizar índices para continuar la comparación
        currentIndex = parentIndex;
        parentIndex = Math.floor(currentIndex / 2);
    }

    return array;
}


function addValueToArray() {
    const arrayValueInput = document.getElementById('array-value');
    const value = parseInt(arrayValueInput.value);
    const arrayContainer = document.getElementById('array-container');

    if (isNaN(value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un número válido.',
        });
        return;
    }

    const emptyBox = Array.from(arrayContainer.children).find(box => box.textContent === '-');

    if (!emptyBox) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite Alcanzado',
            text: 'Todas las casillas del array están ocupadas.',
        });
        return;
    }

    const index = Array.from(arrayContainer.children).indexOf(emptyBox);
    emptyBox.textContent = value;
    arrayValues[index] = value;

    heapifyUp(arrayValues, index);
    drawTree(arrayValues); // Actualizar el árbol

    anime({
        targets: emptyBox,
        backgroundColor: ['#fff', '#d1ffd8'],
        duration: 500,
        easing: 'easeOutQuad',
    });

    arrayValueInput.value = '';
}



function drawTree(array) {
    const svg = d3.select("#tree-svg");
    svg.selectAll("*").remove(); // Limpiar el árbol anterior

    const treeWidth = 600;
    const treeHeight = 400;

    const nodeRadius = 20;
    const levels = Math.ceil(Math.log2(array.length));

    // Ignorar el índice [0] al calcular posiciones
    const nodePositions = array.slice(1).map((_, index) => {
        const level = Math.floor(Math.log2(index + 1));
        const x = treeWidth / Math.pow(2, level + 1) * ((index - Math.pow(2, level) + 1) * 2 + 1);
        const y = (treeHeight / levels) * level + nodeRadius;
        return { x, y };
    });

    // Dibujar líneas (conexiones)
    array.slice(1).forEach((value, index) => {
        const leftChildIndex = 2 * (index + 1) - 1;
        const rightChildIndex = 2 * (index + 1);

        if (leftChildIndex < array.length - 1 && array[leftChildIndex + 1] !== null) {
            svg.append("line")
                .attr("x1", nodePositions[index].x)
                .attr("y1", nodePositions[index].y)
                .attr("x2", nodePositions[leftChildIndex].x)
                .attr("y2", nodePositions[leftChildIndex].y)
                .attr("stroke", "#ccc")
                .attr("stroke-width", 2);
        }

        if (rightChildIndex < array.length - 1 && array[rightChildIndex + 1] !== null) {
            svg.append("line")
                .attr("x1", nodePositions[index].x)
                .attr("y1", nodePositions[index].y)
                .attr("x2", nodePositions[rightChildIndex].x)
                .attr("y2", nodePositions[rightChildIndex].y)
                .attr("stroke", "#ccc")
                .attr("stroke-width", 2);
        }
    });

    // Dibujar nodos
    array.slice(1).forEach((value, index) => {
        if (value !== null) {
            svg.append("circle")
                .attr("cx", nodePositions[index].x)
                .attr("cy", nodePositions[index].y)
                .attr("r", nodeRadius)
                .attr("fill", "#4caf50");

            svg.append("text")
                .attr("x", nodePositions[index].x)
                .attr("y", nodePositions[index].y + 5)
                .attr("text-anchor", "middle")
                .attr("font-size", "12px")
                .attr("fill", "white")
                .text(value);
        }
    });
}

function clearTree() {
    // Limpiar el SVG del árbol
    const svg = document.getElementById('tree-svg');
    svg.innerHTML = '';

    // Reiniciar el array interno
    arrayValues = Array(arrayValues.length).fill(null);
    arrayValues[0] = 'INF'; // Reasignar INF al índice [0]

    // Limpiar el contenido del array visual
    const arrayContainer = document.getElementById('array-container');
    Array.from(arrayContainer.children).forEach((box, index) => {
        box.textContent = index === 0 ? 'INF' : '-';
    });

    // Mostrar un mensaje de éxito
    Swal.fire({
        icon: 'success',
        title: 'Árbol Limpiado',
        text: 'El árbol y el array han sido reiniciados.',
    });
}
