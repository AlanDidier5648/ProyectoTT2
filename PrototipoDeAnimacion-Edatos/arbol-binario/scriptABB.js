class Node {
  constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
  }

  add(value) {
      if (value < this.value) {
          if (this.left) {
              this.left.add(value);
          } else {
              this.left = new Node(value);
          }
      } else {
          if (this.right) {
              this.right.add(value);
          } else {
              this.right = new Node(value);
          }
      }
  }


    // Método para eliminar nodos
    remove(value) {
      const removeNode = (node, value) => {
          if (node === null) {
              return null;
          }

          if (value < node.value) {
              node.left = removeNode(node.left, value);
              return node;
          } else if (value > node.value) {
              node.right = removeNode(node.right, value);
              return node;
          } else {
              if (node.left === null) {
                  return node.right;
              } else if (node.right === null) {
                  return node.left;
              }

              let tempNode = node.right;
              while (tempNode.left !== null) {
                  tempNode = tempNode.left;
              }

              node.value = tempNode.value;
              node.right = removeNode(node.right, tempNode.value);
              return node;
          }
      };

      return removeNode(this, value);
  }
}

// Variables globales
let head = null; // Nodo raíz inicializado como nulo
let treeData = null; // Datos del árbol inicializados como nulos

// Actualiza la estructura del árbol
function updateTree(node, tree) {
  if (!node) return;
  tree.children = [];

  // Agregar el nodo izquierdo si existe
  if (node.left) {
      let leftChild = { name: node.left.value, children: [] };
      tree.children.push(leftChild);
      updateTree(node.left, leftChild); // Recursión para subárbol izquierdo
  }

  // Agregar el nodo derecho si existe
  if (node.right) {
      let rightChild = { name: node.right.value, children: [] };
      tree.children.push(rightChild);
      updateTree(node.right, rightChild); // Recursión para subárbol derecho
  }
}

