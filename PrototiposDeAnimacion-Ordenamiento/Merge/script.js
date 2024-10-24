// Inicializa Chart.js
const ctx = document.getElementById('bubbleChart').getContext('2d');
let data = []; // Inicializamos el array vacío
let mergeSteps = []; // Almacena los pasos del algoritmo de merge sort
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

// Función para ordenar por merge paso a paso y registrar los índices
function mergeSortStepByStep(arr) {
    let steps = [];

    function merge(arr, left, mid, right) {
        let n1 = mid - left + 1;
        let n2 = right - mid;

        let L = new Array(n1);
        let R = new Array(n2);

        for (let i = 0; i < n1; i++) L[i] = arr[left + i];
        for (let i = 0; i < n2; i++) R[i] = arr[mid + 1 + i];

        let i = 0, j = 0, k = left;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            steps.push({ array: [...arr], compared: [k] });
            k++;
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            steps.push({ array: [...arr], compared: [k - 1] });
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            steps.push({ array: [...arr], compared: [k - 1] });
        }
    }

    function mergeSort(arr, left, right) {
        if (left < right) {
            let mid = Math.floor((left + right) / 2);

            mergeSort(arr, left, mid);
            mergeSort(arr, mid + 1, right);
            merge(arr, left, mid, right);
        }
    }

    mergeSort(arr, 0, arr.length - 1);
    return steps;
}

// Función para mostrar el paso actual y cambiar el color de las barras comparadas
function showStep(stepIndex) {
    const step = mergeSteps[stepIndex]; // Obtener el paso actual
    const comparedIndexes = step.compared; // Índices de los números comparados

    // Creamos una copia del array de colores donde todas las barras serán de color estándar
    let barColors = new Array(step.array.length).fill('rgba(75, 192, 192, 0.8)'); // Color estándar (turquesa)

    // Cambiamos el color de los números que se están comparando a escarlata brillante
    comparedIndexes.forEach(index => {
        barColors[index] = 'rgba(255, 36, 0, 0.8)'; // Escarlata brillante para los números comparados
    });

    // Actualizamos los datos y los colores en el gráfico
    bubbleChart.data.datasets[0].data = step.array; // Actualiza los datos
    bubbleChart.data.datasets[0].backgroundColor = barColors; // Actualiza los colores de las barras
    bubbleChart.update(); // Refresca el gráfico

    const narration = document.getElementById('narration');
    const compared = comparedIndexes.map(i => step.array[i]).join(', ');
    narration.innerHTML = `Paso ${stepIndex + 1}: Comparando elementos: ${compared}`;

    // Agregar el paso a la lista con animación
    const stepList = document.getElementById('stepList');
    const listItem = document.createElement('li');
    listItem.innerText = `Paso ${stepIndex + 1}: Comparando ${compared}`;
    stepList.appendChild(listItem);

    // Añadir la clase `.show` después de un pequeño retraso para activar la animación
    setTimeout(() => {
        listItem.classList.add('show');
    }, 100); // Retraso para que se note la animación
}

// Funciones de control de pasos
document.getElementById('prevButton').addEventListener('click', prevStep);

document.getElementById('nextButton').addEventListener('click', nextStep);

// Función que se ejecuta al presionar "Paso siguiente"
function nextStep() {
    // Asegurarse de que los datos se tomen directamente desde los inputs
    const inputs = document.querySelectorAll('#dynamicInputs input');
    inputs.forEach((input, index) => {
        let value = parseInt(input.value) || 0;
        data[index] = value;  // Actualizar el array `data` con los valores actuales de los inputs
    });

    // Verificar si los pasos del algoritmo ya fueron generados
    if (mergeSteps.length === 0) {
        // Si no hay pasos generados, ejecutamos el algoritmo con los datos actuales
        mergeSteps = mergeSortStepByStep(data);
        currentStep = 0; // Reiniciamos los pasos
    }

    if (currentStep < mergeSteps.length - 1) {
        currentStep++;
        showStep(currentStep); // Mostrar el siguiente paso
    }
}

// Retroceder al paso anterior
function prevStep() {
    if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
    }
}

// Función para limpiar todos los inputs generados y poner los valores de las barras en cero
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

// Función para iniciar el algoritmo de ordenamiento por Merge Sort
function startSorting() {
    mergeSteps = mergeSortStepByStep(data); // Genera los pasos del algoritmo de Merge Sort
    currentStep = 0; // Reiniciar el contador de pasos
    showStep(currentStep); // Mostrar el primer paso
}

// Iniciar el algoritmo cuando se generen los números aleatorios
document.getElementById('generateRandom').addEventListener('click', function() {
    generateRandomNumbers(); // Genera los números aleatorios
    startSorting(); // Inicia el algoritmo de Merge Sort paso a paso
});

// Inicializar el algoritmo al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    startSorting(); // Inicia el algoritmo de Merge Sort
});
