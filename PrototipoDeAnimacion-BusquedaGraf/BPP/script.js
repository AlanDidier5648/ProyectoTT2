// Configuración inicial del SVG
const svg = d3.select("#graph");
const width = +svg.attr("width");
const height = +svg.attr("height");

// Datos del grafo
const nodes = [
  { id: "A", x: 100, y: 300 },
  { id: "B", x: 300, y: 200 },
  { id: "C", x: 300, y: 400 },
  { id: "D", x: 500, y: 150 },
  { id: "E", x: 500, y: 350 },
  { id: "F", x: 700, y: 300 },
  { id: "G", x: 900, y: 300 }
];

const links = [
  { source: "A", target: "B" },
  { source: "A", target: "C" },
  { source: "B", target: "D" },
  { source: "B", target: "E" },
  { source: "C", target: "F" },
  { source: "D", target: "G" },
  { source: "E", target: "F" },
  { source: "F", target: "G" }
];

// Crear enlaces
const link = svg.selectAll(".link")
  .data(links)
  .enter()
  .append("line")
  .attr("class", "link")
  .attr("x1", d => nodes.find(node => node.id === d.source).x)
  .attr("y1", d => nodes.find(node => node.id === d.source).y)
  .attr("x2", d => nodes.find(node => node.id === d.source).x) // Empieza en el mismo lugar (para animar después)
  .attr("y2", d => nodes.find(node => node.id === d.source).y)
  .style("stroke", "gray")
  .style("stroke-width", 2);

// Crear nodos
const node = svg.selectAll(".node")
  .data(nodes)
  .enter()
  .append("circle")
  .attr("class", "node")
  .attr("cx", d => d.x)
  .attr("cy", d => d.y)
  .attr("r", 0) // Radio inicial 0 (para animar después)
  .style("fill", "lightblue")
  .style("stroke", "steelblue")
  .style("stroke-width", 2);

// Etiquetas de nodos
const labels = svg.selectAll("text")
  .data(nodes)
  .enter()
  .append("text")
  .text(d => d.id)
  .attr("x", d => d.x)
  .attr("y", d => d.y)
  .attr("dy", 5)
  .style("font-size", "12px")
  .style("fill", "#333")
  .style("opacity", 0); // Inicia invisible

// Animación emergente
node.transition()
  .duration(1000)
  .attr("r", 20);

link.transition()
  .duration(1000)
  .attr("x2", d => nodes.find(node => node.id === d.target).x)
  .attr("y2", d => nodes.find(node => node.id === d.target).y);

labels.transition()
  .duration(1000)
  .style("opacity", 1);


// Funciones de arrastre
function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
}

function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}


// Función DFS visual adaptada
function dfs(startNodeId) {
  const visited = new Set(); // Conjunto para almacenar nodos visitados
  const stack = [startNodeId]; // Pila de nodos a explorar
  const recorridoLista = d3.select("#recorrido-lista");
  recorridoLista.html(""); // Limpiar la lista de recorrido

  // Función para visitar un nodo
  function visitNode(nodeId) {
      const node = nodes.find(n => n.id === nodeId);
      // Cambiar color del nodo visitado
      d3.selectAll(".node")
          .filter(d => d.id === nodeId)
          .transition()
          .duration(500)
          .style("fill", "orange");

      // Agregar nodo al recorrido mostrado
      recorridoLista.append("li").text(nodeId);
  }

  // Función para resaltar enlace activo
  function visitLink(sourceId, targetId) {
      d3.selectAll(".link")
          .filter(d => d.source.id === sourceId && d.target.id === targetId)
          .transition()
          .duration(500)
          .style("stroke", "red");
  }

  // Paso del DFS
  function dfsStep() {
      if (stack.length === 0) {
          // Recorrido completado
          Swal.fire("¡Recorrido completado!", "El algoritmo DFS ha visitado todos los nodos accesibles.", "success");
          return;
      }

      const currentNode = stack.pop(); // Sacar nodo de la pila
      if (!visited.has(currentNode)) {
          visited.add(currentNode); // Marcar nodo como visitado
          visitNode(currentNode);

          const neighbors = links
          .filter(link => link.source === currentNode && !visited.has(link.target))
          .map(link => link.target);
      

          neighbors.forEach(neighbor => {
              stack.push(neighbor); // Agregar vecinos a la pila
              visitLink(currentNode, neighbor); // Resaltar enlace
          });

          setTimeout(dfsStep, 1000); // Llamar al siguiente paso después de 1 segundo
      }
  }

  dfsStep(); // Iniciar DFS
}

// Botón para iniciar DFS
d3.select("#start").on("click", () => {
  const startNodeId = "A"; // Nodo inicial, puedes cambiarlo si es necesario
  dfs(startNodeId);
});
