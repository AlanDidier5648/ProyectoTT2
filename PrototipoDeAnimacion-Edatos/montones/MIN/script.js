document.getElementById('array-size').addEventListener('input', () => {
    const arraySizeInput = document.getElementById('array-size');
    const arraySize = parseInt(arraySizeInput.value);

    if (isNaN(arraySize) || arraySize < 1 || arraySize > 30) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, ingresa un tamaño válido entre 1 y 30.',
        });

        document.getElementById('array-container').innerHTML = '';
        document.getElementById('array-indexes').innerHTML = '';
        return;
    }

    const arrayContainer = document.getElementById('array-container');
    const arrayIndexes = document.getElementById('array-indexes');
    arrayContainer.innerHTML = '';
    arrayIndexes.innerHTML = '';

    for (let i = 0; i <= arraySize; i++) {
        const arrayBox = document.createElement('div');
        arrayBox.className = 'array-box';
        arrayBox.textContent = i === 0 ? 'INF' : '-';
        arrayContainer.appendChild(arrayBox);

        const index = document.createElement('div');
        index.textContent = `[${i}]`;
        index.className = 'array-index';
        arrayIndexes.appendChild(index);
    }

    anime({
        targets: '.array-box, .array-index',
        opacity: [0, 1],
        scale: [0, 1],
        easing: 'easeOutBack',
        duration: 800,
        delay: anime.stagger(40),
    });

    arrayValues = Array(arraySize + 1).fill(null);
    arrayValues[0] = 'INF';
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

    heapifyUpMin(arrayValues, index);
    drawTree(arrayValues);
    animateNewNode(index);

    arrayValueInput.value = '';
}

function heapifyUpMin(array, index) {
    let currentIndex = index;
    let parentIndex = Math.floor(currentIndex / 2);

    while (currentIndex > 1 && array[currentIndex] < array[parentIndex]) {
        [array[currentIndex], array[parentIndex]] = [array[parentIndex], array[currentIndex]];
        currentIndex = parentIndex;
        parentIndex = Math.floor(currentIndex / 2);
    }

    return array;
}

function drawTree(array) {
    const svg = d3.select("#tree-svg");
    svg.selectAll("*").remove();

    const treeWidth = 600;
    const treeHeight = 400;

    const nodeRadius = 20;
    const levels = Math.ceil(Math.log2(array.length));

    const nodePositions = array.slice(1).map((_, index) => {
        const level = Math.floor(Math.log2(index + 1));
        const x = treeWidth / Math.pow(2, level + 1) * ((index - Math.pow(2, level) + 1) * 2 + 1);
        const y = (treeHeight / levels) * level + nodeRadius;
        return { x, y };
    });

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
    const svg = document.getElementById('tree-svg');
    svg.innerHTML = '';
    arrayValues = Array(arrayValues.length).fill(null);
    arrayValues[0] = 'INF';

    const arrayContainer = document.getElementById('array-container');
    Array.from(arrayContainer.children).forEach((box, index) => {
        box.textContent = index === 0 ? 'INF' : '-';
    });

    Swal.fire({
        icon: 'success',
        title: 'Árbol Limpiado',
        text: 'El árbol y el array han sido reiniciados.',
    });
}

function animateNewNode(nodeIndex) {
    const svg = d3.select("#tree-svg");

    svg.selectAll("circle")
        .filter((d, i) => i + 1 === nodeIndex)
        .attr("r", 0)
        .transition()
        .duration(500)
        .attr("r", 20)
        .attr("fill", "#4caf50");

    svg.selectAll("text")
        .filter((d, i) => i + 1 === nodeIndex)
        .attr("opacity", 0)
        .transition()
        .duration(500)
        .attr("opacity", 1);
}


function removeNode() {
    const removeValueInput = document.getElementById('remove-value');
    const value = parseInt(removeValueInput.value);

    // Si no se especifica un valor, eliminamos la raíz
    const index = isNaN(value) ? 1 : arrayValues.indexOf(value);

    if (index === -1 || index >= arrayValues.length) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'El valor no existe en el montículo.',
        });
        return;
    }

    if (arrayValues.length <= 1) {
        Swal.fire({
            icon: 'warning',
            title: 'Montículo Vacío',
            text: 'No hay nodos para eliminar.',
        });
        return;
    }

    // Reemplazar el nodo eliminado con el último nodo
    const lastValue = arrayValues.pop(); // Quita el último elemento
    if (index < arrayValues.length) {
        arrayValues[index] = lastValue; // Coloca el último nodo en el lugar del eliminado
        heapifyDownMin(arrayValues, index, arrayValues.length - 1); // Reorganiza el montículo
    }

    drawTree(arrayValues); // Actualizar el árbol visualmente

    Swal.fire({
        icon: 'success',
        title: 'Nodo Eliminado',
        text: `El nodo con el valor ${value || arrayValues[1]} ha sido eliminado.`,
    });

    removeValueInput.value = ''; // Limpiar el input
}


function heapifyDownMin(array, index, size) {
    let smallest = index;
    const leftChild = 2 * index;
    const rightChild = 2 * index + 1;

    if (leftChild <= size && array[leftChild] < array[smallest]) {
        smallest = leftChild;
    }

    if (rightChild <= size && array[rightChild] < array[smallest]) {
        smallest = rightChild;
    }

    if (smallest !== index) {
        [array[index], array[smallest]] = [array[smallest], array[index]];
        heapifyDownMin(array, smallest, size);
    }
}
