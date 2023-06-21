document.addEventListener('DOMContentLoaded', function() {
    let hash = window.location.hash;
    if (hash) {
      let targetElement = document.querySelector(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });