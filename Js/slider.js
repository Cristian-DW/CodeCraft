let slides = document.getElementsByClassName('slide');
let prevBtn = document.getElementById('prevBtn');
let nextBtn = document.getElementById('nextBtn');
let currentSlide = 0;

// Función para mostrar el slide actual
function showSlide(slideIndex) {
  // Ocultar todos los slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  // Mostrar el slide actual
  
  slides[slideIndex].classList.add('active');

  // Habilitar o deshabilitar botones según el índice del slide actual
  
  if (slideIndex === 0) {
    prevBtn.disabled = true;
  } else {
    prevBtn.disabled = false;
  }

  if (slideIndex === slides.length - 1) {
    nextBtn.innerHTML = 'Curso Finalizado';
    nextBtn.addEventListener('click');
  } else {
    nextBtn.innerHTML = 'Siguiente Lección';
    nextBtn.removeEventListener('click');
  }
}

// Función para avanzar al siguiente slide

function nextSlide() {
  if (currentSlide < slides.length - 1) {
    currentSlide++;
  }
  showSlide(currentSlide);
}

// Función para retroceder al slide anterior
function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
  }
  showSlide(currentSlide);
}

// Asignar eventos a los botones

prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);

// Mostrar el primer slide al cargar la página

showSlide(currentSlide);
