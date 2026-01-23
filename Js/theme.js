// Theme Manager
(function () {
    // 1. Inject Toggle Button
    const btn = document.createElement('button');
    btn.className = 'theme-toggle-btn';
    btn.innerHTML = '🌙'; // Default moon
    btn.title = 'Cambiar Modo Oscuro/Claro';
    btn.setAttribute('aria-label', 'Cambiar Tema');
    document.body.appendChild(btn);

    // 2. Logic
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        btn.innerHTML = '☀️';
    }

    // Toggle Action
    btn.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            btn.innerHTML = '☀️';
        } else {
            localStorage.setItem('theme', 'light');
            btn.innerHTML = '🌙';
        }

        // Add sound effect if SoundManager exists (from slider.js)
        if (typeof audio !== 'undefined') {
            audio.playClick();
        }
    });

})();
