// SVG y configuración inicial
const svg = d3.select("#graph");
const width = +svg.attr("width");
const height = +svg.attr("height");

// Grafos predefinidos
const predefinedGraphs = {
  "graph-6": {
    nodes: [
        { id: "1", x: 500, y: 300 },
        { id: "2", x: 700, y: 300 },
        { id: "3", x: 600, y: 200 },
        { id: "4", x: 500, y: 500 },
        { id: "5", x: 700, y: 500 },
        { id: "6", x: 600, y: 600 }
    ],
    links: [
        { source: "1", target: "2" },
        { source: "1", target: "3" },
        { source: "2", target: "3" },
        { source: "4", target: "1" },
        { source: "4", target: "5" },
        { source: "5", target: "6" }
    ]
    },
    "graph-7": {
      nodes: [
        { id: "A", x: 100, y: 200 },
        { id: "B", x: 300, y: 100 },
        { id: "C", x: 500, y: 100 },
        { id: "D", x: 100, y: 400 },
        { id: "E", x: 500, y: 400 },
        { id: "F", x: 700, y: 200 },
        { id: "G", x: 300, y: 400 }
      ],
      links: [
        { source: "A", target: "B", weight: 8 },
        { source: "A", target: "D", weight: 7 },
        { source: "B", target: "C", weight: 10 },
        { source: "B", target: "E", weight: 12 },
        { source: "C", target: "F", weight: 9 },
        { source: "C", target: "E", weight: 6 },
        { source: "D", target: "E", weight: 11 },
        { source: "E", target: "F", weight: 5 },
        { source: "D", target: "G", weight: 14 },
        { source: "G", target: "C", weight: 18 },
      ]
    },
    "graph-8": {
      nodes: [
        { id: "A", x: 300, y: 100 },
        { id: "B", x: 500, y: 100 },
        { id: "C", x: 700, y: 100 },
        { id: "D", x: 300, y: 300 },
        { id: "E", x: 500, y: 300 },
        { id: "F", x: 700, y: 300 },
        { id: "G", x: 400, y: 500 },
        { id: "H", x: 600, y: 500 }
    ],
    links: [
        { source: "A", target: "B" },
        { source: "B", target: "C" },
        { source: "A", target: "D" },
        { source: "B", target: "E" },
        { source: "C", target: "F" },
        { source: "E", target: "G" },
        { source: "F", target: "H" },
        { source: "G", target: "H" } // Ciclo
    ]
    },
    "graph-9": {
      nodes: [
        { id: "A", x: 200, y: 100 },
        { id: "B", x: 400, y: 100 },
        { id: "C", x: 600, y: 100 },
        { id: "D", x: 200, y: 300 },
        { id: "E", x: 600, y: 300 },
        { id: "F", x: 800, y: 100 },
        { id: "G", x: 600, y: 500 },
        { id: "H", x: 200, y: 500 },
        { id: "I", x: 400, y: 500 }
      ],
      links: [
        { source: "A", target: "B", weight: 3 },
        { source: "A", target: "H", weight: 10 },
        { source: "A", target: "D", weight: 9 },
        { source: "B", target: "C", weight: 5 },
        { source: "B", target: "D", weight: 6 },
        { source: "B", target: "E", weight: 6 },
        { source: "B", target: "H", weight: 6 },
        { source: "C", target: "E", weight: 4 },
        { source: "C", target: "F", weight: 1 },
        { source: "D", target: "E", weight: 12 },
        { source: "D", target: "G", weight: 8 },
        { source: "D", target: "H", weight: 2 },
        { source: "E", target: "G", weight: 15 },
        { source: "E", target: "I", weight: 9 },
        { source: "G", target: "I", weight: 3 },
        { source: "H", target: "I", weight: 14 }
      ]
    },
    "graph-12": {
      nodes: [
        { id: "A", x: 100, y: 300 },
        { id: "B", x: 300, y: 100 },
        { id: "C", x: 300, y: 500 },
        { id: "D", x: 500, y: 100 },
        { id: "E", x: 500, y: 500 },
        { id: "F", x: 700, y: 100 },
        { id: "G", x: 700, y: 500 },
        { id: "H", x: 900, y: 300 },
        { id: "I", x: 300, y: 300 },
        { id: "J", x: 500, y: 300 },
        { id: "K", x: 700, y: 300 },
        { id: "L", x: 900, y: 100 }
    ],
    links: [
        { source: "A", target: "B" },
        { source: "A", target: "C" },
        { source: "B", target: "D" },
        { source: "C", target: "E" },
        { source: "D", target: "F" },
        { source: "E", target: "G" },
        { source: "F", target: "H" },
        { source: "G", target: "H" },
        { source: "B", target: "I" },
        { source: "D", target: "J" },
        { source: "F", target: "K" },
        { source: "H", target: "L" }
    ]
    }
};


