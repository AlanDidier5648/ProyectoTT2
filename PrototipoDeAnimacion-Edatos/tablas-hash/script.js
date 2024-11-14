const tableSize = 10;
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
