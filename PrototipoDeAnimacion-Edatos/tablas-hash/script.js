document.addEventListener("DOMContentLoaded", () => {
    const tablaHash = document.getElementById("tabla-hash");
    const btnInsertar = document.getElementById("btn-insertar");
    const btnAbierto = document.getElementById("btn-abierto");
    const btnCerrado = document.getElementById("btn-cerrado");
    const inputKey = document.getElementById("input-key");
    const inputValue = document.getElementById("input-value");
    const selectorHash = document.getElementById("funcion-hash-selector");

    const tamañoTabla = 10; // Tamaño fijo de la tabla hash
    const tabla = new Array(tamañoTabla).fill(null); // Inicializar tabla vacía
    let metodoColision = "abierto"; // Por defecto, hashing abierto
    let funcionHashSeleccionada = "sumaAscii"; // Función hash por defecto

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
        Swal.fire({
            icon: 'info',
            title: 'Método de Colisión',
            text: 'Hashing Abierto activado.',
            timer: 2000,
            showConfirmButton: false,
        });
    });

    btnCerrado.addEventListener("click", () => {
        metodoColision = "cerrado";
        Swal.fire({
            icon: 'info',
            title: 'Método de Colisión',
            text: 'Hashing Cerrado activado.',
            timer: 2000,
            showConfirmButton: false,
        });
    });

    // Insertar llave-valor en la tabla hash
    btnInsertar.addEventListener("click", () => {
        const llave = inputKey.value.trim();
        const valor = inputValue.value.trim();

        if (!llave || !valor) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresa una llave y un valor.',
                confirmButtonText: 'Entendido',
            });
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

        Swal.fire({
            icon: 'success',
            title: 'Elemento Insertado',
            text: `Se insertó el par [${llave}, ${valor}] en el índice ${indice}.`,
            timer: 2500,
            showConfirmButton: false,
        });
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
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Tabla Hash llena, no se puede insertar.',
                    confirmButtonText: 'Entendido',
                });
                return;
            }
        }

        tabla[i] = { llave, valor }; // Insertar en el índice disponible
        const celda = tablaHash.children[i];
        celda.classList.add("ocupada");
        celda.innerHTML = `<span class="llave">${llave}</span><span class="valor">${valor}</span>`;

        Swal.fire({
            icon: 'success',
            title: 'Elemento Insertado',
            text: `Se insertó el par [${llave}, ${valor}] en el índice ${i}.`,
            timer: 2500,
            showConfirmButton: false,
        });
    }

    // Función hash basada en suma de valores ASCII
    function hashTexto(texto, tamaño) {
        let suma = 0;
        for (let i = 0; i < texto.length; i++) {
            suma += texto.charCodeAt(i); // Sumar valores ASCII
        }
        return suma % tamaño; // Retornar índice hash
    }

     // Definir funciones hash
     const funcionesHash = {
        sumaAscii: (clave) => {
            return clave.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % tamañoTabla;
        },
        multiplicacionAscii: (clave) => {
            const factor = 31; // Factor de multiplicación
            return clave.split("").reduce((acc, char) => acc + char.charCodeAt(0) * factor, 0) % tamañoTabla;
        },
        hashingPolinomico: (clave) => {
            const p = 31; // Base
            const m = 1e9 + 9; // Número primo grande
            return clave.split("").reduce((acc, char, i) => {
                return (acc + (char.charCodeAt(0) * Math.pow(p, i))) % m;
            }, 0) % tamañoTabla;
        },
        longitudClave: (clave) => {
            return clave.length % tamañoTabla;
        },
    };

    // Obtener la función hash seleccionada
    const obtenerFuncionHash = () => {
        const seleccion = selectorHash.value;
        return funcionesHash[seleccion] || funcionesHash.sumaAscii;
    };

    // Insertar en la tabla hash
    btnInsertar.addEventListener("click", () => {
        const clave = inputKey.value.trim();
        const valor = inputValue.value.trim();

        if (!clave || !valor) {
            Swal.fire("Error", "Por favor ingresa una clave y un valor.", "error");
            return;
        }

        const funcionHash = obtenerFuncionHash();
        const indice = funcionHash(clave);

        if (metodoColision === "abierto") {
            if (!tabla[indice]) {
                tabla[indice] = [];
            }
            tabla[indice].push({ clave, valor });

            // Actualizar visualización
            const celda = document.querySelector(`.celda[data-index='${indice}']`);
            const elemento = document.createElement("div");
            elemento.classList.add("elemento");
            elemento.textContent = `(${clave}, ${valor})`;
            celda.appendChild(elemento);

            Swal.fire("Elemento insertado", `(${clave}, ${valor}) insertado en índice ${indice}.`, "success");
        } else {
            Swal.fire("Error", "Hashing cerrado aún no implementado.", "error");
        }
    });
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