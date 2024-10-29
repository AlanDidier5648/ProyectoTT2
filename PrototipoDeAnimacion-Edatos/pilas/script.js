const pilaContenedor = document.getElementById("pila"); // Contenedor principal de la pila

// Función para agregar un elemento en el tope (Push)
function push() {

    const nodosActuales = pilaContenedor.getElementsByClassName("nodo");

    // Verificar si ya hay 10 nodos
    if (nodosActuales.length >= 10) {
        Swal.fire({
            icon: 'warning',
            title: 'Límite de Pila Alcanzado',
            text: 'No se pueden agregar más de 10 elementos en la pila.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la función si ya hay 10 nodos
    }


    // Crear el nodo para el nuevo elemento
    const nuevoNodo = document.createElement("div");
    nuevoNodo.className = "nodo";
    nuevoNodo.textContent = Math.floor(Math.random() * 100); // Valor aleatorio

    // Añadir el nuevo nodo al contenedor de la pila
    pilaContenedor.appendChild(nuevoNodo);

   // Animación de entrada desde la derecha hacia el centro
   Velocity(nuevoNodo, { translateX: [0, 50], opacity: [1, 0] }, {
    duration: 500,
    easing: "easeOutBounce"
    });
}

// Función para eliminar el elemento en el tope (Pop)
function pop() {
    // Selecciona el último nodo en el contenedor (el tope de la pila)
    const nodoTope = pilaContenedor.lastElementChild;
    
    if (nodoTope) {
        // Animación de salida para el nodo antes de eliminarlo
        Velocity(nodoTope, { scale: [0.3, 1], opacity: [0, 1] }, {
            duration: 500,
            easing: "easeInBack",
            complete: function() {
                nodoTope.remove(); // Elimina el nodo después de la animación
            }
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Pila Vacía',
            text: 'No hay elementos en la pila para eliminar.',
            confirmButtonText: 'OK'
        });
    }
}

function peek() {
    // Selecciona el último nodo en el contenedor (el tope de la pila)
    const nodoTope = pilaContenedor.lastElementChild;
    
    if (nodoTope) {
        // Obtener el valor del nodo en el tope
        const valorTope = nodoTope.textContent;

        // Efecto visual temporal para resaltar el nodo en el tope
        Velocity(nodoTope, { backgroundColor: "#ffb3b3", scale: 1.1 }, { duration: 300 })
            .then(() => Velocity(nodoTope, { backgroundColor: "#b80202", scale: 1 }, { duration: 300 }));

        // Mostrar SweetAlert con el valor del tope
        Swal.fire({
            icon: 'info',
            title: 'Elemento en el Tope',
            text: `El valor del elemento en el tope es: ${valorTope}`,
            confirmButtonText: 'OK'
        });
    } else {
        Swal.fire({
            icon: 'info',
            title: 'Pila Vacía',
            text: 'No hay elementos en la pila para ver.',
            confirmButtonText: 'OK'
        });
    }
}
