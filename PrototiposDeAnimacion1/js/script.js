document.addEventListener('DOMContentLoaded', () => {
    const cantidadInput = document.getElementById('cantidad');
    const numeroInputsDiv = document.getElementById('numero-inputs');
    const generarNumerosBtn = document.getElementById('generar-numeros');
    const iniciarBurbujaBtn = document.getElementById('iniciar-burbuja');
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
      mostrarNumerosEnAnimacion();
    }
  
    // Mostrar los números en el área de animación
    function mostrarNumerosEnAnimacion() {
      animacionArea.innerHTML = ''; // Limpiar el área de animación
      const inputs = numeroInputsDiv.querySelectorAll('input');
      inputs.forEach(input => {
        const numberBox = document.createElement('div');
        numberBox.className = 'number-box';
        numberBox.textContent = input.value;
        animacionArea.appendChild(numberBox);
      });
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
  
    // Función del algoritmo de burbuja con animación usando GSAP
    function burbujaAnimada(numeros) {
      const boxes = document.querySelectorAll('.number-box');
      let i = 0;
      let j = 0;
  
      // Función que intercambia dos elementos visualmente usando GSAP
      function intercambiar(pos1, pos2) {
        return new Promise(resolve => {
          // Cambiar de color los dos elementos que se están comparando
          boxes[pos1].style.backgroundColor = '#FFD700'; // Amarillo para los comparados
          boxes[pos2].style.backgroundColor = '#FFD700';
  
          // Animar visualmente el intercambio usando GSAP
          gsap.to(boxes[pos1], { x: 100, duration: 0.5 });
          gsap.to(boxes[pos2], { x: -100, duration: 0.5, onComplete: () => {
              // Intercambiar contenido después de la animación
              let temp = boxes[pos1].textContent;
              boxes[pos1].textContent = boxes[pos2].textContent;
              boxes[pos2].textContent = temp;
  
              // Restaurar posiciones con GSAP
              gsap.to(boxes[pos1], { x: 0, duration: 0.5 });
              gsap.to(boxes[pos2], { x: 0, duration: 0.5, onComplete: () => {
                // Volver al color original después del intercambio
                boxes[pos1].style.backgroundColor = '#4CAF50'; // Verde para normal
                boxes[pos2].style.backgroundColor = '#4CAF50'; // Verde para normal
                resolve();
              }});
            }
          });
        });
      }
  
      // Función principal que ejecuta el algoritmo paso a paso
      async function ejecutarBurbuja() {
        for (i = 0; i < numeros.length; i++) {
          for (j = 0; j < numeros.length - i - 1; j++) {
            if (numeros[j] > numeros[j + 1]) {
              // Intercambiar en el array numérico
              let temp = numeros[j];
              numeros[j] = numeros[j + 1];
              numeros[j + 1] = temp;
  
              // Intercambiar visualmente con animación GSAP
              await intercambiar(j, j + 1);
            }
          }
          // Después de cada pasada, el último número está en su lugar correcto
          boxes[numeros.length - i - 1].style.backgroundColor = '#32CD32'; // Verde claro para ordenados
        }
        // Finalmente, el primer número también está en su lugar correcto
        boxes[0].style.backgroundColor = '#32CD32'; // Verde claro para el último ordenado
      }
  
      // Llamar a la función para ejecutar el algoritmo de burbuja
      ejecutarBurbuja();
    }
  
   // Iniciar la animación del algoritmo de burbuja
iniciarBurbujaBtn.addEventListener('click', () => {
  const inputs = numeroInputsDiv.querySelectorAll('input');
  let numeros = [];
  inputs.forEach(input => numeros.push(parseInt(input.value)));

  // Evitar que se vuelvan a crear los números, solo iniciar la animación
  burbujaAnimada(numeros);
});

  });
  