
  // js
  function cargarSobre() {
    let contentDiv = document.getElementById('contentJs');
    let cursosObject = document.createElement('object');
    cursosObject.setAttribute('data', '/sobreCursos/js.html');
    cursosObject.setAttribute('width', '100%');
    cursosObject.setAttribute('height', '100%');
    contentDiv.innerHTML = ''; // Limpiar contenido anterior
    contentDiv.appendChild(cursosObject);
  }
  
  function cargarContenido() {
    let contentDiv = document.getElementById('contentJs');
    let cursosObject = document.createElement('object');
    cursosObject.setAttribute('data', '/contenido/contenido4.html');
    cursosObject.setAttribute('width', '100%');
    cursosObject.setAttribute('height', '100%');
    contentDiv.innerHTML = ''; // Limpiar contenido anterior
    contentDiv.appendChild(cursosObject);
  }