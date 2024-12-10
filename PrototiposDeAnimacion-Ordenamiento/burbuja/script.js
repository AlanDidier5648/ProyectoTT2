// Inicializa Chart.js
const ctx = document.getElementById('bubbleChart').getContext('2d');
let data = []; // Inicializamos el array vacío
let steps = []; // Almacena los pasos del algoritmo
let currentStep = 0; // Controla el paso actual
// Variables para contadores
let comparisonCount = 0;
let swapCount = 0;

const bubbleChart = new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: [], // Inicialmente vacío, pero se actualizará con los valores de los inputs
        datasets: [{
            label: 'Valores',
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false // Ocultar la cuadrícula del eje x
                },
                ticks: {
                    display: true,
                    autoSkip: false, // No omitir ninguna etiqueta
                    font: {
                        size: 14
                    },
                    color: '#000' // Color de las etiquetas
                },
                border: {
                    display: false
                }
            },
            y: {
                grid: {
                    display: false // Ocultar la cuadrícula del eje y
                },
                ticks: {
                    display: false
                },
                border: {
                    display: false
                }
            }
        },
        plugins: {
            legend: {
                display: false // Ocultar la leyenda
            }
        }
    }
});


// Inicializa el input numérico sin valor al cargar la página
document.getElementById('numCount').value = '10'; 


document.addEventListener("DOMContentLoaded", () => {
    const numCountInput = document.getElementById('numCount');
    const dynamicInputsContainer = document.getElementById('dynamicInputs');

    if (numCountInput && dynamicInputsContainer) {
        const initialValue = 10;

        // Configura el valor inicial
        numCountInput.value = initialValue;

        // Genera los inputs dinámicos automáticamente
        const count = initialValue;
        dynamicInputsContainer.innerHTML = '';
        data = []; // Reinicia el array de datos
        bubbleChart.data.labels = []; // Reinicia las etiquetas del gráfico

        for (let i = 0; i < count; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.placeholder = `Número ${i + 1}`;
            input.classList.add('dynamic-input', 'show');

            // Genera valores iniciales aleatorios
            const randomValue = Math.floor(Math.random() * 100);
            input.value = randomValue;

            // Añade el input al contenedor
            dynamicInputsContainer.appendChild(input);

            // Actualiza los datos del array y las etiquetas
            data.push(randomValue);
            bubbleChart.data.labels.push(randomValue.toString());

            // Vincula el evento input para reflejar cambios en el gráfico
            input.addEventListener('input', function () {
                const value = parseInt(this.value) || 0; // Si el input queda vacío, se toma como 0
                data[i] = value; // Actualiza solo el índice correspondiente en el array de datos
                bubbleChart.data.datasets[0].data[i] = value; // Actualiza solo el valor específico en el gráfico
                bubbleChart.data.labels[i] = value.toString(); // Actualiza la etiqueta correspondiente
                bubbleChart.update(); // Refresca el gráfico
            });
        }

        // Actualiza el gráfico
        bubbleChart.data.datasets[0].data = data;
        bubbleChart.update();

        // Inicia la animación de ordenamiento con los datos generados
        startSorting(); // Llama directamente a la función de inicio de ordenamiento
    }
});



