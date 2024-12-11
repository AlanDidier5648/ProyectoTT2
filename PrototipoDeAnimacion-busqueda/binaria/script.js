
let array = [];
let left = 0, right = 0, mid = 0, targetValue = null;
let stepActive = false;

function generateArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Limpiar contenedor
    array = [];

    // Generar un array de 10 valores aleatorios entre 1 y 100
    for (let i = 0; i < 10; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }

    // Crear elementos visuales para cada valor en el array
    array.forEach(value => {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container');

        const circle = document.createElement('div');
        circle.classList.add('array-circle');
        circle.innerText = value;

        circleContainer.appendChild(circle);
        container.appendChild(circleContainer);
    });

    // Reiniciar el estado de búsqueda
    resetBinarySearch();
}

function orderList() {
    // Ordenar el array global
    array.sort((a, b) => a - b);

    // Actualizar la visualización con el array ordenado
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Limpiar el contenedor actual

    array.forEach(value => {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container');

        const circle = document.createElement('div');
        circle.classList.add('array-circle');
        circle.innerText = value;

        circleContainer.appendChild(circle);
        container.appendChild(circleContainer);
    });

    // Mostrar mensaje de confirmación
    Swal.fire({
        icon: 'success',
        title: 'Lista ordenada',
        text: 'La lista ha sido ordenada correctamente.',
        confirmButtonText: 'Entendido'
    });
}


