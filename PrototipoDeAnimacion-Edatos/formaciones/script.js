// Inicializar el array con valores nulos
const array = Array(10).fill(null);

// Función para actualizar visualmente el array
function updateArrayDisplay() {
    for (let i = 0; i < array.length; i++) {
        const valueCell = document.getElementById(`value-${i}`);
        valueCell.textContent = array[i] !== null ? array[i] : ""; // Mostrar el valor o vacío si es null
    }
}

// Función para limpiar las entradas
function clearInputs() {
    document.getElementById("input-value").value = "";
    document.getElementById("input-index").value = "";
}

// Función para insertar un valor en el arreglo
function insertArray() {
    const value = document.getElementById("input-value").value;
    const index = parseInt(document.getElementById("input-index").value, 10);

    if (index < 0 || index >= 10) {
        Swal.fire("Error", "Índice fuera de rango (0-9)", "error");
        return;
    }

    if (value === "") {
        Swal.fire("Error", "Por favor ingresa un valor válido", "error");
        return;
    }

    array[index] = value; // Actualiza el valor en el array
    updateArrayDisplay(); // Actualiza visualmente el array
    Swal.fire("Éxito", `Valor ${value} insertado en el índice ${index}`, "success");
    clearInputs(); // Limpia las entradas
}

// Función para acceder a un valor en el arreglo
function accessArray() {
    const index = parseInt(document.getElementById("input-index").value, 10);

    if (index < 0 || index >= 10) {
        Swal.fire("Error", "Índice fuera de rango (0-9)", "error");
        return;
    }

    const value = array[index];
    Swal.fire("Acceso", `El valor en el índice ${index} es ${value !== null ? value : "vacío"}`, "info");
    clearInputs(); // Limpia las entradas
}

// Función para modificar un valor en el arreglo
function modifyArray() {
    const value = document.getElementById("input-value").value;
    const index = parseInt(document.getElementById("input-index").value, 10);

    if (index < 0 || index >= 10) {
        Swal.fire("Error", "Índice fuera de rango (0-9)", "error");
        return;
    }

    if (value === "") {
        Swal.fire("Error", "Por favor ingresa un valor válido", "error");
        return;
    }

    array[index] = value; // Actualiza el valor en el array
    updateArrayDisplay(); // Actualiza visualmente el array
    Swal.fire("Modificación", `El valor en el índice ${index} se actualizó a ${value}`, "success");
    clearInputs(); // Limpia las entradas
}

// Inicializar la visualización al cargar la página
updateArrayDisplay();
