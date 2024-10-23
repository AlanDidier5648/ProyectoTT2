// scripts.js




function toggleSidebar() {
    // Obtiene la barra lateral
    var sidebar = document.querySelector('.sidebar');
    
    // Alterna la clase 'hidden' que oculta la barra lateral
    sidebar.classList.toggle('hidden');
    
    // Ajusta el ancho del contenido principal
    var mainContent = document.querySelector('.main-content');
    if (sidebar.classList.contains('hidden')) {
        mainContent.style.width = "100%";
    } else {
        mainContent.style.width = "75%";
    }

    // Cambiar la flecha del botón
    var toggleBtn = document.querySelector('.toggle-btn');
    if (sidebar.classList.contains('hidden')) {
        toggleBtn.innerHTML = '&#9654;'; // Flecha hacia la derecha (mostrar)
    } else {
        toggleBtn.innerHTML = '&#9664;'; // Flecha hacia la izquierda (ocultar)
    }
}


// Cambiar el contenido para el tema de Algoritmos de Ordenamiento
function mostrarOrdenamiento() {
    document.getElementById("titulo-principal").textContent = "Algoritmos de ordenamiento";
    document.getElementById("descripcion-principal").textContent = "Seleccione un algoritmo de ordenamiento para comenzar.";
    document.getElementById("contenido-principal").innerHTML = `
        <div class="algorithm-card">Burbuja</div>
        <div class="algorithm-card">Inserción</div>
        <div class="algorithm-card">Selección</div>
        <div class="algorithm-card">Rápido</div>
        <div class="algorithm-card">Montículos</div>
    `;
}

// Cambiar el contenido para el tema de Búsqueda en Lista
function mostrarBusqueda() {
    document.getElementById("titulo-principal").textContent = "Algoritmos de búsqueda en lista";
    document.getElementById("descripcion-principal").textContent = "Seleccione un algoritmo de búsqueda para comenzar.";
    document.getElementById("contenido-principal").innerHTML = `
        <div class="algorithm-card">Búsqueda Lineal</div>
        <div class="algorithm-card">Búsqueda Binaria</div>
    `;
}
