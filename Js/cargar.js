//funcion para menu desplegable de opciones del curso
(function(){
    const tituloCurso=[...document.querySelectorAll('.curso_titulo')];

    tituloCurso.forEach(cursos=>{
        cursos.addEventListener('click',()=>{
            let height=0;
            let respuesta = cursos.nextElementSibling;
            let adiccionPadding = cursos.parentElement.parentElement;

            adiccionPadding.classList.toggle('curso_padding--add');
            cursos.children[0].classList.toggle('titulo_despliegue--rotate');


            if(respuesta.clientHeight==0){
                height=respuesta.scrollHeight;
            }

            respuesta.style.height= `${height}px`;
        });
    });

})();




