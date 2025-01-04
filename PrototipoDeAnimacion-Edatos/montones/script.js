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

    const emptyBox = Array.from(arrayContainer.children).find((box) => box.textContent === '-');

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
    drawTree(arrayValues); // Redibujar el árbol

    // Animar el nuevo nodo en el árbol
    animateNewNode(index);

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


function searchInTree() {
    const searchValueInput = document.getElementById('search-value');
    const value = parseInt(searchValueInput.value);

    if (isNaN(value)) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un número válido.',
        });
        return;
    }

    const index = arrayValues.indexOf(value);

    const svg = d3.select("#tree-svg");
    const nodes = svg.selectAll("circle");
    const lines = svg.selectAll("line");

    let currentNode = 1; // Comenzamos en el índice 1 (raíz del montículo)
    const searchPath = [];

    // Crear el recorrido en el árbol
    while (currentNode < arrayValues.length && arrayValues[currentNode] !== null) {
        searchPath.push(currentNode);

        if (arrayValues[currentNode] === value) break;

        const leftChild = currentNode * 2;
        const rightChild = currentNode * 2 + 1;

        // Decidir hacia dónde ir en la búsqueda
        currentNode = leftChild < arrayValues.length && arrayValues[leftChild] !== null ? leftChild : rightChild;
    }

    // Animar el recorrido por el árbol
    let delay = 0;

    searchPath.forEach((nodeIndex, i) => {
        const isLast = i === searchPath.length - 1;

        setTimeout(() => {
            // Resaltar el nodo actual
            nodes.transition()
                .duration(500)
                .attr("fill", (d, idx) => (idx + 1 === nodeIndex ? (isLast && arrayValues[nodeIndex] === value ? "#ffc107" : "#90caf9") : "#4caf50"));

            // Resaltar las conexiones (si no es el último nodo)
            if (!isLast) {
                lines.transition()
                    .duration(500)
                    .attr("stroke", (d, idx) => (idx === nodeIndex - 1 ? "#90caf9" : "#ccc"));
            }

            // Al finalizar la búsqueda
            if (isLast) {
                setTimeout(() => {
                    if (arrayValues[nodeIndex] === value) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Valor Encontrado',
                            text: `El valor ${value} se encuentra en el índice ${nodeIndex}.`,
                        });
                    } else {
                        Swal.fire({
                            icon: 'warning',
                            title: 'No Encontrado',
                            text: `El valor ${value} no existe en el montículo.`,
                        });
                    }
                }, 500);
            }
        }, delay);

        delay += 1000; // Incrementar el delay para cada paso
    });

    searchValueInput.value = '';
}


function animateNewNode(nodeIndex) {
    const svg = d3.select("#tree-svg");

    // Animar el nodo recién agregado
    svg.selectAll("circle")
        .filter((d, i) => i + 1 === nodeIndex)
        .attr("r", 0) // Comienza invisible
        .transition()
        .duration(500)
        .attr("r", 20) // Aparece con el tamaño normal
        .attr("fill", "#4caf50"); // Verde estándar

    // Animar el texto del nodo
    svg.selectAll("text")
        .filter((d, i) => i + 1 === nodeIndex)
        .attr("opacity", 0) // Comienza invisible
        .transition()
        .duration(500)
        .attr("opacity", 1); // Aparece completamente visible
}
