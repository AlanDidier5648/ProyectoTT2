const colaContenedor = document.getElementById("cola"); // Contenedor principal de la cola

// Función para agregar un elemento al final de la cola (Enqueue)
function enqueue() {
    // Crear el nodo para el nuevo elemento
    const nuevoNodo = document.createElement("div");
    nuevoNodo.className = "nodo";
    nuevoNodo.textContent = Math.floor(Math.random() * 100); // Valor aleatorio

    // Añadir el nuevo nodo al contenedor de la cola
    colaContenedor.appendChild(nuevoNodo);

    // Animación de entrada desde el lado derecho hacia el contenedor
    Velocity(nuevoNodo, { translateX: [0, 50], opacity: [1, 0] }, {
        duration: 500,
        easing: "easeOutBounce"
    });
}

// Función para eliminar el elemento en el frente de la cola (Dequeue)
function dequeue() {
    // Selecciona el primer nodo en el contenedor (el frente de la cola)
    const nodoFrente = colaContenedor.firstElementChild;
    
    if (nodoFrente) {
        // Animación de salida para el nodo antes de eliminarlo
        Velocity(nodoFrente, { translateX: [-50, 0], opacity: [0, 1] }, {
            duration: 500,
            easing: "easeInBack",
            complete: function() {
                nodoFrente.remove(); // Elimina el nodo después de la animación
            }
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Cola Vacía',
            text: 'No hay elementos en la cola para eliminar.',
            confirmButtonText: 'OK'
        });
    }
}

// Función para ver el elemento en el frente de la cola (Peek)
function peek() {
    // Selecciona el primer nodo en el contenedor (el frente de la cola)
    const nodoFrente = colaContenedor.firstElementChild;
    
    if (nodoFrente) {
        // Efecto visual temporal para resaltar el nodo en el frente
        Velocity(nodoFrente, { backgroundColor: "#ffb3b3", scale: 1.1 }, { duration: 300 })
            .then(() => Velocity(nodoFrente, { backgroundColor: "#ffcccc", scale: 1 }, { duration: 300 }));
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Cola Vacía',
            text: 'No hay elementos en la cola para ver.',
            confirmButtonText: 'OK'
        });
    }
}