async function binarySearch() {
    if (!isArraySorted(array)) {
        Swal.fire({
            icon: 'error',
            title: 'Array no ordenado',
            text: 'Por favor, ordena la lista antes de buscar.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    targetValue = parseInt(document.getElementById('search-value').value);

    if (isNaN(targetValue)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no válido',
            text: 'Introduce un número válido para buscar.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    left = 0;
    right = array.length - 1;

    // Mostrar mensaje inicial
    updateMessageList('Iniciando búsqueda binaria...');
    const circles = document.getElementsByClassName('array-circle');

    while (left <= right) {
        mid = Math.floor((left + right) / 2);

        clearHighlights(); // Limpiar resaltados previos
        circles[mid].style.backgroundColor = 'blue'; // Resaltar el elemento actual

        // Mostrar mensaje del paso actual
        updateMessageList(`Comparando ${array[mid]} con ${targetValue}...`);

        await pause(500); // Pausa para visualización

        if (array[mid] === targetValue) {
            circles[mid].style.backgroundColor = 'green'; // Resaltar éxito
            updateMessageList(`¡Valor encontrado! ${array[mid]} está en el índice ${mid}.`);
            Swal.fire({
                icon: 'success',
                title: '¡Valor encontrado!',
                text: `El valor ${targetValue} se encuentra en el índice ${mid}.`,
                confirmButtonText: 'Entendido'
            });
            return; // Terminar la búsqueda
        } else if (array[mid] < targetValue) {
            updateMessageList(`${array[mid]} es menor que ${targetValue}. Buscando en la mitad derecha.`);
            left = mid + 1; // Mover el puntero izquierdo
        } else {
            updateMessageList(`${array[mid]} es mayor que ${targetValue}. Buscando en la mitad izquierda.`);
            right = mid - 1; // Mover el puntero derecho
        }

        await pause(500); // Pausa para el siguiente paso
    }

    // Si no se encuentra el valor
    updateMessageList(`El valor ${targetValue} no se encuentra en el array.`);
    Swal.fire({
        icon: 'info',
        title: 'Búsqueda Terminada',
        text: `El valor ${targetValue} no se encuentra en el array.`,
        confirmButtonText: 'Entendido'
    });
}


function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


function isArraySorted(arr) {
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < arr[i - 1]) {
            return false;
        }
    }
    return true;
}


function binarySearchStep() {
    if (!stepActive || left > right) {
        if (left > right) {
            updateMessageList(`El valor ${targetValue} no se encuentra en el array.`);
            Swal.fire({
                icon: 'info',
                title: 'Búsqueda Terminada',
                text: `El valor ${targetValue} no se encuentra en el array.`,
                confirmButtonText: 'Entendido'
            });
        }
        stepActive = false;
        return;
    }

    mid = Math.floor((left + right) / 2);
    const circles = document.getElementsByClassName('array-circle');
    clearHighlights();

    // Resaltar elemento actual
    circles[mid].style.backgroundColor = 'yellow';
    updateMessageList(`Paso: Comparando ${array[mid]} con ${targetValue}.`);

    if (array[mid] === targetValue) {
        circles[mid].style.backgroundColor = 'green';
        updateMessageList(`¡Valor encontrado! ${array[mid]} está en el índice ${mid}.`);
        Swal.fire({
            icon: 'success',
            title: '¡Valor encontrado!',
            text: `El valor ${targetValue} se encuentra en el índice ${mid}.`,
            confirmButtonText: 'Entendido'
        });
        stepActive = false;
    } else if (array[mid] < targetValue) {
        left = mid + 1;
        updateMessageList(`${array[mid]} es menor que ${targetValue}. Buscando en la mitad derecha.`);
    } else {
        right = mid - 1;
        updateMessageList(`${array[mid]} es mayor que ${targetValue}. Buscando en la mitad izquierda.`);
    }
}

function updateMessageList(text) {
    const messageList = document.getElementById('message-list');
    const listItem = document.createElement('li');
    listItem.textContent = text;
    messageList.appendChild(listItem);

    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.add('show');
}

function clearHighlights() {
    const circles = document.getElementsByClassName('array-circle');
    Array.from(circles).forEach(circle => {
        circle.style.backgroundColor = '#3498db';
    });
}

function resetBinarySearch() {
    left = 0;
    right = array.length - 1;
    stepActive = false;
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = '';
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.remove('show');
    clearHighlights();
}

function startBinarySearch() {
    targetValue = parseInt(document.getElementById('search-value').value);
    if (isNaN(targetValue)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no válido',
            text: 'Introduce un número válido.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    left = 0;
    right = array.length - 1;
    stepActive = true;
    updateMessageList('Iniciando búsqueda binaria...');
    binarySearchStep();
}

function binarySearchStep() {
    if (!stepActive || left > right) {
        if (left > right) {
            updateMessageList(`El valor ${targetValue} no se encuentra en el array.`);
            Swal.fire({
                icon: 'info',
                title: 'Búsqueda Terminada',
                text: `El valor ${targetValue} no se encuentra en el array.`,
                confirmButtonText: 'Entendido'
            });
        }
        stepActive = false;
        return;
    }

    mid = Math.floor((left + right) / 2);
    const circles = document.getElementsByClassName('array-circle');
    clearHighlights();

    // Resaltar elemento actual
    circles[mid].style.backgroundColor = 'blue';
    updateMessageList(`Paso: Comparando ${array[mid]} con ${targetValue}.`);

    if (array[mid] === targetValue) {
        circles[mid].style.backgroundColor = 'green';
        updateMessageList(`¡Valor encontrado! ${array[mid]} está en el índice ${mid}.`);
        Swal.fire({
            icon: 'success',
            title: '¡Valor encontrado!',
            text: `El valor ${targetValue} se encuentra en el índice ${mid}.`,
            confirmButtonText: 'Entendido'
        });
        stepActive = false;
    } else if (array[mid] < targetValue) {
        left = mid + 1;
        updateMessageList(`${array[mid]} es menor que ${targetValue}. Buscando en la mitad derecha.`);
    } else {
        right = mid - 1;
        updateMessageList(`${array[mid]} es mayor que ${targetValue}. Buscando en la mitad izquierda.`);
    }
}

function resetMessages() {
    const messageList = document.getElementById('message-list'); // Lista de mensajes
    messageList.innerHTML = ''; // Borrar todo el contenido

    const messageContainer = document.getElementById('message-container'); // Contenedor principal
    messageContainer.classList.remove('show'); // Ocultar el contenedor
}


/*

let array = [];
// Variables de control para el estado de la búsqueda binaria
let left, right, targetValue, stepActive, currentMid;
let isArrayGenerated = false; 

// Función para generar un array desordenado de valores aleatorios
function generateArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de generar un nuevo array

    // Generar un array de 10 valores aleatorios entre 50 y 250 sin ordenar
    array = [];
    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 200) + 50;
        array.push(value);
    }

    // Crear elementos visuales para cada valor en el array
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


// Función para verificar si el array está ordenado
function isArraySorted() {
    for (let i = 0; i < array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            return false; // Si algún elemento está fuera de orden, el array no está ordenado
        }
    }
    return true; // El array está ordenado
}


// Función para ordenar el array cuando el usuario hace clic en el botón
function orderlist() {
    array.sort((a, b) => a - b); // Ordenar el array en orden ascendente
    renderOrderedArray(); // Renderizar el array ordenado en la pantalla
}

// Función asincrónica para realizar una búsqueda binaria en el array
async function binarySearch() {
    const searchValue = parseInt(document.getElementById('search-value').value); // Obtener el valor de búsqueda ingresado
    const circles = document.getElementsByClassName('array-circle'); // Obtener los elementos visuales del array
    
    // Verificar si el valor ingresado es un número válido
    if (isNaN(searchValue)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no válido',
            text: 'Por favor, introduce un número válido.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

      // Verificar si el array está ordenado antes de realizar la búsqueda
      if (!isArraySorted()) {
        Swal.fire({
            icon: 'warning',
            title: 'Lista Desordenada',
            text: 'La búsqueda binaria requiere una lista ordenada. Por favor, ordena la lista antes de continuar.',
            confirmButtonText: 'Ordenar Lista'
        });
        return; // Detener la búsqueda si el array no está ordenado
    }

    // Reinicia los colores de todos los círculos antes de iniciar la búsqueda
    for (let circle of circles) {
        circle.style.backgroundColor = '#3498db';
    }

    // Variables iniciales para la búsqueda binaria
    let left = 0; // Índice del límite izquierdo
    let right = array.length - 1; // Índice del límite derecho
    let found = false; // Variable para indicar si el valor fue encontrado

    // Ciclo que se ejecuta mientras haya un rango válido en el array
    while (left <= right) {
        // Calcular el índice del elemento medio
        let mid = Math.floor((left + right) / 2);
        
        // Resaltar el elemento medio en amarillo para visualización
        circles[mid].style.backgroundColor = '#004494';

        // Pausa de 500 ms para permitir que el usuario vea el paso actual
        await new Promise(resolve => setTimeout(resolve, 500));

        // Comparar el valor del elemento medio con el valor buscado
        if (array[mid] === searchValue) {
            // Si el valor es igual al valor buscado, resaltar en verde
            circles[mid].style.backgroundColor = 'green';
            
            // Mostrar un mensaje de éxito indicando la posición
            Swal.fire({
                icon: 'success',
                title: '¡Valor encontrado!',
                text: `El valor ${searchValue} se encuentra en el índice ${mid}.`,
                confirmButtonText: 'Entendido'
            });
            found = true; // Marcar como encontrado
            break; // Terminar el ciclo
        } else {
            // Si el valor no coincide, restaurar el color original del círculo
            circles[mid].style.backgroundColor = '#3498db';

            // Ajustar los límites de búsqueda para reducir el rango
            if (array[mid] > searchValue) {
                right = mid - 1; // Si el valor medio es mayor, ignorar la mitad derecha
            } else {
                left = mid + 1; // Si el valor medio es menor, ignorar la mitad izquierda
            }
        }
    }

    // Si el valor no fue encontrado después de recorrer todos los pasos
    if (!found) {
        Swal.fire({
            icon: 'info',
            title: 'No encontrado',
            text: `El valor ${searchValue} no se encuentra en el array.`,
            confirmButtonText: 'OK'
        });
    }
}

// Vincular el botón "Paso anterior" a una alerta, ya que aún no implementamos esta función
document.getElementById('previousStepBinary').onclick = function() {
    Swal.fire({
        icon: 'info',
        title: 'Función no disponible',
        text: 'La funcionalidad de retroceso aún no está implementada.',
        confirmButtonText: 'OK'
    });
};




function renderOrderedArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';

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







function startBinarySearch() {
    targetValue = parseInt(document.getElementById('search-value').value);
    if (isNaN(targetValue)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no válido',
            text: 'Introduce un número válido.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    if (!isArraySorted()) {
        Swal.fire({
            icon: 'warning',
            title: 'Lista Desordenada',
            text: 'Ordena la lista antes de continuar.',
            confirmButtonText: 'Ordenar Lista'
        });
        return;
    }

    left = 0;
    right = array.length - 1;
    stepActive = true;
    document.getElementById('step-container').innerHTML = ''; // Limpiar pasos anteriores

    binarySearchStep();
}

function binarySearchStep() {
    if (!stepActive || left > right) {
        // Verificar si la búsqueda ha terminado sin encontrar el valor
        if (!stepActive) {
            Swal.fire({
                icon: 'info',
                title: 'Búsqueda Terminada',
                text: `El valor ${targetValue} no se encuentra en el array.`,
                confirmButtonText: 'Entendido'
            });
        }
        return;
    }

    currentMid = Math.floor((left + right) / 2);

    // Crear y mostrar el estado actual del array en una nueva línea
    createStepContainer(array, currentMid);

    // Verificar si se ha encontrado el valor
    if (array[currentMid] === targetValue) {
        Swal.fire({
            icon: 'success',
            title: '¡Valor encontrado!',
            text: `El valor ${targetValue} se encuentra en el índice ${currentMid}.`,
            confirmButtonText: 'Entendido'
        });
        stepActive = false; // Finalizar búsqueda
    } else {
        // Ajustar los límites para el siguiente paso
        if (array[currentMid] > targetValue) {
            right = currentMid - 1;
        } else {
            left = currentMid + 1;
        }

        // Si hemos agotado los pasos sin encontrar el valor
        if (left > right) {
            Swal.fire({
                icon: 'info',
                title: 'Búsqueda Terminada',
                text: `El valor ${targetValue} no se encuentra en el array.`,
                confirmButtonText: 'Entendido'
            });
            stepActive = false; // Finalizar búsqueda
        }
    }
}


// Función para crear una línea de paso, mostrando el array completo y resaltando el índice actual
function createStepContainer(fullArray, highlightIndex) {
    const stepContainer = document.getElementById('step-container');

    // Crear un nuevo contenedor para la línea del paso actual
    const newStep = document.createElement('div');
    newStep.classList.add('step-array-container');

    fullArray.forEach((value, index) => {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container');

        const circle = document.createElement('div');
        circle.classList.add('array-circle');
        circle.innerText = value;

        // Resaltar el índice actual si coincide con highlightIndex
        if (index === highlightIndex) {
            circle.style.backgroundColor = '#004494';
        }

        circleContainer.appendChild(circle);
        newStep.appendChild(circleContainer);
    });

    // Agregar el nuevo contenedor de paso al contenedor principal
    stepContainer.appendChild(newStep);
}



document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById('search-value');
    searchInput.value = 0;
});

*/