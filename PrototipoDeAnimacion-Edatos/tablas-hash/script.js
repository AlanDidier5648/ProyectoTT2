document.addEventListener("DOMContentLoaded", () => {
    const tablaHash = document.getElementById("tabla-hash");
    const btnInsertar = document.getElementById("btn-insertar");
    const btnAbierto = document.getElementById("btn-abierto");
    const btnCerrado = document.getElementById("btn-cerrado");
    const inputKey = document.getElementById("input-key");
    const inputValue = document.getElementById("input-value");

    const tamañoTabla = 10; // Tamaño fijo de la tabla hash
    const tabla = new Array(tamañoTabla).fill(null); // Inicializar tabla vacía
    let metodoColision = "abierto"; // Por defecto, hashing abierto

    // Crear tabla visual
    for (let i = 0; i < tamañoTabla; i++) {
        const celda = document.createElement("div");
        celda.classList.add("celda");
        celda.setAttribute("data-index", i);
        celda.innerHTML = `<span>Índice ${i}</span>`;
        tablaHash.appendChild(celda);
    }

    // Alternar entre métodos de colisión
    btnAbierto.addEventListener("click", () => {
        metodoColision = "abierto";
        alert("Hashing Abierto activado.");
    });

    btnCerrado.addEventListener("click", () => {
        metodoColision = "cerrado";
        alert("Hashing Cerrado activado.");
    });

    // Insertar llave-valor en la tabla hash
    btnInsertar.addEventListener("click", () => {
        const llave = inputKey.value.trim();
        const valor = inputValue.value.trim();

        if (!llave || !valor) {
            alert("Por favor, ingresa una llave y un valor.");
            return;
        }

        const indice = hashTexto(llave, tamañoTabla);

        if (metodoColision === "abierto") {
            insertarAbierto(indice, llave, valor);
        } else {
            insertarCerrado(indice, llave, valor);
        }
    });

    // Hashing Abierto: Manejo de colisión con listas
    function insertarAbierto(indice, llave, valor) {
        const celda = tablaHash.children[indice];

        if (!tabla[indice]) {
            tabla[indice] = []; // Crear una lista en el índice si está vacío
        }

        tabla[indice].push({ llave, valor }); // Insertar en la lista
        celda.classList.add("ocupada");
        actualizarCeldaAbierto(celda, tabla[indice]);
    }

    // Actualizar la visualización de una celda (hashing abierto)
    function actualizarCeldaAbierto(celda, lista) {
        celda.innerHTML = `<span>Índice</span>`;
        lista.forEach((elemento) => {
            const div = document.createElement("div");
            div.innerHTML = `<span class="llave">${elemento.llave}</span> - <span class="valor">${elemento.valor}</span>`;
            celda.appendChild(div);
        });
    }

    // Hashing Cerrado: Manejo de colisión con sondeo lineal
    function insertarCerrado(indice, llave, valor) {
        let i = indice;

        while (tabla[i] !== null) {
            i = (i + 1) % tamañoTabla; // Sondeo lineal
            if (i === indice) {
                alert("Tabla Hash llena, no se puede insertar.");
                return;
            }
        }

        tabla[i] = { llave, valor }; // Insertar en el índice disponible
        const celda = tablaHash.children[i];
        celda.classList.add("ocupada");
        celda.innerHTML = `<span class="llave">${llave}</span><span class="valor">${valor}</span>`;
    }

    // Función hash basada en suma de valores ASCII
    function hashTexto(texto, tamaño) {
        let suma = 0;
        for (let i = 0; i < texto.length; i++) {
            suma += texto.charCodeAt(i); // Sumar valores ASCII
        }
        return suma % tamaño; // Retornar índice hash
    }
});


/*const tableSize = 10;
const hashTable = Array.from({ length: tableSize }, () => []);

function hashFunction(value) {
    return value % tableSize;
}

function insertToHashTable() {
    const value = parseInt(document.getElementById("input-value").value);
    if (!isNaN(value)) {
        const index = hashFunction(value);
        hashTable[index].push(value);
        updateHashTableDisplay();
        document.getElementById("input-value").value = '';
    }
}

function searchInHashTable() {
    const value = parseInt(document.getElementById("input-value").value);
    if (!isNaN(value)) {
        const index = hashFunction(value);
        const found = hashTable[index].includes(value);
        if (found) {
            Swal.fire({
                icon: 'success',
                title: 'Elemento encontrado',
                text: `El valor ${value} se encuentra en el índice ${index}.`
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Elemento no encontrado',
                text: `El valor ${value} no se encontró en la tabla.`
            });
        }
        document.getElementById("input-value").value = '';
    }
}

function deleteFromHashTable() {
    const value = parseInt(document.getElementById("input-value").value);
    if (!isNaN(value)) {
        const index = hashFunction(value);
        const valueIndex = hashTable[index].indexOf(value);
        if (valueIndex !== -1) {
            hashTable[index].splice(valueIndex, 1);
            updateHashTableDisplay();
            Swal.fire({
                icon: 'success',
                title: 'Elemento eliminado',
                text: `El valor ${value} ha sido eliminado del índice ${index}.`
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Elemento no encontrado',
                text: `El valor ${value} no se encontró en la tabla.`
            });
        }
        document.getElementById("input-value").value = '';
    }
}

function updateHashTableDisplay() {
    for (let i = 0; i < tableSize; i++) {
        const cell = document.getElementById(`cell-${i}`).querySelector(".values");
        cell.innerHTML = hashTable[i].join(", ");
    }
}
*/