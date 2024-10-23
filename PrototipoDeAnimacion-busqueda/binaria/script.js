let array = [];

function generateSortedArray() {
    const container = document.getElementById('array-container');
    container.innerHTML = '';

    // Generar un array ordenado de valores aleatorios
    array = [];
    for (let i = 0; i < 10; i++) {
        const value = Math.floor(Math.random() * 200) + 50; // Valores entre 50 y 250
        array.push(value);
    }

    array.sort((a, b) => a - b); // Ordenar el array

    // Crear círculos de visualización junto con los números
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

async function binarySearch() {
    const searchValue = parseInt(document.getElementById('search-value').value);
    const circles = document.getElementsByClassName('array-circle');
    
    if (isNaN(searchValue)) {
        alert("Por favor, introduce un número válido.");
        return;
    }

    let left = 0;
    let right = array.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        // Resaltar el elemento medio que se está comparando
        circles[mid].style.backgroundColor = 'yellow';

        await new Promise(resolve => setTimeout(resolve, 300)); // Pausa para visualización

        if (array[mid] === searchValue) {
            // Si encontramos el valor, resaltamos el círculo en verde
            circles[mid].style.backgroundColor = 'green';
            alert(`¡Valor ${searchValue} encontrado en el índice ${mid}!`);
            return;
        } else if (array[mid] < searchValue) {
            // Descartar la mitad izquierda
            for (let i = left; i <= mid; i++) {
                circles[i].style.backgroundColor = '#3498db'; // Restaurar color
            }
            left = mid + 1;
        } else {
            // Descartar la mitad derecha
            for (let i = mid; i <= right; i++) {
                circles[i].style.backgroundColor = '#3498db'; // Restaurar color
            }
            right = mid - 1;
        }
    }

    // Si el valor no se encuentra
    alert(`Valor ${searchValue} no encontrado en el array.`);
}


function generateRandomNumber() {
    // Generar un número aleatorio entre 1 y 100
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    
    // Asignar el número al input de búsqueda
    document.getElementById('search-value').value = randomNumber;
}


// Crear la escena
var scene = new THREE.Scene();

// Crear la cámara
var camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 1000);
camera.position.z = 50;

// Crear el renderizador y agregarlo al contenedor #threejs-container
var renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 600);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Array para guardar las esferas generadas
var spheres = [];

// Variables para el movimiento del número
var scaleDirection = 1;
var scaleFactor = 1;

// Función para crear una textura con número en un canvas
function createNumberTexture(number) {
    var canvas = document.createElement('canvas');
    canvas.width = 128;  // Canvas más grande para el número
    canvas.height = 128;
    var context = canvas.getContext('2d');

    // Fondo del canvas (opcional)
    context.fillStyle = '#3498db'; // Fondo azul
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Cambiar tamaño de fuente según el factor de escala
    context.font = `Bold ${40 * scaleFactor}px Arial`;  // Escalamos el tamaño del texto
    context.fillStyle = 'white'; // Color del texto
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(number, canvas.width / 2, canvas.height / 2);

    // Crear la textura de Three.js a partir del canvas
    var texture = new THREE.CanvasTexture(canvas);
    return texture;
}

// Función para generar números aleatorios y visualizarlos como esferas con números
function generateRandomSpheres() {
    // Elimina las esferas previas
    spheres.forEach(function (sphere) {
        scene.remove(sphere);
    });
    spheres = [];

    // Generar 10 números aleatorios
    for (let i = 0; i < 10; i++) {
        // Generar un número aleatorio entre 1 y 100
        let randomNumber = Math.floor(Math.random() * 100) + 1;

        // Crear la geometría de la esfera más grande
        let geometry = new THREE.SphereGeometry(4, 32, 32);

        // Crear la textura del número
        let texture = createNumberTexture(randomNumber);
        let material = new THREE.MeshBasicMaterial({ map: texture });
        let sphere = new THREE.Mesh(geometry, material);

        // Posición aleatoria de la esfera
        sphere.position.x = (Math.random() - 0.5) * 60;
        sphere.position.y = (Math.random() - 0.5) * 40;
        sphere.position.z = (Math.random() - 0.5) * 40;

        // Agregar la esfera a la escena
        scene.add(sphere);

        // Guardar la esfera en el array
        spheres.push(sphere);

        // Opción: Mostrar el número aleatorio en la consola
        console.log("Número aleatorio: " + randomNumber);
    }
}

// Función de animación para rotar las esferas y animar los números
function animate() {
    requestAnimationFrame(animate);

    // Cambiar el factor de escala para el número (efecto de pulsación)
    scaleFactor += 0.01 * scaleDirection;
    if (scaleFactor > 1.5 || scaleFactor < 1) {
        scaleDirection *= -1;  // Cambiar la dirección del escalado
    }

    // Rotar todas las esferas
    spheres.forEach(function (sphere, index) {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;

        // Actualizar la textura del número con el nuevo tamaño
        let randomNumber = Math.floor(Math.random() * 100) + 1;
        let texture = createNumberTexture(randomNumber);
        sphere.material.map = texture;
        sphere.material.needsUpdate = true;
    });

    // Renderizar la escena
    renderer.render(scene, camera);
}

// Iniciar la animación
animate();
