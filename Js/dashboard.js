// Dashboard Progress Manager
document.addEventListener('DOMContentLoaded', () => {
    // Select all course cards links
    const courseLinks = document.querySelectorAll('.card a');

    courseLinks.forEach(link => {
        const href = link.getAttribute('href');
        // href looks like "cursos/NodeJS.html" or "cursos/ReactJS.html"
        // Extract ID: "NodeJS" or "ReactJS"

        if (!href) return;

        // We need to map "cursos/NodeJS.html" -> the ID used in slider.js
        // In slider.js: window.location.pathname.split('/').pop().replace('.html', '')
        // So for "temario/temasNode.html", ID is "temasNode"
        // BUT, the cards on Index.html point to "cursos/NodeJS.html" (Overview pages).

        // Wait, the progress is saved in the LESSON page (temario/temasNode.html).
        // I need to know the 'temario' file name corresponding to the 'cursos' file name to find the localStorage key.

        /* 
           Mapping:
           Introduccion.html -> temasIntro
           HTML.html -> temasHtml
           CSS.html -> temasCss
           JavaScript.html -> temasJs
           NodeJS.html -> temasNode
           ReactJS.html -> temasReact
           SQL.html -> temasSQL
           GIT.html -> temasGIT
           UXUI.html -> temasUXUI
        */

        const filename = href.split('/').pop().replace('.html', '');
        let lessonId = '';

        // Map Course Page -> Lesson ID
        if (filename === 'Introduccion') lessonId = 'temasIntro';
        else if (filename === 'HTML') lessonId = 'temasHtml';
        else if (filename === 'CSS') lessonId = 'temasCss';
        else if (filename === 'JavaScript') lessonId = 'temasJs';
        else if (filename === 'NodeJS') lessonId = 'temasNode';
        else if (filename === 'ReactJS') lessonId = 'temasReact';
        else if (filename === 'SQL') lessonId = 'temasSQL';
        else if (filename === 'GIT') lessonId = 'temasGIT';
        else if (filename === 'UXUI') lessonId = 'temasUXUI';

        if (!lessonId) return;

        // Check LocalStorage
        const isComplete = localStorage.getItem(`completed_${lessonId}`);
        const progress = localStorage.getItem(`progress_${lessonId}`);

        const cardContent = link.querySelector('.card-content');

        if (isComplete === 'true') {
            const badge = document.createElement('span');
            badge.className = 'badge badge-complete';
            badge.textContent = '✅ Completado';
            cardContent.appendChild(badge);
        } else if (progress && parseInt(progress) > 0) {
            const badge = document.createElement('span');
            badge.className = 'badge badge-progress';
            badge.textContent = '🔄 En Progreso';
            cardContent.appendChild(badge);
        }
    });
});
