//Funcion para seleccionar elementos y agregar propiedad css

const secciones = document.getElementsByClassName('seccion');

for (let i = 0; i < secciones.length; i++) {
  secciones[i].addEventListener('click', function () {
    let seccionActualizada = this;

    if (!seccionActualizada.classList.contains('seleccionado')) {
      seccionActualizada.classList.add('seleccionado');
    } else {
      seccionActualizada.classList.remove('seleccionado');
    }

  });
}