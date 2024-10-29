// Seleccionar los elementos necesarios
const numCountInput = document.getElementById("numCount");
const dynamicInputsContainer = document.getElementById("dynamicInputs");
const searchValueInput = document.getElementById("searchValue");

let numbers = []; // Almacenará los números generados
let target; // Número a buscar
let currentStep = 0; // Controlará el paso actual
let low, high, mid; // Variables de búsqueda binaria

// Función para inicializar inputs en 0 al cargar la página
function initializeInputs() {
    searchValueInput.value = 0;
    numCountInput.value = 0;
}

// Función para generar inputs dinámicos
function generateDynamicInputs() {
    dynamicInputsContainer.innerHTML = ""; // Limpiar inputs anteriores

    const count = parseInt(numCountInput.value, 10); // Obtener el número solicitado

    // Verificar si el número excede el límite de 10
    if (count > 10) {
        Swal.fire({
            title: 'Límite excedido',
            text: 'Solo puedes generar un máximo de 10 números.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
        return;
    }

    // Crear los nuevos inputs dinámicos
    const inputs = [];
    for (let i = 0; i < count; i++) {
        const input = document.createElement("input");
        input.type = "number";
        input.classList.add("dynamic-input");
        input.placeholder = `Núm. ${i + 1}`;
        dynamicInputsContainer.appendChild(input);
        inputs.push(input);
    }

    // Animar los inputs generados
    anime({
        targets: inputs,
        translateY: [-20, 0],
        opacity: [0, 1],
        duration: 50,
        delay: anime.stagger(50)
    });
}

// Función para generar números aleatorios en inputs dinámicos
function generateRandomNumbersInInputs() {
    const dynamicInputs = document.querySelectorAll("#dynamicInputs input");

    // Asignar un valor aleatorio entre 0 y 100 a cada input
    dynamicInputs.forEach(input => {
        input.value = Math.floor(Math.random() * 101); // Número aleatorio entre 0 y 100
    });
}

// Función para poner en cero todos los inputs
function clearAllInputs() {
    // Poner en cero el input de "Número a buscar" y "Cantidad de números"
    document.getElementById("searchValue").value = 0;
    document.getElementById("numCount").value = 0;

    // Poner en cero todos los inputs generados dinámicamente
    const dynamicInputs = document.querySelectorAll("#dynamicInputs input");
    dynamicInputs.forEach(input => {
        input.value = 0;
    });
}

// Función para mostrar los números generados en figuras animadas
function displayAnimatedFigures() {
    const animatedContainer = document.getElementById("animatedNumbersContainer");
    animatedContainer.innerHTML = ""; // Limpiar el contenedor

    const dynamicInputs = document.querySelectorAll("#dynamicInputs input");

    dynamicInputs.forEach(input => {
        const number = input.value;
        const figure = document.createElement("div");
        figure.classList.add("animated-figure");
        figure.innerText = number;
        animatedContainer.appendChild(figure);
        console.log("Figura creada con número:", number); // Verificar creación
    });

    // Aplicar animación a las figuras con anime.js
    anime({
        targets: '.animated-figure',
        translateY: [-50, 0],
        opacity: [0, 1],
        scale: [0.5, 1],
        duration: 600,
        delay: anime.stagger(100)
    });
}


function initializeBinarySearch() {
    numbers = Array.from(document.querySelectorAll("#dynamicInputs input")).map(input => parseInt(input.value, 10));
    numbers.sort((a, b) => a - b); // Ordenar los números para la búsqueda binaria
    target = parseInt(document.getElementById("searchValue").value, 10); // Número que se buscará
    low = 0;
    high = numbers.length - 1;
    currentStep = 0;
    displayAnimatedFigures(); // Crear las figuras con los números ordenados
}

function nextStep() {
    if (low <= high) {
        mid = Math.floor((low + high) / 2);

        // Animar la figura en análisis
        animateCurrentStep(mid);

        if (numbers[mid] === target) { 
            highlightFound(mid); // Resaltar si se encuentra el número
            return;
        } else if (numbers[mid] < target) {
            low = mid + 1; // Mover el límite inferior
        } else {
            high = mid - 1; // Mover el límite superior
        }
    } else {
        showNotFound(); // Mensaje si no se encuentra el número
    }
}


// Animación del paso actual en la búsqueda binaria
function animateCurrentStep(mid) {
    const figures = document.querySelectorAll(".animated-figure");

    // Cambiar todos los números a un color neutro gris
    figures.forEach(figure => {
        anime({
            targets: figure,
            backgroundColor: '#ccc',
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });

    // Aplicar color distintivo solo al número en el paso actual
    anime({
        targets: figures[mid],
        backgroundColor: '#FFA500', // Naranja para el número en análisis
        duration: 500,
        direction: 'alternate',
        easing: 'easeInOutQuad'
    });
}

function highlightFound(mid) {
    const figure = document.querySelectorAll(".animated-figure")[mid];
    anime({
        targets: figure,
        backgroundColor: '#00FF00', // Color verde si se encuentra el número
        duration: 700,
        easing: 'easeInOutQuad'
    });
}


// Función para resaltar solo el número encontrado y mostrar un mensaje
function highlightFound() {
    const figures = document.querySelectorAll(".animated-figure");
    const targetValue = parseInt(document.getElementById("searchValue").value, 10);

    // Cambiar todos los números a color neutro
    figures.forEach(figure => {
        anime({
            targets: figure,
            backgroundColor: '#ccc',
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });

    // Aplicar color dorado solo al número encontrado
    figures.forEach(figure => {
        if (parseInt(figure.innerText, 10) === targetValue) {
            anime({
                targets: figure,
                backgroundColor: '#FFD700',
                duration: 700,
                easing: 'easeInOutQuad'
            });
        }
    });

    // Mensaje de confirmación usando SweetAlert
    Swal.fire({
        title: '¡Número Encontrado!',
        text: 'El número ingresado ha sido encontrado.',
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}



// Función para poner en cero todos los inputs y borrar las figuras animadas
function clearAllInputs() {
    // Poner en cero el input de "Número a buscar" y "Cantidad de números"
    document.getElementById("searchValue").value = 0;
    document.getElementById("numCount").value = 0;

    // Poner en cero todos los inputs generados dinámicamente
    const dynamicInputs = document.querySelectorAll("#dynamicInputs input");
    dynamicInputs.forEach(input => {
        input.value = 0;
    });

    // Limpiar el contenedor de figuras animadas
    document.getElementById("animatedNumbersContainer").innerHTML = "";
}

// Función de simulación del algoritmo de búsqueda binaria
function simulateBinarySearch() {
    initializeBinarySearch();

    const interval = setInterval(() => {
        if (low <= high) {
            mid = Math.floor((low + high) / 2);
            animateCurrentStep(mid);

            if (numbers[mid] === target) { 
                highlightFound(mid);
                clearInterval(interval); // Detener la simulación si el número se encuentra
                return;
            } else if (numbers[mid] < target) {
                low = mid + 1; // Mover el límite inferior
            } else {
                high = mid - 1; // Mover el límite superior
            }
        } else {
            clearInterval(interval);
            showNotFound(); // Mostrar mensaje si no se encuentra el número
        }
    }, 1000); // Tiempo de espera entre pasos, ajustable para velocidad
}

// Función para resaltar el número encontrado y mostrar un mensaje de éxito
// Función para resaltar exclusivamente el número encontrado y dejar los demás en color neutro
function highlightFound() {
    const figures = document.querySelectorAll(".animated-figure");
    const targetValue = parseInt(document.getElementById("searchValue").value, 10); // Número objetivo

    // Cambiar todos los números a un color neutro
    figures.forEach(figure => {
        anime({
            targets: figure,
            backgroundColor: '#ccc', // Color neutro gris para todos los números
            duration: 500,
            easing: 'easeInOutQuad'
        });
    });

    // Buscar y resaltar solo el número que coincide con el valor del input
    figures.forEach(figure => {
        const figureValue = parseInt(figure.innerText, 10); // Convertir el texto en número

        if (figureValue === targetValue) {
            // Aplicar color distintivo únicamente al número encontrado
            anime({
                targets: figure,
                backgroundColor: '#FFD700', // Color dorado para el número encontrado
                duration: 700,
                easing: 'easeInOutQuad'
            });
        }
    });

    // Mostrar mensaje de confirmación usando SweetAlert
    Swal.fire({
        title: '¡Número Encontrado!',
        text: `El número ingresado ha sido encontrado.`,
        icon: 'success',
        confirmButtonText: 'Entendido'
    });
}



// Agrega el botón de simulación
document.getElementById("simulateButton").onclick = simulateBinarySearch;


// Asignar la función al botón de limpiar
document.getElementById("clearInputs").onclick = clearAllInputs;

// Función para generar números aleatorios y luego mostrar las figuras animadas
function generateRandomNumbers() {
    generateRandomNumbersInInputs(); // Llama a la función para generar números aleatorios en los inputs
    displayAnimatedFigures(); // Muestra las figuras animadas con los valores generados
}

// Asignar la función al botón de "Generar Números Aleatorios"
document.getElementById("generateRandom").onclick = generateRandomNumbers;

// Asignar la función al botón de limpiar
document.getElementById("clearInputs").onclick = clearAllInputs;

// Llamar a la función de inicialización al cargar la página
window.addEventListener("load", initializeInputs);

// Escuchar cambios en el input de cantidad de números para generar dinámicamente los inputs
numCountInput.addEventListener("input", generateDynamicInputs);

document.getElementById("nextButton").onclick = nextStep;
// Asignación para un botón de "Paso anterior" en caso de implementación futura
// document.getElementById("prevButton").onclick = previousStep; 
// Asignar las funciones a los botones

document.getElementById("prevButton").onclick = function() {
    // Podemos implementar una función de retroceso aquí en el futuro si deseas
};