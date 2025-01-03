// Clase Nodo
class Nodo {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null; // Hijo izquierdo
        this.derecho = null;   // Hijo derecho
    }
}

// Clase Árbol Binario de Búsqueda
class ArbolBinario {
    constructor() {
        this.raiz = null; // Nodo raíz del árbol
    }

    // Método para insertar un nodo
    insertar(valor) {
        const nuevoNodo = new Nodo(valor);

        if (this.raiz === null) {
            // Si el árbol está vacío, el nuevo nodo se convierte en la raíz
            this.raiz = nuevoNodo;
        } else {
            // Llamar a la función recursiva para insertar el nodo
            this.#insertarNodo(this.raiz, nuevoNodo);
        }

        // Actualizar la visualización del árbol
        this.visualizarArbol();
    }

    // Función recursiva para insertar un nodo
    #insertarNodo(nodoActual, nuevoNodo) {
        if (nuevoNodo.valor < nodoActual.valor) {
            // Insertar en el lado izquierdo
            if (nodoActual.izquierdo === null) {
                nodoActual.izquierdo = nuevoNodo;
            } else {
                this.#insertarNodo(nodoActual.izquierdo, nuevoNodo);
            }
        } else if (nuevoNodo.valor > nodoActual.valor) {
            // Insertar en el lado derecho
            if (nodoActual.derecho === null) {
                nodoActual.derecho = nuevoNodo;
            } else {
                this.#insertarNodo(nodoActual.derecho, nuevoNodo);
            }
        } else {
            // Si el valor ya existe, mostrar alerta
            Swal.fire({
                icon: 'error',
                title: 'Valor duplicado',
                text: `El valor ${nuevoNodo.valor} ya existe en el árbol.`
            });
        }
    }

    // Método para visualizar el árbol
    visualizarArbol() {
        // Limpiar el contenedor del árbol
        const contenedor = document.getElementById('tree-container');
        contenedor.innerHTML = '';

        // Dibujar el árbol usando D3.js
        if (this.raiz !== null) {
            this.#dibujarNodo(this.raiz, contenedor, 400, 30, 200);
        }
    }

    // Función recursiva para dibujar nodos con D3.js
    #dibujarNodo(nodo, contenedor, x, y, offset) {
        const circulo = document.createElement('div');
        circulo.className = 'nodo';
        circulo.textContent = nodo.valor;
        circulo.style.left = `${x}px`;
        circulo.style.top = `${y}px`;
        contenedor.appendChild(circulo);

        if (nodo.izquierdo) {
            this.#dibujarNodo(nodo.izquierdo, contenedor, x - offset, y + 70, offset / 2);
        }

        if (nodo.derecho) {
            this.#dibujarNodo(nodo.derecho, contenedor, x + offset, y + 70, offset / 2);
        }
    }
}

// Inicializar el árbol
const arbol = new ArbolBinario();

// Event listener para insertar un nodo
const botonInsertar = document.createElement('button');
botonInsertar.textContent = 'Insertar Nodo';
botonInsertar.onclick = () => {
    const valor = parseInt(prompt('Ingrese el valor del nodo:'));
    if (!isNaN(valor)) {
        arbol.insertar(valor);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Valor inválido',
            text: 'Por favor, ingrese un número válido.'
        });
    }
};
document.body.appendChild(botonInsertar);
