/**
 * Clase que se agrega al body tras 500ms, lo que permite realizar animaciones en 2 pasos con ella en todos los elementos que la llamen en css
 */

window.setTimeout(function(){

    document.body.classList.add('step-0');
  
}, 500);




let menuIcon = document.querySelector('.menu-toggle');
let menuContent = document.querySelector('.menu-content');
let mainContentToggle = document.querySelector('.main-content');
let backButton = document.querySelector('.back-button');

/**
 * Menú desplegable con toggle, permite abrir el menú y que el contenido principal se oculte.
 */

menuIcon.addEventListener('click', function (){

    menuContent.classList.toggle('active');
    mainContentToggle.classList.toggle('disabled');
    backButton.classList.toggle('disabled');

    if(menuContent.classList.contains('active')){
        window.setTimeout(function(){

            document.body.classList.add('step-1');
          
        }, 100);
    } else{
        document.body.classList.remove('step-1');
    }
});

/**
 * Funcionamiento de hacer scroll arrastrando con el cursor (drag)
 */

document.addEventListener('DOMContentLoaded', function () {

    const ele = document.getElementById('main-content');
    ele.style.cursor = 'grab';
    let pos = {top: 0, left: 0, x: 0, y: 0};

    //Función para permitir scroll con rueda del ratón en horizontal
    window.addEventListener('wheel', function (e){
        if(e.deltaY > 0){
            ele.scrollLeft += 100;
        }else{
            ele.scrollLeft -= 100;
        }
    });
    
    // Función para que al hacer clic en un elemento devuelva al inicio del scroll
     backButton.addEventListener('click', function (e){
        if(ele.scrollLeft > 0){
           /*  pos = {top: 0, left: 0, x: 0, y: 0};
            ele.scrollLeft = pos.x;
            ele.scrolTop = pos.y; */
            e.preventDefault();
            ele.scroll({
                top: 0,
                left: 0,
                behavior: "smooth"
            });
        }
    });


    // Función para recoger los datos de posición del scroll y del cursor
    const mouseDownHandler = function (e) {
        ele.style.cursor = 'grabbing';
        ele.style.userSelect = 'none';

        pos = {
            // Scroll actual
            left: ele.scrollLeft,
            top: ele.scrollTop,
            // Posición del cursor
            x: e.clientX,
            y: e.clientY,
        };
    
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    };


    // Función que habiendo recogido los datos de posición del cursor, calcula el espacio recorrido para permitir scrollear a ese punto
    const mouseMoveHandler = function (e) {

        // Distancia recorrida por el cursor

        const dx = e.clientX - pos.x;
        const dy = e.clientY - pos.y;

        //Scroll el elemento

        ele.scrollTop = pos.top - dy;
        ele.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
    };

    ele.addEventListener('mousedown', mouseDownHandler);
    
});
