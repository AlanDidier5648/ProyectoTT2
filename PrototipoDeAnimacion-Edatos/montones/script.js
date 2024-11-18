function generarMonticulo(tipo) {
    limpiarContenedor(); // Limpia cualquier visualización previa

    // Generar un array inicial aleatorio
    const array = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);

    // Convertir el array en un montículo
    if (tipo === 'max') {
        crearMaxHeap(array);
    } else if (tipo === 'min') {
        crearMinHeap(array);
    }

    // Dibujar el montículo
    dibujarMonticulo(array);
}

function limpiarContenedor() {
    d3.select("#monticulo-container").selectAll("*").remove();
}

function crearMaxHeap(array) {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapifyMax(array, array.length, i);
    }
}

function crearMinHeap(array) {
    for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
        heapifyMin(array, array.length, i);
    }
}

function heapifyMax(array, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] > array[largest]) largest = left;
    if (right < n && array[right] > array[largest]) largest = right;

    if (largest !== i) {
        [array[i], array[largest]] = [array[largest], array[i]];
        heapifyMax(array, n, largest);
    }
}

function heapifyMin(array, n, i) {
    let smallest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && array[left] < array[smallest]) smallest = left;
    if (right < n && array[right] < array[smallest]) smallest = right;

    if (smallest !== i) {
        [array[i], array[smallest]] = [array[smallest], array[i]];
        heapifyMin(array, n, smallest);
    }
}

function dibujarMonticulo(array) {
    const width = 600;
    const height = 400;

    const svg = d3.select("#monticulo-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50,50)");

    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const root = d3.hierarchy(convertArrayToTree(array));

    treeLayout(root);

    // Dibujar enlaces
    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)
        .style("stroke", "#ccc");

    // Dibujar nodos
    svg.selectAll(".node")
        .data(root.descendants())
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 20)
        .style("fill", "#3498db");

    // Añadir etiquetas
    svg.selectAll(".label")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 25)
        .attr("text-anchor", "middle")
        .text(d => d.data)
        .style("font-size", "12px")
        .style("fill", "#333");
}

function convertArrayToTree(array) {
    if (!array.length) return null;
    const nodes = array.map(value => ({ name: value }));
    for (let i = 0; i < array.length; i++) {
        nodes[i].children = [];
        if (2 * i + 1 < array.length) nodes[i].children.push(nodes[2 * i + 1]);
        if (2 * i + 2 < array.length) nodes[i].children.push(nodes[2 * i + 2]);
    }
    return nodes[0];
}
