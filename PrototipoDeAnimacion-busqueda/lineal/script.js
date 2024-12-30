
let array = [];
let currentIndex = 0; // Índice actual en la búsqueda lineal
let stepActive = false; // Control del estado de la búsqueda paso a paso
let targetValue = null; // Definir como variable global

// Generar un array desordenado de valores aleatorios
function generateArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = ''; // Limpiar el contenedor antes de generar un nuevo array

    // Generar un array de 10 valores aleatorios entre 50 y 250
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

    // Reiniciar estado de búsqueda
    resetLinearSearch();
}

function updateMessageList(text) {
    const messageList = document.getElementById('message-list');

    // Crear un nuevo elemento de lista
    const listItem = document.createElement('li');
    listItem.textContent = text;

    // Agregar animación emergente
    listItem.classList.add('highlight'); // Clase para destacar inicialmente
    messageList.appendChild(listItem);

    // Mostrar el contenedor de mensajes
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.add('show');

    // Eliminar la clase 'highlight' después de la animación
    setTimeout(() => {
        listItem.classList.remove('highlight');
    }, 500); // Duración de la animación
}


function clearMessageContainer() {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''; // Limpiar los mensajes
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.remove('show'); // Ocultar el contenedor si estaba visible
}


// Validar que el array esté completo antes de iniciar la búsqueda
function startLinearSearch() {
    if (array.includes(null)) {
        Swal.fire({
            icon: 'error',
            title: 'Faltan valores',
            text: 'Asegúrate de completar todos los números antes de iniciar la animación.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

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

    stepActive = true;
    currentIndex = 0; // Reiniciar la búsqueda
    clearHighlights(); // Limpiar cualquier resaltado previo
    updateMessageList('Iniciando búsqueda...'); // Mensaje inicial
    linearSearchStep(); // Llamar al primer paso
}

function linearSearchStep() {
    if (!stepActive || currentIndex >= array.length) {
        if (currentIndex >= array.length) {
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

    const circles = document.getElementsByClassName('array-circle');
    clearHighlights(); // Limpiar resaltados previos
    circles[currentIndex].style.backgroundColor = 'blue'; // Resaltar elemento actual

    // Agregar mensaje del paso actual
    updateMessageList(`Paso ${currentIndex + 1}: Comparando ${array[currentIndex]} con ${targetValue}.`);

    if (array[currentIndex] === targetValue) {
        circles[currentIndex].style.backgroundColor = 'green'; // Resaltar éxito
        updateMessageList(`¡Valor encontrado! ${array[currentIndex]} coincide con el valor objetivo.`);
        Swal.fire({
            icon: 'success',
            title: '¡Valor encontrado!',
            text: `El valor ${targetValue} se encuentra en el índice ${currentIndex}.`,
            confirmButtonText: 'Entendido'
        });
        stepActive = false;
    } else {
        currentIndex++; // Avanzar al siguiente índice
    }
}

// Búsqueda automática con pausa entre pasos
async function linearSearch() {
    const searchValue = parseInt(document.getElementById('search-value').value);
    const circles = document.getElementsByClassName('array-circle');

    if (isNaN(searchValue)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no válido',
            text: 'Introduce un número válido.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    let found = false;
    clearHighlights(); // Limpiar cualquier resaltado previo

    for (let i = 0; i < array.length; i++) {
        circles[i].style.backgroundColor = 'blue'; // Resaltar elemento actual
        await new Promise(resolve => setTimeout(resolve, 500)); // Pausa para visualización

        if (array[i] === searchValue) {
            circles[i].style.backgroundColor = 'green'; // Resaltar éxito
            Swal.fire({
                icon: 'success',
                title: '¡Valor encontrado!',
                text: `El valor ${searchValue} se encuentra en el índice ${i}.`,
                confirmButtonText: 'Entendido'
            });
            found = true;
            break;
        } else {
            circles[i].style.backgroundColor = '#3498db'; // Restaurar color
        }
    }

    if (!found) {
        Swal.fire({
            icon: 'info',
            title: 'No encontrado',
            text: `El valor ${searchValue} no se encuentra en el array.`,
            confirmButtonText: 'OK'
        });
    }
}

// Limpiar resaltados
function clearHighlights() {
    const circles = document.getElementsByClassName('array-circle');
    Array.from(circles).forEach(circle => {
        circle.style.backgroundColor = '#3498db'; // Color base
    });
}

// Reiniciar mensajes y estado de búsqueda
function resetLinearSearch() {
    currentIndex = 0;
    stepActive = false;
    clearHighlights(); // Limpiar cualquier resaltado previo

    // Limpiar lista de mensajes
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''; // Vaciar la lista
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.remove('show');
}


function validateCircleCount() {
    const circleCount = parseInt(document.getElementById('circle-count').value);
    const container = document.getElementById('array-container');

    // Limpiar el contenedor del array
    container.innerHTML = '';

    if (isNaN(circleCount) || circleCount <= 0) {
        return; // Si no es válido, no hacemos nada
    }

    if (circleCount > 10) {
        Swal.fire({
            icon: 'error',
            title: '¡Número demasiado alto!',
            text: 'Solo se permite un máximo de 10 círculos.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Crear inputs y círculos en el `array-container`
    array = new Array(circleCount).fill(null); // Inicializar el array con valores nulos
    for (let i = 0; i < circleCount; i++) {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container');

        // Crear un círculo vacío
        const circle = document.createElement('div');
        circle.classList.add('array-circle');
        circle.innerText = ''; // Vacío inicialmente

        // Crear un input asociado
        const input = document.createElement('input');
        input.type = 'number';
        input.classList.add('dynamic-input');
        input.placeholder = `Número ${i + 1}`;
        input.oninput = () => updateCircleValue(i, input.value);

        // Agregar el círculo y el input al contenedor
        circleContainer.appendChild(circle);
        circleContainer.appendChild(input);

        // Agregar el contenedor al `array-container`
        container.appendChild(circleContainer);
    }
}

function updateCircleValue(index, value) {
    const circles = document.getElementsByClassName('array-circle');
    if (value) {
        circles[index].innerText = value; // Actualizar número en el círculo
        array[index] = parseInt(value); // Actualizar el array interno
    } else {
        circles[index].innerText = ''; // Vaciar si el input está vacío
        array[index] = null; // Reiniciar valor en el array interno
    }
}



/*let array = [];
// Variables de control para el estado de la búsqueda binaria
let left, right, targetValue,  currentMid;
let isArrayGenerated = false; 
// Variables globales para el estado de la búsqueda lineal
let currentIndex = 0; // Índice actual en la búsqueda lineal
let stepActive = false; // Control del estado de la búsqueda paso a paso

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

// Vincular el botón "Paso anterior" a una alerta, ya que aún no implementamos esta función
document.getElementById('previousStepBinary').onclick = function() {
    Swal.fire({
        icon: 'info',
        title: 'Función no disponible',
        text: 'La funcionalidad de retroceso aún no está implementada.',
        confirmButtonText: 'OK'
    });
};

// Función para iniciar la búsqueda lineal paso a paso
function startLinearSearch() {
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

    stepActive = true;
    currentIndex = 0; // Reiniciar la búsqueda
    document.getElementById('step-container').innerHTML = ''; // Limpiar pasos anteriores
    linearSearchStep(); // Iniciar el primer paso
}

// Función para realizar un paso de la búsqueda lineal
function linearSearchStep() {
    if (!stepActive || currentIndex >= array.length) {
        // Si se han recorrido todos los elementos sin éxito
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

    // Obtener los elementos visuales del array
    const circles = document.getElementsByClassName('array-circle');

    // Resaltar el elemento actual
    circles[currentIndex].style.backgroundColor = 'yellow';

    // Crear y mostrar el estado actual del array
    createStepContainer(array, currentIndex);

    // Verificar si el elemento actual coincide con el valor buscado
    if (array[currentIndex] === targetValue) {
        Swal.fire({
            icon: 'success',
            title: '¡Valor encontrado!',
            text: `El valor ${targetValue} se encuentra en el índice ${currentIndex}.`,
            confirmButtonText: 'Entendido'
        });
        circles[currentIndex].style.backgroundColor = 'green';
        stepActive = false; // Finalizar búsqueda
    } else {
        // Restaurar el color si no coincide
        circles[currentIndex].style.backgroundColor = '#3498db';
        currentIndex++; // Avanzar al siguiente índice

        // Si llegamos al final sin encontrar el valor
        if (currentIndex >= array.length) {
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

async function linearSearch() {
    const searchValue = parseInt(document.getElementById('search-value').value);
    const circles = document.getElementsByClassName('array-circle'); // Asumiendo que estos son los elementos visuales

    if (isNaN(searchValue)) {
        Swal.fire({
            icon: 'error',
            title: 'Valor no válido',
            text: 'Por favor, introduce un número válido.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    let found = false;

    for (let i = 0; i < array.length; i++) {
        // Resalta el círculo que se está analizando
        circles[i].style.backgroundColor = 'yellow';

        await new Promise(resolve => setTimeout(resolve, 500)); // Pausa para visualización

        if (array[i] === searchValue) {
            circles[i].style.backgroundColor = 'green';
            Swal.fire({
                icon: 'success',
                title: '¡Valor encontrado!',
                text: `El valor ${searchValue} se encuentra en el índice ${i}.`,
                confirmButtonText: 'Entendido'
            });
            found = true;
            break;
        } else {
            circles[i].style.backgroundColor = '#3498db'; // Restaurar el color si no coincide
        }
    }

    if (!found) {
        Swal.fire({
            icon: 'info',
            title: 'No encontrado',
            text: `El valor ${searchValue} no se encuentra en el array.`,
            confirmButtonText: 'OK'
        });
    }
}
*/

