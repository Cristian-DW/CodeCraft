function cargarSobre() {
    let contentDiv = document.getElementById('contentIntro');
    let cursosObject = document.createElement('object');
    cursosObject.setAttribute('data', '/sobreCursos/introduccion.html');
    cursosObject.setAttribute('width', '100%');
    cursosObject.setAttribute('height', '100%');
    contentDiv.innerHTML = ''; // Limpiar contenido anterior
    contentDiv.appendChild(cursosObject);
  }
  
  function cargarContenido() {
    let contentDiv = document.getElementById('contentIntro');
    let cursosObject = document.createElement('object');
    cursosObject.setAttribute('data', '/contenido/contenido1.html');
    cursosObject.setAttribute('width', '100%');
    cursosObject.setAttribute('height', '100%');
    contentDiv.innerHTML = ''; // Limpiar contenido anterior
    contentDiv.appendChild(cursosObject);
  }
  