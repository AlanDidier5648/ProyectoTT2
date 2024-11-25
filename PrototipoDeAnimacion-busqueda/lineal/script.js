let array = [];
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
