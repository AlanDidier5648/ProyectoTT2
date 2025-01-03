// Inicializar Cytoscape
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
