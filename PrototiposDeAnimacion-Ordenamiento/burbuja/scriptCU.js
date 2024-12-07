document.getElementById('checkAnswers')?.addEventListener('click', () => {
    const form = document.getElementById('quizForm');
    const correctAnswers = {
        question1: "b",
        question2: "b",
        question3: "a",
        question4: "b",
        question5: "a"
    };

    let allCorrect = true;

    // Validar las respuestas
    for (const question in correctAnswers) {
        const userAnswer = form[question]?.value;
        if (userAnswer !== correctAnswers[question]) {
            allCorrect = false;
            break;
        }
    }

    if (allCorrect) {
        Swal.fire({
            icon: 'success',
            title: '¡Correcto!',
            text: 'Has respondido todas las preguntas correctamente. Puedes pasar al siguiente algoritmo',
        }).then(() => {
            sessionStorage.setItem('quizCompleted', 'true'); // Guarda el estado del cuestionario
            window.location.href = "../../pages/ordenamiento.html"; // Redirige a la página de animación
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Respuestas incorrectas',
            text: 'Por favor, revisa tus respuestas e intenta nuevamente.',
        });
    }
});