document.getElementById('numCount').addEventListener('input', function () {
    const count = parseInt(this.value) || 0;
    if (count > 10) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Solo puedes ingresar un número de hasta 10',
            confirmButtonText: 'Entendido'
        });
        this.value = 10;
        return;
    }

    const container = document.getElementById('dynamicInputs');

    // Ajusta el número de inputs visibles
    while (container.children.length > count) {
        container.removeChild(container.lastChild); // Elimina los inputs excedentes
        data.pop(); // Actualiza el array eliminando valores extras
        bubbleChart.data.datasets[0].data.pop(); // Elimina los datos del gráfico
        bubbleChart.data.labels.pop(); // Elimina las etiquetas del gráfico
    }

    while (container.children.length < count) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Número ${container.children.length + 1}`;
        input.classList.add('dynamic-input');
    
        // Genera un valor aleatorio para los nuevos inputs
        const randomValue = Math.floor(Math.random() * 100);
        input.value = randomValue;
    
        // Vincula el evento input para actualizar el valor en el gráfico
        input.addEventListener('input', function () {
            const index = Array.from(container.children).indexOf(this); // Índice del input
            const value = parseInt(this.value) || 0; // Si está vacío, toma como 0
            data[index] = value; // Actualiza el valor en el array de datos
            bubbleChart.data.datasets[0].data[index] = value; // Actualiza el gráfico
            bubbleChart.data.labels[index] = value.toString(); // Actualiza las etiquetas
            bubbleChart.update(); // Refresca el gráfico
        });
    
        // Agrega el input al contenedor
        container.appendChild(input);
    
        // Asegurarse de que la clase `show` se agregue después de un pequeño retraso
        setTimeout(() => {
            input.classList.add('show');
        }, 50);
    
        // Actualiza los datos y el gráfico
        data.push(randomValue);
        bubbleChart.data.datasets[0].data.push(randomValue);
        bubbleChart.data.labels.push(randomValue.toString());
    }

    // **Regenera los pasos del algoritmo con los datos actuales**
    bubbleSortStepByStep(data);

    // Refresca el gráfico para reflejar los cambios
    bubbleChart.update();
});




function generateRandomNumbers() {
    const inputs = document.querySelectorAll('#dynamicInputs input');
    const stepList = document.getElementById('stepList'); // Obtener la lista de pasos

    // Limpiar la lista de pasos
    stepList.innerHTML = ''; // Elimina todos los pasos anteriores de la lista

    inputs.forEach((input, index) => {
        let randomValue = Math.floor(Math.random() * 100); // Genera números aleatorios entre 0 y 100
        input.value = randomValue; // Asigna el número aleatorio al input
        data[index] = randomValue; // Actualiza el array de datos con el valor aleatorio

        // Actualizar las etiquetas debajo de las barras con los números aleatorios generados
        bubbleChart.data.labels[index] = randomValue.toString();
    });

    bubbleChart.data.datasets[0].data = data; // Actualizar las barras del gráfico con los números aleatorios
    bubbleChart.update(); // Refrescar el gráfico para mostrar los cambios
}




function finishSorting() {
    document.getElementById('narration').textContent = "¡Ordenamiento completado!";

    // Mostrar alerta SweetAlert
    Swal.fire({
        title: '¡Ordenamiento completado!',
        text: 'El algoritmo ha finalizado correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });

    // Actualiza el gráfico para reflejar el estado final ordenado
    bubbleChart.data.datasets[0].data = data; // Asegura que `data` esté ordenado
    bubbleChart.data.labels = data.map(String); // Actualiza las etiquetas debajo de las barras
    bubbleChart.update(); // Refresca el gráfico
}


// Aquí colocas el código que mencionas
document.getElementById('generateRandom').addEventListener('click', function() {
    generateRandomNumbers(); // Genera los números aleatorios
    startSorting(); // Inicia el algoritmo paso a paso con los números generados
});

// Función que registra los pasos del algoritmo
function bubbleSortStepByStep(arr) {
    // Aquí va tu lógica de Bubble Sort...
}

// Funciones de control de pasos como nextStep y prevStep


// Función para limpiar todos los inputs generados y poner los valores de las barras en cero
function clearInputs() {
    const inputs = document.querySelectorAll('#dynamicInputs input');
    inputs.forEach((input, index) => {
        input.value = ''; // Limpia el valor del input
        data[index] = 0; // Restablece el valor de los datos a 0 para las barras
    });

    // Actualizar los datos de las barras a 0
    bubbleChart.data.datasets[0].data = data.map(() => 0); // Todos los valores a 0
    bubbleChart.data.labels = data.map(() => '0'); // Actualizar las etiquetas a '0'

    bubbleChart.update(); // Refrescar el gráfico para mostrar los cambios
}





function bubbleSortStepByStep(arr) {
    steps = []; // Reinicia los pasos
    comparisonCount = 0; // Reinicia el contador de comparaciones
    swapCount = 0; // Reinicia el contador de intercambios
    let n = arr.length;

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            comparisonCount++; // Incrementa el contador de comparaciones
            steps.push({ array: [...arr], compared: [j, j + 1], swap: false }); // Registra el paso antes del intercambio
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Realiza el intercambio
                swapCount++; // Incrementa el contador de intercambios
                steps.push({ array: [...arr], compared: [j, j + 1], swap: true }); // Registra el paso después del intercambio
            }
        }
    }

    // Agrega el paso final con el array ordenado
    steps.push({ array: [...arr], compared: [], swap: false });
}





// Función para mostrar un paso del algoritmo
function showStep(stepIndex) {
    const step = steps[stepIndex]; // Obtiene el paso actual
    const comparedIndexes = step.compared; // Índices de los números comparados

    // Actualiza los contadores
    document.getElementById('comparisonCount').textContent = comparisonCount;
    if (step.swap) {
        document.getElementById('swapCount').textContent = ++swapCount; // Incrementa el contador de intercambios
    }

    // Creamos una copia del array de colores donde todas las barras serán de color estándar
    let barColors = new Array(step.array.length).fill('rgba(75, 192, 192, 0.8)'); // Color estándar (turquesa)

    // Cambiamos el color de los números que se están comparando a escarlata brillante
    barColors[comparedIndexes[0]] = 'rgba(255, 36, 0, 0.8)'; // Escarlata brillante para el primer número
    barColors[comparedIndexes[1]] = 'rgba(255, 36, 0, 0.8)'; // Escarlata brillante para el segundo número

    // Actualizamos los datos y las etiquetas en el gráfico
    bubbleChart.data.datasets[0].data = step.array; // Actualiza los datos de las barras
    bubbleChart.data.labels = step.array.map(String); // Actualiza las etiquetas con los valores actuales
    bubbleChart.data.datasets[0].backgroundColor = barColors; // Actualiza los colores de las barras

    // Actualiza el gráfico
    bubbleChart.update(); // Refresca el gráfico para reflejar los cambios

    // Actualiza la narración
    const narration = document.getElementById('narration');
    const num1 = step.array[step.compared[0]];
    const num2 = step.array[step.compared[1]];

    let stepMessage;
    if (step.swap) {
        stepMessage = `Se compararon ${num1} y ${num2}. Se intercambiaron.`;
    } else {
        stepMessage = `Se compararon ${num1} y ${num2}.`;
    }
    narration.textContent = stepMessage;

    // Agrega el paso a la lista para mostrar al final
    const stepList = document.getElementById('stepList');
    const listItem = document.createElement('li');
    listItem.innerText = `Paso ${stepIndex + 1}: ${stepMessage}`;
    stepList.appendChild(listItem);
}





// Funcionalidad paso a paso
document.getElementById('nextButton').addEventListener('click', nextStep);
document.getElementById('prevButton').addEventListener('click', prevStep);

function nextStep() {
    if (currentStep === 0) {
        syncDataWithInputs(); // Asegúrate de sincronizar antes de iniciar la animación
        bubbleSortStepByStep(data); // Genera los pasos desde el estado actual
    }

    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    } else if (currentStep === steps.length - 1) {
        finishSorting(); // Llama a finishSorting si es el último paso
    }
}




// Retroceder al paso anterior
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}


function startSorting() {
    syncDataWithInputs(); // Sincroniza los datos antes de iniciar
    bubbleSortStepByStep(data); // Regenera los pasos del algoritmo
    currentStep = 0; // Reinicia al primer paso

    // Muestra el primer paso si existen pasos
    if (steps.length > 0) {
        showStep(currentStep);
    }
}



function syncDataWithInputs() {
    const inputs = document.querySelectorAll('#dynamicInputs input');
    data = Array.from(inputs).map(input => parseInt(input.value) || 0); // Actualiza los datos con el orden actual de los inputs
    bubbleChart.data.datasets[0].data = [...data]; // Actualiza las barras del gráfico
    bubbleChart.data.labels = data.map(String); // Actualiza las etiquetas debajo de las barras
    bubbleChart.update(); // Refresca el gráfico
}