function drawGraph({ nodes, links }) {
    svg.selectAll("*").remove(); // Limpiar el SVG

    // Obtener dimensiones del SVG
    const svgWidth = +svg.attr("width");
    const svgHeight = +svg.attr("height");

    // Normaliza las coordenadas de los nodos
    const normalizedNodes = normalizeNodes(nodes);

    // Centra los nodos normalizados dentro del SVG
    const centeredNodes = centerGraph(normalizedNodes, svgWidth, svgHeight);

    // Dibujar enlaces con animación
    svg.selectAll(".link")
        .data(links)
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => centeredNodes.find(node => node.id === d.source).x)
        .attr("y1", d => centeredNodes.find(node => node.id === d.source).y)
        .attr("x2", d => centeredNodes.find(node => node.id === d.source).x)
        .attr("y2", d => centeredNodes.find(node => node.id === d.source).y)
        .style("stroke", "gray")
        .style("stroke-width", 2)
        .transition()
        .duration(1000)
        .attr("x2", d => centeredNodes.find(node => node.id === d.target).x)
        .attr("y2", d => centeredNodes.find(node => node.id === d.target).y);

    // Dibujar nodos con animación
    svg.selectAll(".node")
        .data(centeredNodes)
        .enter()
        .append("circle")
        .attr("class", "node")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 15) // Tamaño ajustado
        .style("fill", "lightblue")
        .style("stroke", "steelblue")
        .style("stroke-width", 2)
        .transition()
        .duration(1000);

    // Etiquetas con animación
    svg.selectAll("text")
        .data(centeredNodes)
        .enter()
        .append("text")
        .text(d => d.id)
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("dy", 5)
        .style("font-size", "10px")
        .style("fill", "#333")
        .style("opacity", 0)
        .style("text-anchor", "middle")
        .transition()
        .duration(1000)
        .style("opacity", 1);
}

// Asociar botones con grafos
document.querySelectorAll(".top-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        const graphId = button.id;
        if (predefinedGraphs[graphId]) {
            drawGraph(predefinedGraphs[graphId]);
            document.getElementById("narration").textContent = `Grafo ${graphId} cargado. Presiona "Iniciar DFS" para comenzar.`;
        } else {
            alert("Grafo no definido.");
        }
    });
});


let dfsSteps = [];
let currentStepIndex = -1;
let currentGraph = null; // Mantendrá el grafo actual

// Función para inicializar el DFS y generar pasos
function initializeDFS(graph) {
    dfsSteps = [];
    const visited = new Set();
    const stack = [];

    function dfs(nodeId) {
        stack.push(nodeId);
        dfsSteps.push({ nodeId, stack: [...stack], action: "visit" });

        visited.add(nodeId);

        graph.links.forEach(link => {
            if (link.source === nodeId && !visited.has(link.target)) {
                dfsSteps.push({ nodeId, stack: [...stack], action: "explore", target: link.target });
                dfs(link.target);
            }
        });

        stack.pop();
        dfsSteps.push({ nodeId, stack: [...stack], action: "backtrack" });
    }

    dfs(graph.nodes[0].id); // Asumimos que el DFS inicia en el primer nodo
    currentStepIndex = -1; // Reinicia el índice de pasos
}

