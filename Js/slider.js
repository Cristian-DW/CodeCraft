let slides = document.getElementsByClassName('slide');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

// === QUIZ LOGIC ===
function checkQuiz(slideIndex) {
  const currentSlideEl = slides[slideIndex];
  const quizContainer = currentSlideEl.querySelector('.quiz-container');

  // If no quiz on this slide, allow proceed
  if (!quizContainer) return true;

  // Check if correct answer is selected
  const correctOption = quizContainer.querySelector('.option-btn.correct');
  if (correctOption && correctOption.classList.contains('selected')) {
    return true;
  }

  alert('Por favor, selecciona la respuesta correcta para continuar.');
  return false;
}

function initQuizzes() {
  const options = document.querySelectorAll('.option-btn');
  options.forEach(btn => {
    btn.addEventListener('click', function () {
      // Deselect siblings
      const parent = this.parentElement;
      parent.querySelectorAll('.option-btn').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
      });

      // Select clicked
      this.classList.add('selected');

      // Check correctness immediatley (Visual Feedback)
      if (this.dataset.correct === "true") {
        this.classList.add('correct');
      } else {
        this.classList.add('incorrect');
      }
    });
  });
}
// ==================

// === CELEBRATION LOGIC ===
function showCelebration() {
  // Create Overlay if not exists
  let overlay = document.getElementById('celebration-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'celebration-overlay';
    overlay.className = 'celebration-overlay';
    overlay.innerHTML = `
            <div class="celebration-content">
                <h2 style="font-size: 2.5rem; color: var(--primary-dark); margin-bottom: 1rem;">¡Felicidades! 🎉</h2>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">Has completado este curso exitosamente.</p>
                <button class="btn btn-primary" onclick="closeCelebration()">Volver a los Cursos</button>
            </div>
        `;
    document.body.appendChild(overlay);
  }

  overlay.style.display = 'flex';
  createConfetti();
}

function closeCelebration() {
  window.location.href = '../Index.html';
}

function createConfetti() {
  const colors = ['#57C5B6', '#159895', '#1A5F7A', '#FFD700', '#FF6347'];
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => confetti.remove(), 5000);
  }
}
// =========================


function showSlide(slideIndex) {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }

  slides[slideIndex].classList.add('active');

  if (slideIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (slideIndex === slides.length - 1) {
    nextBtn.innerHTML = 'Finalizar Curso';
    // Remove old listeners to prevent stacking
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    nextBtn = document.getElementById('nextBtn'); // Re-select
    nextBtn.addEventListener('click', finishCourse);
  } else {
    nextBtn.innerHTML = 'Siguiente Lección';
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    nextBtn = document.getElementById('nextBtn'); // Re-select
    nextBtn.addEventListener('click', nextSlide);
  }

  // Re-attach prev listener since we cloned buttons
  prevBtn = document.getElementById('prevBtn');
  // Avoid re-attaching if it persists, but safer to re-attach if button was replaced (not replaced here, but for consistency)
}

function nextSlide() {
  if (checkQuiz(currentSlide)) {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    showSlide(currentSlide);
  }
}

function finishCourse() {
  if (checkQuiz(currentSlide)) {
    showCelebration();
  }
}

// Init
prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
initQuizzes();
showSlide(currentSlide);
window.closeCelebration = closeCelebration; // Global scope for HTML onclick
