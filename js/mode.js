(
    ()=>{
        // valor del boton, el body y los elementos para realizarles casting de background 
        const body    = document.querySelector('body'),
              btnMode = body.querySelector('#mode'),
              iconMode = body.querySelector('#iconMode'),
              title   = body.querySelector('#title'),
              textVacio = body.querySelector('#textVacio'),
              taskContainer = body.querySelector('#task-container');

        btnMode.addEventListener('click', ()=>{
            body.classList.toggle('body-black');
            title.classList.toggle('title-clear');
            taskContainer.classList.toggle('task__container--clear');
            textVacio.classList.toggle('aside__text--clear');

            if(body.className){
                iconMode.src = './icons/luna.png';
            }else{
                iconMode.src = './icons/sol.png';
            }
        })

    }
)();