function drawTree(newNodeValue = null) {
  d3.select("#cy").select("svg").remove(); // Limpia la visualización existente

  const width = 600;
  const height = 400;

  const svg = d3.select("#cy")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

  const root = d3.hierarchy(treeData);
  const treeLayout = d3.tree().size([width - 100, height - 100]);
  treeLayout(root);

  // Dibuja las conexiones
  svg.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("d", d3.linkHorizontal()
          .x(d => d.x + 50)
          .y(d => d.y + 50));

  // Dibuja los nodos
  const nodes = svg.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x + 50}, ${d.y + 50})`);

  // Agrega los círculos
  nodes.append("circle")
      .attr("r", d => (d.data.name === newNodeValue ? 0 : 20)) // Solo el nodo nuevo empieza con radio 0
      .attr("fill", "#007bff")
      .attr("stroke", "#000")
      .attr("stroke-width", "1")
      .transition() // Transición para el nodo nuevo
      .duration(500)
      .attr("r", 20);

  // Agrega el texto con los valores de los nodos
  nodes.append("text")
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .attr("fill", "#fff")
      .text(d => d.data.name)
      .style("opacity", d => (d.data.name === newNodeValue ? 0 : 1)) // Solo el nodo nuevo empieza invisible
      .transition() // Transición para el nodo nuevo
      .duration(500)
      .style("opacity", 1);
}


// Maneja la inserción de nodos
function handleInsert() {
  const value = parseInt(document.getElementById("nodeInput").value, 10);
  if (isNaN(value)) {
      Swal.fire({
          icon: "error",
          title: "Valor inválido",
          text: "Por favor, ingrese un número válido.",
      });
      return;
  }

  // Si el árbol no tiene raíz, el primer valor será la raíz
  if (!head) {
      head = new Node(value);
      treeData = { name: head.value, children: [] };
  } else {
      head.add(value);
      updateTree(head, treeData);
  }

  drawTree(value); // Pasa el valor del nuevo nodo para animarlo
  document.getElementById("nodeInput").value = ""; // Limpia el input
}

// Maneja la búsqueda de nodos
function handleSearch() {
  const value = parseInt(document.getElementById("searchInput").value, 10);
  if (!head) {
      Swal.fire({
          icon: "info",
          title: "Árbol vacío",
          text: "El árbol está vacío. Por favor, ingrese un valor para la raíz primero.",
      });
      return;
  }
  if (isNaN(value)) {
      Swal.fire({
          icon: "error",
          title: "Valor inválido",
          text: "Por favor, ingrese un número válido.",
      });
      return;
  }

  const found = searchTree(head, value);
  Swal.fire({
      icon: found ? "success" : "warning",
      title: found ? "Nodo encontrado" : "Nodo no encontrado",
      text: found
          ? `El nodo con valor ${value} fue encontrado.`
          : `No se encontró un nodo con el valor ${value}.`,
  });

  document.getElementById("searchInput").value = ""; // Limpia el input
}

// Búsqueda de nodos en el árbol
function searchTree(node, value) {
  if (!node) return false;
  if (node.value === value) return true;
  if (value < node.value) return searchTree(node.left, value);
  return searchTree(node.right, value);
}

// Simula la búsqueda en el árbol con animación
function animateSearch(value) {
  if (!head) {
      Swal.fire({
          icon: "info",
          title: "Árbol vacío",
          text: "El árbol está vacío. Por favor, ingrese un valor para la raíz primero.",
      });
      return;
  }

  const nodesToVisit = []; // Lista de nodos a visitar

  // Función recursiva para llenar la lista de nodos visitados
  function searchAndTrack(node, value) {
      if (!node) return false;
      nodesToVisit.push(node.value); // Agrega el nodo actual a la lista
      if (node.value === value) return true;
      if (value < node.value) return searchAndTrack(node.left, value);
      return searchAndTrack(node.right, value);
  }

  const found = searchAndTrack(head, value);

  // Realiza la animación de los nodos visitados
  const svgNodes = d3.select("#cy").selectAll("circle"); // Selecciona todos los nodos
  const svgTexts = d3.select("#cy").selectAll("text"); // Selecciona los textos

  nodesToVisit.forEach((nodeValue, index) => {
      setTimeout(() => {
          // Cambia el color del nodo actual
          svgNodes
              .filter(d => d.data.name === nodeValue)
              .transition()
              .duration(300)
              .attr("fill", nodeValue === value ? "#28a745" : "#ffc107"); // Verde si se encuentra, amarillo si no

          // Resalta el texto del nodo
          svgTexts
              .filter(d => d.data.name === nodeValue)
              .transition()
              .duration(300)
              .style("fill", "#000")
              .style("font-weight", "bold");
      }, index * 500); // Retrasa cada paso 500ms
  });

  // Muestra un mensaje al final
  setTimeout(() => {
      Swal.fire({
          icon: found ? "success" : "warning",
          title: found ? "Nodo encontrado" : "Nodo no encontrado",
          text: found
              ? `El nodo con valor ${value} fue encontrado.`
              : `No se encontró un nodo con el valor ${value}.`,
      });

      // Restaura los colores originales
      svgNodes
          .transition()
          .duration(300)
          .attr("fill", "#007bff"); // Azul original

      svgTexts
          .transition()
          .duration(300)
          .style("fill", "#fff")
          .style("font-weight", "normal");
  }, nodesToVisit.length * 500); // Espera hasta el final del recorrido
}

// Maneja la búsqueda de nodos con animación
function handleSearch() {
  const value = parseInt(document.getElementById("searchInput").value, 10);
  if (isNaN(value)) {
      Swal.fire({
          icon: "error",
          title: "Valor inválido",
          text: "Por favor, ingrese un número válido.",
      });
      return;
  }

  animateSearch(value); // Llama a la función de búsqueda animada
  document.getElementById("searchInput").value = ""; // Limpia el input
}

function handleRemove() {
  const value = parseInt(document.getElementById("removeInput").value, 10);
  if (isNaN(value)) {
      console.error("Por favor, ingrese un número válido.");
      return;
  }

  if (!head) {
      console.error("El árbol está vacío. No hay nodos para eliminar.");
      return;
  }

  // Encuentra el nodo a eliminar
  const svgNodes = d3.select("#cy").selectAll("circle"); // Selecciona todos los nodos
  const svgTexts = d3.select("#cy").selectAll("text"); // Selecciona los textos

  // Filtra el nodo que coincide con el valor
  const matchingNode = svgNodes.filter(d => d.data.name === value);
  const matchingText = svgTexts.filter(d => d.data.name === value);

  if (matchingNode.empty()) {
      console.error("Nodo no encontrado.");
      return;
  }

  // Animación de desvanecimiento y reducción
  matchingNode
      .transition()
      .duration(500) // Duración de la animación
      .attr("r", 0) // Reduce el tamaño a 0
      .style("opacity", 0); // Desvanece el nodo

  matchingText
      .transition()
      .duration(500) // Duración de la animación
      .style("opacity", 0); // Desvanece el texto

  // Actualiza la estructura del árbol tras la animación
  setTimeout(() => {
      head = head.remove(value); // Elimina el nodo del árbol lógico
      if (head === null) {
          treeData = null; // Si el árbol queda vacío
          d3.select("#cy").select("svg").remove(); // Limpia el árbol visual
      } else {
          treeData = { name: head.value, children: [] };
          updateTree(head, treeData);
          drawTree();
      }
  }, 500); // Espera a que termine la animación
}

function handleClear() {
  // Limpia el contenedor visual
  d3.select("#cy").select("svg").remove();

  // Reinicia las variables globales
  head = null;
  treeData = null;

  console.log("El árbol ha sido limpiado.");
}


// Inicializa la visualización vacía
function initializeTree() {
  d3.select("#cy").select("svg").remove(); // Limpia cualquier visualización previa
  d3.select("#cy").append("svg").attr("width", 600).attr("height", 400);
}

// Inicializa el árbol vacío
initializeTree();

/*
const cy = cytoscape({
  container: document.getElementById("cy"),
  style: [
    {
      selector: "node",
      style: {
        "background-color": "#4CAF50",
        label: "data(label)",
        color: "#fff",
        "text-halign": "center",
        "text-valign": "center",
        "border-width": 2,
        "border-color": "#006400",
      },
    },
    {
      selector: "edge",
      style: {
        "line-color": "#006400",
        width: 2,
        "target-arrow-shape": "triangle",
        "target-arrow-color": "#006400",
      },
    },
  ],
  layout: {
    name: "preset", // Layout manual para controlar posiciones
  },
});

// Datos iniciales del árbol
let treeData = null;
let uniqueId = 0; // Contador para identificadores únicos

// Función para insertar un nodo en el árbol binario de búsqueda
function insertNode(tree, value) {
  if (!tree) {
    return { id: `${value}_${uniqueId++}`, label: `${value}`, left: null, right: null };
  }

  let current = tree;
  while (true) {
    if (value < parseInt(current.label)) {
      // Comparar con el nodo padre y avanzar al subárbol izquierdo
      if (!current.left) {
        const newNode = { id: `${value}_${uniqueId++}`, label: `${value}`, left: null, right: null };
        current.left = newNode;
        cy.add([
          { group: "nodes", data: { id: newNode.id, label: newNode.label } },
          { group: "edges", data: { source: current.id, target: newNode.id } },
        ]);
        break;
      } else {
        current = current.left;
      }
    } else {
      // Comparar con el nodo padre y avanzar al subárbol derecho
      if (!current.right) {
        const newNode = { id: `${value}_${uniqueId++}`, label: `${value}`, left: null, right: null };
        current.right = newNode;
        cy.add([
          { group: "nodes", data: { id: newNode.id, label: newNode.label } },
          { group: "edges", data: { source: current.id, target: newNode.id } },
        ]);
        break;
      } else {
        current = current.right;
      }
    }
  }

  return tree;
}

// Escuchar clic en el botón para agregar nodos
document.getElementById("insertButton").addEventListener("click", () => {
  const inputValue = parseInt(document.getElementById("nodeInput").value);
  if (!isNaN(inputValue)) {
    if (!treeData) {
      // Crear el nodo raíz
      treeData = { id: `${inputValue}_${uniqueId++}`, label: `${inputValue}`, left: null, right: null };
      cy.add({ group: "nodes", data: { id: treeData.id, label: treeData.label } });
    } else {
      insertNode(treeData, inputValue);
    }

    // Relayout después de insertar
    cy.layout({
      name: "breadthfirst",
      directed: true,
      spacingFactor: 1.5,
    }).run();

    document.getElementById("nodeInput").value = "";
  } else {
    alert("Por favor, ingresa un número válido.");
  }
});
*/