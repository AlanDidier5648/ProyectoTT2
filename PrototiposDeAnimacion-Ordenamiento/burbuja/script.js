// Inicializa Chart.js
const ctx = document.getElementById('bubbleChart').getContext('2d');
let data = []; // Inicializamos el array vacío
let steps = []; // Almacena los pasos del algoritmo
let currentStep = 0; // Controla el paso actual

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
document.getElementById('numCount').value = ''; 

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
    container.innerHTML = ''; // Limpia los inputs existentes

    data = []; 
    bubbleChart.data.labels = [];

    for (let i = 0; i < count; i++) {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Número ${i + 1}`;
        input.classList.add('dynamic-input');

        setTimeout(() => {
            input.classList.add('show');
        }, 50);

        input.addEventListener('input', function () {
            let value = parseInt(this.value) || 0;
            data[i] = value;
            bubbleChart.data.datasets[0].data = data; 
            bubbleChart.data.labels[i] = value.toString(); 
            bubbleChart.update();
        });

        container.appendChild(input);
        data.push(0);
        bubbleChart.data.labels.push('');
    }
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


// Función para iniciar el algoritmo de ordenamiento
function startSorting() {
    bubbleSortStepByStep(data); // Llamar al Bubble Sort paso a paso
    currentStep = 0; // Iniciar desde el primer paso
    showStep(currentStep); // Mostrar el primer paso
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
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ array: [...arr], compared: [j, j + 1], swap: false });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ array: [...arr], compared: [j, j + 1], swap: true });
            }
        }
    }
    console.log("Steps generated:", steps); // Verifica los pasos generados
}


function showStep(stepIndex) {
    const step = steps[stepIndex]; // Obtiene el paso actual
    const comparedIndexes = step.compared; // Índices de los números comparados

    // Creamos una copia del array de colores donde todas las barras serán de color estándar
    let barColors = new Array(step.array.length).fill('rgba(75, 192, 192, 0.8)'); // Color estándar (turquesa)

    // Cambiamos el color de los números que se están comparando a escarlata brillante
    barColors[comparedIndexes[0]] = 'rgba(255, 36, 0, 0.8)'; // Escarlata brillante para el primer número
    barColors[comparedIndexes[1]] = 'rgba(255, 36, 0, 0.8)'; // Escarlata brillante para el segundo número

    // Actualizamos los datos y los colores en el gráfico
    bubbleChart.data.datasets[0].data = step.array; // Actualiza los datos
    bubbleChart.data.datasets[0].backgroundColor = barColors; // Actualiza los colores de las barras
    bubbleChart.update(); // Refresca el gráfico

    const narration = document.getElementById('narration');
    const num1 = step.array[step.compared[0]];
    const num2 = step.array[step.compared[1]];

    // Verificar si hubo intercambio y mostrar el mensaje adecuado
    let stepMessage;
    if (step.swap) {
        stepMessage = `Se compararon ${num1} y ${num2}. Se intercambiaron.`;
    } else {
        stepMessage = `Se compararon ${num1} y ${num2}.`;
    }
    narration.innerHTML = stepMessage;

    // Actualizar las etiquetas debajo de las barras
    bubbleChart.data.labels = step.array.map(String); 
    bubbleChart.update();

    // Agregar el paso a la lista con animación
    const stepList = document.getElementById('stepList');
    const listItem = document.createElement('li');
    listItem.innerText = `Paso ${stepIndex + 1}: ${stepMessage}`;
    stepList.appendChild(listItem);

    // Añadir la clase `.show` después de un pequeño retraso para activar la animación
    setTimeout(() => {
        listItem.classList.add('show');
    }, 100); // Retraso para que se note la animación
}



// Funcionalidad paso a paso
document.getElementById('nextButton').addEventListener('click', nextStep);
document.getElementById('prevButton').addEventListener('click', prevStep);

// Avanzar al siguiente paso
function nextStep() {
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

// Retroceder al paso anterior
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}


// Iniciar el ordenamiento
function startSorting() {
    bubbleSortStepByStep(data);
    currentStep = 0;
    showStep(currentStep);
}

