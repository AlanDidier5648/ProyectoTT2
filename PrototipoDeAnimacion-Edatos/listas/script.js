function animarNodosEmergentes() {
    const listaEnlazada = document.getElementById("lista-enlazada");
    const totalNodos = 5;

    for (let i = 0; i < totalNodos; i++) {
        // Crear nodo visual
        const nodo = document.createElement("div");
        nodo.className = "nodo";
        nodo.textContent = i + 1;

        // Añadir evento de selección al hacer clic en el nodo
        nodo.onclick = function () {
            seleccionarNodo(nodo);
        };

        listaEnlazada.appendChild(nodo);

        // Animación emergente para el nodo
        Velocity(nodo, { scale: [1, 0.3], opacity: [1, 0] }, {
            duration: 700,
            easing: "easeOutBounce",
            delay: i * 200 // Retardo secuencial para cada nodo
        });

        // Crear y animar flecha, excepto después del último nodo
        if (i < totalNodos - 1) {
            const flecha = document.createElement("div");
            flecha.className = "flecha";
            listaEnlazada.appendChild(flecha);

            // Animación emergente para la flecha
            Velocity(flecha, { scale: [1, 0.3], opacity: [1, 0] }, {
                duration: 700,
                easing: "easeOutBounce",
                delay: i * 200 + 100 // Retardo para que la flecha aparezca después del nodo
            });
        }
    }
}

// Función para asegurarse de que solo un nodo esté seleccionado a la vez
function seleccionarNodo(nodo) {
    // Deselecciona cualquier nodo que ya esté seleccionado
    const nodoSeleccionado = document.querySelector(".nodo.seleccionado");
    if (nodoSeleccionado && nodoSeleccionado !== nodo) {
        nodoSeleccionado.classList.remove("seleccionado");
    }
    
    // Alterna la selección en el nodo actual
    nodo.classList.toggle("seleccionado");
}




function addAfterSelected() {
    const listaEnlazada = document.getElementById("lista-enlazada");
    const nodosActuales = listaEnlazada.getElementsByClassName("nodo");

    // Verifica si ya hay 7 nodos
    if (nodosActuales.length >= 7) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite de Nodos Alcanzado',
            text: 'No se pueden tener más de 7 nodos en la lista.',
            confirmButtonText: 'Entendido'
        });
        return; // Detiene la función si ya hay 7 nodos
    }

    // Selecciona el nodo actualmente marcado como seleccionado
    const selectedNode = document.querySelector(".nodo.seleccionado");
    
    if (selectedNode) {
        // Crear el nuevo nodo con un valor aleatorio
        const newNode = document.createElement("div");
        newNode.className = "nodo";
        newNode.textContent = Math.floor(Math.random() * 100); // Valor aleatorio

        // Agregar el evento de selección al nuevo nodo
        newNode.onclick = function () {
            seleccionarNodo(newNode);
        };

        // Crear y configurar la flecha que va antes del nuevo nodo
        const flecha = document.createElement("div");
        flecha.className = "flecha";

        // Insertar la flecha y el nuevo nodo después del nodo seleccionado
        if (selectedNode.nextSibling) {
            selectedNode.parentNode.insertBefore(flecha, selectedNode.nextSibling);
            selectedNode.parentNode.insertBefore(newNode, flecha.nextSibling);
        } else {
            // Si no hay un siguiente nodo, agrega la flecha y el nuevo nodo al final
            selectedNode.parentNode.appendChild(flecha);
            selectedNode.parentNode.appendChild(newNode);
        }

        // Animación emergente para el nuevo nodo y la flecha
        Velocity(flecha, { scale: [1, 0.3], opacity: [1, 0] }, {
            duration: 700,
            easing: "easeOutBounce"
        });
        Velocity(newNode, { scale: [1, 0.3], opacity: [1, 0] }, {
            duration: 700,
            easing: "easeOutBounce"
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Nodo No Seleccionado',
            text: 'Por favor, selecciona un nodo para insertar después de él.',
            confirmButtonText: 'OK'
        });
    }
}



function addBeforeSelected() {
    const listaEnlazada = document.getElementById("lista-enlazada");
    const nodosActuales = listaEnlazada.getElementsByClassName("nodo");

    // Verifica si ya hay 7 nodos
    if (nodosActuales.length >= 7) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite de Nodos Alcanzado',
            text: 'No se pueden tener más de 7 nodos en la lista.',
            confirmButtonText: 'Entendido'
        });
        return; // Detiene la función si ya hay 7 nodos
    }

    // Selecciona el nodo actualmente marcado como seleccionado
    const selectedNode = document.querySelector(".nodo.seleccionado");
    
    if (selectedNode) {
        // Crear el nuevo nodo con un valor aleatorio
        const newNode = document.createElement("div");
        newNode.className = "nodo";
        newNode.textContent = Math.floor(Math.random() * 100); // Valor aleatorio

        // Agregar el evento de selección al nuevo nodo
        newNode.onclick = function () {
            seleccionarNodo(newNode);
        };

        // Crear y configurar la flecha que va después del nuevo nodo
        const flecha = document.createElement("div");
        flecha.className = "flecha";

        // Insertar el nuevo nodo y luego la flecha antes del nodo seleccionado
        selectedNode.parentNode.insertBefore(newNode, selectedNode);
        selectedNode.parentNode.insertBefore(flecha, selectedNode);

        // Animación emergente para el nuevo nodo y la flecha
        Velocity(newNode, { scale: [1, 0.3], opacity: [1, 0] }, {
            duration: 700,
            easing: "easeOutBounce"
        });
        Velocity(flecha, { scale: [1, 0.3], opacity: [1, 0] }, {
            duration: 700,
            easing: "easeOutBounce"
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Nodo No Seleccionado',
            text: 'Por favor, selecciona un nodo para insertar antes de él.',
            confirmButtonText: 'OK'
        });
    }
}


// Función para borrar el nodo seleccionado
function deleteSelectedNode() {
    const selectedNode = document.querySelector(".nodo.seleccionado");

    if (selectedNode) {
        selectedNode.parentNode.removeChild(selectedNode);
    } else {
        alert("Por favor, selecciona un nodo para eliminar.");
    }
}

// Ejecutar la animación al cargar la página
document.addEventListener("DOMContentLoaded", animarNodosEmergentes);