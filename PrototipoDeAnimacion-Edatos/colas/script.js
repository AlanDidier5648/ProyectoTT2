const colaContenedor = document.getElementById("cola"); // Contenedor principal de la cola

// Función para agregar un elemento al final de la cola (Enqueue)
function enqueue() {

      // Verificar si la cola está creada
      if (!isColaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Cola no creada',
            text: 'Debes crear una cola antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
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

      // Verificar si la cola está creada
      if (!isColaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Cola no creada',
            text: 'Debes crear una cola antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
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

function peek() {

      // Verificar si la cola está creada
      if (!isColaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Cola no creada',
            text: 'Debes crear una cola antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
    const colaContenedor = document.getElementById("cola"); // Contenedor principal de la cola
    const nodoFrente = colaContenedor.firstElementChild; // Selecciona el primer nodo en el contenedor (el frente de la cola)
    
    if (nodoFrente) {
        const valorFrente = nodoFrente.textContent; // Obtener el valor del nodo en el frente

        // Efecto visual temporal para resaltar el nodo en el frente
        Velocity(nodoFrente, { backgroundColor: "#ffb3b3", scale: 1.1 }, { duration: 300 })
            .then(() => Velocity(nodoFrente, { backgroundColor: "#ffcccc", scale: 1 }, { duration: 300 }));

        // Mostrar el valor del frente con SweetAlert
        Swal.fire({
            icon: 'info',
            title: 'Elemento en el Frente',
            text: `El valor del elemento en el frente es: ${valorFrente}`,
            confirmButtonText: 'Entendido'
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Cola Vacía',
            text: 'No hay elementos en la cola para ver.',
            confirmButtonText: 'OK'
        });
    }
}



function enqueueManual() {
      // Verificar si la cola está creada
      if (!isColaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Cola no creada',
            text: 'Debes crear una cola antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
    const colaContenedor = document.getElementById("cola"); // Contenedor principal de la cola
    const input = document.getElementById('enqueue-input'); // Input del usuario
    const value = input.value.trim(); // Valor ingresado, sin espacios

    // Verificar si el input está vacío
    if (value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, ingresa un valor antes de presionar "Enqueue".',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Crear el nodo para el nuevo elemento
    const nuevoNodo = document.createElement("div");
    nuevoNodo.className = "nodo";
    nuevoNodo.textContent = value; // Asignar el valor ingresado al nodo

    // Añadir el nuevo nodo al contenedor de la cola
    colaContenedor.appendChild(nuevoNodo);

    // Animación de entrada desde el lado derecho hacia el contenedor
    Velocity(nuevoNodo, { translateX: [0, 50], opacity: [1, 0] }, {
        duration: 500,
        easing: "easeOutBounce"
    });

    // Limpiar el input después de agregar el nodo
    input.value = '';
}


function initializeCola() {
    const colaContenedor = document.getElementById("cola"); // Contenedor principal de la cola

    // Verificar si la cola ya está visible
    if (colaContenedor.classList.contains("show")) {
        Swal.fire({
            icon: "info",
            title: "Cola ya creada",
            text: "La cola ya está disponible.",
            confirmButtonText: "Entendido"
        });
        return;
    }

    // Mostrar el contenedor con animación
    colaContenedor.classList.add("show");
    Velocity(colaContenedor, { opacity: [1, 0], scale: [1, 0.8] }, {
        duration: 500,
        easing: "easeOutBounce"
    });
}



function deleteCola() {
    const colaContenedor = document.getElementById("cola"); // Contenedor principal de la cola

    // Verificar si la cola ya está oculta
    if (!colaContenedor.classList.contains("show")) {
        Swal.fire({
            icon: "info",
            title: "Cola no creada",
            text: "Primero necesitas crear la cola.",
            confirmButtonText: "Entendido"
        });
        return;
    }

    // Ocultar el contenedor con animación
    Velocity(colaContenedor, { opacity: [0, 1], scale: [0.8, 1] }, {
        duration: 500,
        easing: "easeInBack",
        complete: () => {
            colaContenedor.classList.remove("show"); // Ocultar la cola después de la animación
            colaContenedor.innerHTML = ""; // Limpiar los elementos dentro de la cola
        }
    });

    // Mostrar mensaje de confirmación
    Swal.fire({
        icon: "success",
        title: "Cola Eliminada",
        text: "La cola ha sido eliminada exitosamente.",
        confirmButtonText: "Entendido"
    });
}


function isColaCreated() {
    const colaContenedor = document.getElementById('cola'); // Contenedor principal de la cola
    return colaContenedor.classList.contains('show'); // Devuelve true si la cola está creada
}
