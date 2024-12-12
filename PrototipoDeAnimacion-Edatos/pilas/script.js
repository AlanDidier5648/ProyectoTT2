const pilaContenedor = document.getElementById("pila"); // Contenedor principal de la pila

// Función para agregar un elemento en el tope (Push)
function push() {

     // Verificar si la pila está creada
     if (!isPilaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Pila no creada',
            text: 'Debes crear una pila antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
    
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

      // Verificar si la pila está creada
      if (!isPilaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Pila no creada',
            text: 'Debes crear una pila antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
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
      // Verificar si la pila está creada
      if (!isPilaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Pila no creada',
            text: 'Debes crear una pila antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }
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


let array = []; // Array global para almacenar los valores

function pushValue() {

      // Verificar si la pila está creada
      if (!isPilaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Pila no creada',
            text: 'Debes crear una pila antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }

    const input = document.getElementById('push-input'); // Obtener el input
    const value = input.value.trim(); // Obtener el valor ingresado, sin espacios
    const pilaContenedor = document.getElementById('pila'); // Contenedor principal de la pila
    const nodosActuales = pilaContenedor.getElementsByClassName("nodo"); // Nodos actuales en la pila

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

    // Verificar si el input está vacío
    if (value === '') {
        Swal.fire({
            icon: 'error',
            title: 'Campo vacío',
            text: 'Por favor, ingresa un valor antes de presionar "Push".',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Crear el nodo para el nuevo elemento
    const nuevoNodo = document.createElement("div");
    nuevoNodo.className = "nodo";
    nuevoNodo.textContent = value; // Asignar el valor ingresado al nodo

    // Añadir el nuevo nodo al contenedor de la pila
    pilaContenedor.appendChild(nuevoNodo);

    // Animación de entrada desde la derecha hacia el centro
    Velocity(nuevoNodo, { translateX: [0, 50], opacity: [1, 0] }, {
        duration: 500,
        easing: "easeOutBounce"
    });

    // Limpiar el input después de agregar el nodo
    input.value = '';
}


function updateArrayVisualization() {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de actualizar

    array.forEach(value => {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container');

        const circle = document.createElement('div');
        circle.classList.add('array-circle');
        circle.innerText = value;

        circleContainer.appendChild(circle);
        container.appendChild(circleContainer);
    });
}


function createPila() {
    const pilaContenedor = document.getElementById('pila');

    // Verificar si la pila ya está visible
    if (pilaContenedor.classList.contains('show')) {
        Swal.fire({
            icon: 'info',
            title: 'Pila ya creada',
            text: 'La pila ya está disponible.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Hacer visible el contenedor de la pila
    pilaContenedor.classList.add('show');
}


function destroyPila() {
    const pilaContenedor = document.getElementById('pila');

    // Verificar si la pila ya está oculta
    if (!pilaContenedor.classList.contains('show')) {
        Swal.fire({
            icon: 'info',
            title: 'Pila no disponible',
            text: 'No hay pila para destruir.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Quitar la visibilidad del contenedor
    pilaContenedor.classList.remove('show');
}


function countPilaElements() {
      // Verificar si la pila está creada
      if (!isPilaCreated()) {
        Swal.fire({
            icon: 'error',
            title: 'Pila no creada',
            text: 'Debes crear una pila antes de realizar esta acción.',
            confirmButtonText: 'Entendido'
        });
        return; // Detener la ejecución
    }

    
    const pilaContenedor = document.getElementById('pila'); // Contenedor principal de la pila
    const nodosActuales = pilaContenedor.getElementsByClassName("nodo"); // Nodos actuales en la pila
    const cantidad = nodosActuales.length; // Contar los nodos

    // Mostrar el conteo con SweetAlert
    Swal.fire({
        icon: 'info',
        title: 'Conteo de Elementos',
        text: `La pila tiene actualmente ${cantidad} elemento(s).`,
        confirmButtonText: 'Entendido'
    });
}


function isPilaCreated() {
    const pilaContenedor = document.getElementById('pila'); // Contenedor principal de la pila
    return pilaContenedor.classList.contains('show'); // Devuelve true si la pila está creada
}
