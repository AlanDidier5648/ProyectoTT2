document.addEventListener('DOMContentLoaded', () => {
    const cantidadInput = document.getElementById('cantidad');
    const numeroInputsDiv = document.getElementById('numero-inputs');
    const generarNumerosBtn = document.getElementById('generar-numeros');
    const iniciarMergeSortBtn = document.getElementById('iniciar-mergesort');
    const animacionArea = document.getElementById('animacion-area');

    // Generar los inputs manuales para los números
    function crearInputsManuales(cantidad) {
        numeroInputsDiv.innerHTML = '';
        for (let i = 0; i < cantidad; i++) {
            const input = document.createElement('input');
            input.type = 'number';
            input.min = '1';
            input.max = '100';
            input.value = Math.floor(Math.random() * 100) + 1;
            numeroInputsDiv.appendChild(input);
        }
    }

    // Actualizar los inputs manuales cada vez que se cambie la cantidad
    cantidadInput.addEventListener('input', () => {
        crearInputsManuales(cantidadInput.value);
    });

    // Inicializar con 5 inputs al cargar la página
    crearInputsManuales(cantidadInput.value);

    // Generar números aleatorios
    generarNumerosBtn.addEventListener('click', () => {
        crearInputsManuales(cantidadInput.value);
        const inputs = numeroInputsDiv.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = Math.floor(Math.random() * 100) + 1;
        });
    });

    // Función para mostrar visualmente los números
    async function mostrarArray(arr) {
        animacionArea.innerHTML = '';
        arr.forEach(num => {
            const numberBox = document.createElement('div');
            numberBox.className = 'number-box';
            numberBox.textContent = num;
            animacionArea.appendChild(numberBox);
        });
        await new Promise(resolve => setTimeout(resolve, 500));  // Retardo para la animación
    }

  // Función para combinar dos subarrays con animación usando GSAP
async function merge(arr, start, mid, end) {
    let start2 = mid + 1;
    const boxes = document.querySelectorAll('.number-box');  // Seleccionar las cajas de números

    // Si ya está ordenado, no hacer nada
    if (start2 >= boxes.length || start >= boxes.length || arr[mid] <= arr[start2]) {
        return;
    }

    while (start <= mid && start2 <= end) {
        // Verificar que los índices no excedan el número de cajas visuales
        if (start >= boxes.length || start2 >= boxes.length) {
            console.error("Índices fuera de rango: start o start2 exceden el número de cajas.");
            break;
        }

        // Marcar las cajas como comparando
        boxes[start].classList.add('comparando');
        boxes[start2].classList.add('comparando');

        if (arr[start] <= arr[start2]) {
            start++;
        } else {
            let value = arr[start2];
            let index = start2;

            // Mover todos los elementos hacia adelante
            while (index != start) {
                arr[index] = arr[index - 1];
                index--;
            }
            arr[start] = value;

            start++;
            mid++;
            start2++;
        }

        // Evitar errores en la animación verificando la existencia de `boxes[start]` y `boxes[start2]`
        if (start < boxes.length && start2 < boxes.length) {
            // Intercambiar visualmente los elementos fusionados usando GSAP
            gsap.to(boxes[start], { x: 100, duration: 0.5 });
            gsap.to(boxes[start2], { x: -100, duration: 0.5, onComplete: () => {
                if (boxes[start] && boxes[start2]) {  // Verificar que las cajas existen
                    let temp = boxes[start].textContent;
                    boxes[start].textContent = boxes[start2].textContent;
                    boxes[start2].textContent = temp;

                    // Restaurar posiciones
                    gsap.to(boxes[start], { x: 0, duration: 0.5 });
                    gsap.to(boxes[start2], { x: 0, duration: 0.5 });
                }
            }});
        }

        await mostrarArray(arr);

        // Quitar la clase de comparando después de la comparación
        if (start - 1 >= 0 && start2 - 1 >= 0) {
            boxes[start - 1].classList.remove('comparando');
            boxes[start2 - 1].classList.remove('comparando');
        }
    }

    // Al terminar la fusión, marcar los elementos como ordenados
    for (let i = start; i <= end; i++) {
        if (i < boxes.length) {  // Verificar que el índice esté dentro de los límites
            boxes[i].classList.add('ordenado');
        }
    }
}




    // Función recursiva de Merge Sort con animación
    async function mergeSort(arr, l, r) {
        if (l < r) {
            let mid = Math.floor(l + (r - l) / 2);

            await mergeSort(arr, l, mid);
            await mergeSort(arr, mid + 1, r);

            await merge(arr, l, mid, r);
        }
    }

    // Iniciar la animación del algoritmo Merge Sort
    iniciarMergeSortBtn.addEventListener('click', () => {
        animacionArea.innerHTML = '';
        const inputs = numeroInputsDiv.querySelectorAll('input');
        let numeros = [];
        inputs.forEach(input => numeros.push(parseInt(input.value)));

        // Mostrar los números en el área de animación
        numeros.forEach(numero => {
            const numberBox = document.createElement('div');
            numberBox.className = 'number-box';
            numberBox.textContent = numero;
            animacionArea.appendChild(numberBox);
        });

        // Ejecutar el algoritmo Merge Sort con animación
        mergeSort(numeros, 0, numeros.length - 1);
    });
});
