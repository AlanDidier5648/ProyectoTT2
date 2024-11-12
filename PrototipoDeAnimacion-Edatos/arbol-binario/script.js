function limpiarContenedor() {
    d3.select("#tree-container").selectAll("*").remove();
    document.getElementById("recorrido-buttons").style.display = "none"; // Ocultar botones
}


let raizActual = null; // Variable global para almacenar el nodo raíz del árbol actual

function crearArbolCompleto() {
    limpiarContenedor();

    const treeData = {
        name: "Raíz",
        children: [
            {
                name: "Nodo Izquierdo",
                children: [
                    { name: "Hijo Izquierdo 1" },
                    { name: "Hijo Derecho 1" }
                ]
            },
            {
                name: "Nodo Derecho",
                children: [
                    { name: "Hijo Izquierdo 2" },
                    { name: "Hijo Derecho 2" }
                ]
            }
        ]
    };

    raizActual = d3.hierarchy(treeData); // Actualiza la raíz global
    dibujarArbol(treeData);

    document.getElementById("tree-container").scrollIntoView({ behavior: "smooth" });
    document.getElementById("recorrido-buttons").style.display = "block";
}

function crearArbolLleno() {
    limpiarContenedor();

    const treeData = {
        name: "Raíz",
        children: [
            {
                name: "Nodo Izquierdo",
                children: [
                    {
                        name: "Subnodo Izquierdo 1",
                        children: [
                            { name: "Hoja 1" },
                            { name: "Hoja 2" }
                        ]
                    },
                    {
                        name: "Subnodo Derecho 1",
                        children: [
                            { name: "Hoja 3" },
                            { name: "Hoja 4" }
                        ]
                    }
                ]
            },
            {
                name: "Nodo Derecho",
                children: [
                    {
                        name: "Subnodo Izquierdo 2",
                        children: [
                            { name: "Hoja 5" },
                            { name: "Hoja 6" }
                        ]
                    },
                    {
                        name: "Subnodo Derecho 2",
                        children: [
                            { name: "Hoja 7" },
                            { name: "Hoja 8" }
                        ]
                    }
                ]
            }
        ]
    };

    raizActual = d3.hierarchy(treeData); // Actualiza la raíz global
    dibujarArbol(treeData);

    document.getElementById("tree-container").scrollIntoView({ behavior: "smooth" });
    document.getElementById("recorrido-buttons").style.display = "block";
}

function crearArbolBusqueda() {
    limpiarContenedor();

    const treeData = {
        name: 10,
        children: [
            {
                name: 5,
                children: [
                    { name: 3 },
                    { name: 7 }
                ]
            },
            {
                name: 15,
                children: [
                    { name: 12 },
                    { name: 20 }
                ]
            }
        ]
    };

    raizActual = d3.hierarchy(treeData); // Actualiza la raíz global
    dibujarArbol(treeData);

    document.getElementById("tree-container").scrollIntoView({ behavior: "smooth" });
    document.getElementById("recorrido-buttons").style.display = "block";
}


// Función general para dibujar el árbol usando D3.js
function dibujarArbol(data) {
    const width = 600;
    const height = 400;

    const svg = d3.select("#tree-container").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(50,50)");

    const treeLayout = d3.tree().size([width - 100, height - 100]);
    const root = d3.hierarchy(data);

    treeLayout(root);

    // Dibujar enlaces
    // Dibujar enlaces con animación de entrada
    svg.selectAll(".link")
        .data(root.links())
        .enter()
        .append("line")
        .attr("class", "link")
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.source.x)
        .attr("y2", d => d.source.y)
        .style("stroke", "#ccc")
        .transition()
        .duration(500)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);


    // Dibujar nodos
    svg.selectAll(".node")
    .data(root.descendants())
    .enter()
    .append("circle")
    .attr("class", "node")
    .attr("id", d => `node-${d.data.name.toString().replace(/\W+/g, '_')}`)
 // Identificador único
    .attr("cx", d => d.x)
    .attr("cy", d => d.y)
    .attr("r", 20)
    .style("fill", "#3498db");



    // Añadir etiquetas de texto a los nodos
    svg.selectAll(".label")
        .data(root.descendants())
        .enter()
        .append("text")
        .attr("class", "label")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 25)
        .attr("text-anchor", "middle")
        .text(d => d.data.name)
        .style("font-size", "12px")
        .style("fill", "#333");
}


function recorridoPreorden(nodo) {
    const nodos = [];
    function preorden(nodo) {
        if (!nodo) return;
        nodos.push(nodo.data.name); // Agrega el nombre del nodo al array
        if (nodo.children && nodo.children[0]) preorden(nodo.children[0]);
        if (nodo.children && nodo.children[1]) preorden(nodo.children[1]);
    }
    preorden(nodo);
    visualizarRecorrido(nodos); // Muestra el recorrido visualmente
}

function recorridoEnOrden(nodo) {
    const nodos = [];
    function enOrden(nodo) {
        if (!nodo) return;
        if (nodo.children && nodo.children[0]) enOrden(nodo.children[0]);
        nodos.push(nodo.data.name);
        if (nodo.children && nodo.children[1]) enOrden(nodo.children[1]);
    }
    enOrden(nodo);
    visualizarRecorrido(nodos);
}

function recorridoPostorden(nodo) {
    const nodos = [];
    function postorden(nodo) {
        if (!nodo) return;
        if (nodo.children && nodo.children[0]) postorden(nodo.children[0]);
        if (nodo.children && nodo.children[1]) postorden(nodo.children[1]);
        nodos.push(nodo.data.name);
    }
    postorden(nodo);
    visualizarRecorrido(nodos);
}




async function visualizarRecorrido(nodos) {
    for (let i = 0; i < nodos.length; i++) {
        const nodoId = `node-${nodos[i].toString().replace(/\W+/g, '_')}`;
 // Identificador del nodo
        const nodoElement = document.getElementById(nodoId);

        console.log(`Intentando resaltar el nodo: ${nodoId}`); // Para verificar los nodos

        if (nodoElement) {
            nodoElement.style.fill = "orange"; // Cambia el color para resaltar el nodo

            // Espera 800 ms antes de pasar al siguiente nodo
            await new Promise(resolve => setTimeout(resolve, 800));

            nodoElement.style.fill = "#3498db"; // Restaura el color original
        } else {
            console.warn(`No se encontró el nodo con id: ${nodoId}`);
        }
    }

    // SweetAlert al final del recorrido
    Swal.fire({
        icon: 'success',
        title: 'Recorrido completo',
        text: 'Se ha mostrado todo el recorrido.'
    });
}
