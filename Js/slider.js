let slides = document.getElementsByClassName('slide');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

// === AUDIO SYSTEM (Synthesized Sounds) ===
class SoundManager {
    constructor() {
        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.enabled = true;
    }

    playTone(freq, type, duration) {
        if (!this.enabled) return;
        const oscillator = this.ctx.createOscillator();
        const gainNode = this.ctx.createGain();
        
        oscillator.type = type;
        oscillator.frequency.value = freq;
        
        oscillator.connect(gainNode);
        gainNode.connect(this.ctx.destination);
        
        oscillator.start();
        
        // Fade out
        gainNode.gain.setValueAtTime(0.1, this.ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        oscillator.stop(this.ctx.currentTime + duration);
    }

    playClick() { this.playTone(400, 'sine', 0.1); }
    playSuccess() { 
        this.playTone(600, 'sine', 0.1); 
        setTimeout(() => this.playTone(800, 'sine', 0.2), 100);
    }
    playError() { 
        this.playTone(200, 'sawtooth', 0.2); 
        setTimeout(() => this.playTone(150, 'sawtooth', 0.2), 150);
    }
    playFanfare() {
        [523, 659, 783, 1046].forEach((freq, i) => {
            setTimeout(() => this.playTone(freq, 'square', 0.3), i * 150);
        });
    }
}
const audio = new SoundManager();

// === PERSISTENCE (LocalStorage) ===
const COURSE_ID = window.location.pathname.split('/').pop().replace('.html', ''); // e.g., 'temasIntro'

function saveProgress(slideIndex) {
    localStorage.setItem(`progress_${COURSE_ID}`, slideIndex);
    // Also update global course completion % if needed later
}

function loadProgress() {
    const saved = localStorage.getItem(`progress_${COURSE_ID}`);
    return saved ? parseInt(saved, 10) : 0;
}

// === QUIZ LOGIC ===
function checkQuiz(slideIndex) {
  const currentSlideEl = slides[slideIndex];
  const quizContainer = currentSlideEl.querySelector('.quiz-container');

  if (!quizContainer) return true;

  const correctOption = quizContainer.querySelector('.option-btn.correct');
  if (correctOption && correctOption.classList.contains('selected')) {
    audio.playSuccess();
    return true;
  }

  audio.playError();
  alert('❌ Respuesta incorrecta. Inténtalo de nuevo.');
  return false;
}

function initQuizzes() {
  const options = document.querySelectorAll('.option-btn');
  options.forEach(btn => {
    btn.addEventListener('click', function () {
      audio.playClick();
      const parent = this.parentElement;
      parent.querySelectorAll('.option-btn').forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
      });

      this.classList.add('selected');

      if (this.dataset.correct === "true") {
        this.classList.add('correct');
      } else {
        this.classList.add('incorrect');
      }
    });
  });
}

// === CELEBRATION LOGIC ===
function showCelebration() {
  audio.playFanfare();
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
  
  // Mark course as fully complete
  localStorage.setItem(`completed_${COURSE_ID}`, 'true');
}

function closeCelebration() {
  window.location.href = '../Index.html';
}

function createConfetti() {
  const colors = ['#57C5B6', '#159895', '#1A5F7A', '#FFD700', '#FF6347'];
  for (let i = 0; i < 150; i++) { // More confetti
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
  }
}

// === SLIDER LOGIC ===
function showSlide(slideIndex) {
  // Bounds check
  if (slideIndex < 0) slideIndex = 0;
  if (slideIndex >= slides.length) slideIndex = slides.length - 1;

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }

  slides[slideIndex].classList.add('active');
  currentSlide = slideIndex;
  
  // Save specific slide progress
  saveProgress(currentSlide);

  if (slideIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  // Update Next Button Text/Action
  if (slideIndex === slides.length - 1) {
    nextBtn.innerHTML = 'Finalizar Curso';
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', finishCourse);
  } else {
    nextBtn.innerHTML = 'Siguiente Lección';
    nextBtn.replaceWith(nextBtn.cloneNode(true));
    nextBtn = document.getElementById('nextBtn');
    nextBtn.addEventListener('click', nextSlide);
  }
  
  // Re-select prevBtn in case of DOM shifts (though not replaced here)
  prevBtn = document.getElementById('prevBtn');
}

function nextSlide() {
  audio.playClick();
  if (checkQuiz(currentSlide)) {
    if (currentSlide < slides.length - 1) {
      currentSlide++;
      showSlide(currentSlide);
    }
  }
}

function prevSlide() {
  audio.playClick();
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

// Load saved progress
currentSlide = loadProgress();
showSlide(currentSlide);

window.closeCelebration = closeCelebration;
