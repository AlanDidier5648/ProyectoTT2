let array = [];



// Función para generar y mostrar un array de valores aleatorios
function generateArray() {
    const container = document.getElementById('array-container'); // Contenedor para los elementos visuales del array
    container.innerHTML = ''; // Limpiar el contenedor antes de generar un nuevo array

    // Crear un array de 10 elementos con valores aleatorios entre 50 y 250
    array = [];
    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 200) + 50; // Genera un número aleatorio entre 50 y 250
        array.push(value); // Agrega el valor al array
    }
    array.sort((a, b) => a - b); // Ordena el array en orden ascendente, necesario para la búsqueda binaria

    // Crear elementos visuales (círculos) para cada valor en el array
    array.forEach(value => {
        const circleContainer = document.createElement('div');
        circleContainer.classList.add('array-circle-container'); // Contenedor para cada círculo

        const circle = document.createElement('div');
        circle.classList.add('array-circle'); // Círculo que representa un valor en el array
        circle.innerText = value; // Mostrar el valor dentro del círculo

        circleContainer.appendChild(circle); // Agregar el círculo a su contenedor
        container.appendChild(circleContainer); // Agregar el contenedor de círculos al contenedor principal
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
        circles[mid].style.backgroundColor = 'yellow';

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