// Función para ejecutar el paso actual del DFS
function executeCurrentStep() {
    if (currentStepIndex < 0 || currentStepIndex >= dfsSteps.length) return;

    const { nodeId, action, target } = dfsSteps[currentStepIndex];

    // Actualiza la narración
    const narration = document.getElementById("narration");

    switch (action) {
        case "visit":
            narration.textContent = `Visitando el nodo ${nodeId}.`;
            highlightNode(nodeId, "green");
            break;
        case "explore":
            narration.textContent = `Explorando el enlace desde ${nodeId} hacia ${target}.`;
            highlightLink(nodeId, target, "blue");
            break;
        case "backtrack":
            narration.textContent = `Retrocediendo desde el nodo ${nodeId}.`;
            highlightNode(nodeId, "red");
            break;
    }

    // Si es el último paso, mostrar SweetAlert
    if (currentStepIndex === dfsSteps.length - 1) {
        Swal.fire({
            title: "¡DFS Completado!",
            text: "El algoritmo de búsqueda en profundidad ha terminado.",
            icon: "success",
            confirmButtonText: "Entendido",
            timer: 3000,
            timerProgressBar: true
        });
    }
}



// Función para resaltar nodos
function highlightNode(nodeId, color) {
    d3.selectAll(".node")
        .filter(d => d.id === nodeId)
        .transition()
        .duration(500)
        .style("fill", color);
}

// Función para resaltar enlaces
function highlightLink(source, target, color) {
    d3.selectAll(".link")
        .filter(d => (d.source === source && d.target === target) || (d.source === target && d.target === source))
        .transition()
        .duration(500)
        .style("stroke", color);
}

document.getElementById("start").addEventListener("click", () => {
    if (currentGraph) {
        initializeDFS(currentGraph);
        currentStepIndex = 0;
        executeCurrentStep();
    } else {
        Swal.fire({
            title: "Error",
            text: "Primero selecciona un grafo.",
            icon: "error",
            confirmButtonText: "Entendido"
        });
    }
});

document.getElementById("nextStep").addEventListener("click", () => {
    if (currentStepIndex < dfsSteps.length - 1) {
        currentStepIndex++;
        executeCurrentStep();
    }
});

document.getElementById("prevStep").addEventListener("click", () => {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        executeCurrentStep();
    }
});

// Asociar botones de grafos
document.querySelectorAll(".top-buttons button").forEach(button => {
    button.addEventListener("click", () => {
        const graphId = button.id;
        if (predefinedGraphs[graphId]) {
            currentGraph = predefinedGraphs[graphId];
            drawGraph(currentGraph);
            document.getElementById("narration").textContent = `Grafo ${graphId} cargado. Presiona "Iniciar DFS" para comenzar.`;
        } else {
            alert("Grafo no definido.");
        }
    });
});




function centerGraph(nodes, svgWidth, svgHeight) {
    // Encuentra el rango actual de las coordenadas
    const xMin = Math.min(...nodes.map(node => node.x));
    const xMax = Math.max(...nodes.map(node => node.x));
    const yMin = Math.min(...nodes.map(node => node.y));
    const yMax = Math.max(...nodes.map(node => node.y));

    // Calcula el tamaño del grafo
    const graphWidth = xMax - xMin;
    const graphHeight = yMax - yMin;

    // Calcula los desplazamientos necesarios
    const xOffset = (svgWidth - graphWidth) / 2 - xMin;
    const yOffset = (svgHeight - graphHeight) / 2 - yMin;

    // Imprime los valores calculados
    console.log({
        xMin, xMax, yMin, yMax,
        graphWidth, graphHeight,
        xOffset, yOffset,
        svgWidth, svgHeight
    });

    // Ajusta las posiciones de los nodos
    return nodes.map(node => {
        const adjustedNode = {
            ...node,
            x: node.x + xOffset,
            y: node.y + yOffset
        };
        console.log("Adjusted Node:", adjustedNode); // Verifica las coordenadas ajustadas
        return adjustedNode;
    });
}


function normalizeNodes(nodes) {
    const xMin = Math.min(...nodes.map(node => node.x));
    const yMin = Math.min(...nodes.map(node => node.y));

    // Ajustar nodos para que empiecen desde (0, 0)
    return nodes.map(node => ({
        ...node,
        x: node.x - xMin, // Desplazar para que xMin sea 0
        y: node.y - yMin, // Desplazar para que yMin sea 0
    }));
}
