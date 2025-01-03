let array = [];
let targetValue = null;
let currentIndex = 0; // Índice actual para la búsqueda lineal
let stepActive = false;

// Genera los círculos e inputs al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    updateCircleCount(); // Genera los círculos con el valor inicial de 10
});

function clearMessageContainer() {
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''; // Limpiar los mensajes
    const messageContainer = document.getElementById('message-container');
    messageContainer.classList.remove('show'); // Ocultar el contenedor si estaba visible
}

function pause(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function startLinearSearch() {
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

    clearHighlights(); // Limpia cualquier resaltado previo
    clearMessageContainer(); // Limpia mensajes anteriores

    updateMessageList('Iniciando búsqueda lineal...');

    const circles = document.getElementsByClassName('array-circle');

    // Recorre automáticamente el array
    for (let i = 0; i < array.length; i++) {
        // Resaltar el círculo actual
        circles[i].style.backgroundColor = 'blue';
        updateMessageList(`Paso: Comparando ${array[i]} con ${targetValue}.`);

        await pause(500); // Pausa para la animación

        if (array[i] === targetValue) {
            circles[i].style.backgroundColor = 'green'; // Marca como encontrado
            updateMessageList(`¡Valor encontrado! ${array[i]} está en el índice ${i}.`);

            Swal.fire({
                icon: 'success',
                title: '¡Búsqueda completada!',
                text: `El valor ${targetValue} se encuentra en el índice ${i}.`,
                confirmButtonText: 'Entendido'
            });

            return; // Termina la búsqueda si se encuentra el valor
        } else {
            circles[i].style.backgroundColor = '#3498db'; // Restaurar el color si no coincide
        }
    }

    // Si el valor no se encuentra
    updateMessageList(`El valor ${targetValue} no se encuentra en el array.`);
    Swal.fire({
        icon: 'info',
        title: 'Búsqueda completada',
        text: `El valor ${targetValue} no se encuentra en el array.`,
        confirmButtonText: 'Entendido'
    });
}



function linearSearchStep() {
    if (!stepActive || currentIndex >= array.length) {
        updateMessageList(`El valor ${targetValue} no se encuentra en el array.`);
        Swal.fire({
            icon: 'info',
            title: 'Búsqueda Terminada',
            text: `El valor ${targetValue} no se encuentra en el array.`,
            confirmButtonText: 'Entendido'
        });
        stepActive = false;
        return;
    }

    const circles = document.getElementsByClassName('array-circle');
    clearHighlights();

    // Resaltar el círculo actual
    circles[currentIndex].style.backgroundColor = 'blue';
    updateMessageList(`Paso: Comparando ${array[currentIndex]} con ${targetValue}.`);

    if (array[currentIndex] === targetValue) {
        circles[currentIndex].style.backgroundColor = 'green';
        updateMessageList(`¡Valor encontrado! ${array[currentIndex]} está en el índice ${currentIndex}.`);
        Swal.fire({
            icon: 'success',
            title: '¡Valor encontrado!',
            text: `El valor ${targetValue} se encuentra en el índice ${currentIndex}.`,
            confirmButtonText: 'Entendido'
        });
        stepActive = false;
    } else {
        updateMessageList(`${array[currentIndex]} no es igual a ${targetValue}. Continuando con el siguiente elemento.`);
        currentIndex++; // Avanzar al siguiente índice
    }
}

function generateRandomNumbers() {
    if (array.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'No hay círculos generados',
            text: 'Primero debes ingresar la cantidad de elementos.',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    array = array.map(() => Math.floor(Math.random() * 100) + 1); // Generar números aleatorios entre 1 y 100
    updateCircleValues(); // Actualizar los valores visuales en los círculos
}

function updateCircleCount() {
    const countInput = document.getElementById('circle-count');
    const count = parseInt(countInput.value) || 0;

    if (count > 10) {
        // Notificar al usuario que el máximo es 10
        Swal.fire({
            icon: 'warning',
            title: 'Límite excedido',
            text: 'Solo se pueden agregar hasta 10 números.',
            confirmButtonText: 'Entendido'
        });

        // Restablecer el valor a 10
        countInput.value = 10;
        return;
    }

    const arrayContainer = document.getElementById('array-container');

    // Limpia el contenedor antes de generar nuevos elementos
    arrayContainer.innerHTML = '';
    array = Array(count).fill(null); // Inicializa el array con valores nulos

    for (let i = 0; i < count; i++) {
        const circleContainer = document.createElement('div');
        circleContainer.className = 'array-circle-container';

        // Círculo vacío
        const circle = document.createElement('div');
        circle.className = 'array-circle';
        circle.dataset.index = i; // Identificador para cada círculo
        circle.textContent = ''; // Inicialmente vacío

        // Input debajo del círculo
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'dynamic-input';
        input.dataset.index = i; // Identificador para cada input

        // Agrega evento para reflejar el valor en el círculo y array
        input.addEventListener('input', (event) => {
            const index = event.target.dataset.index;
            const value = event.target.value;

            // Actualiza el array y el círculo visual
            array[index] = value ? parseInt(value) : null;
            document.querySelector(`.array-circle[data-index="${index}"]`).textContent = value;
        });

        // Agrega los elementos al contenedor
        circleContainer.appendChild(circle);
        circleContainer.appendChild(input);
        arrayContainer.appendChild(circleContainer);
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
        circle.style.backgroundColor = '#3498db'; // Restaurar el color base
    });
}

function updateCircleValues() {
    const circles = document.getElementsByClassName('array-circle');
    array.forEach((value, index) => {
        circles[index].textContent = value !== null ? value : ''; // Mostrar el valor o dejar vacío
    });
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

