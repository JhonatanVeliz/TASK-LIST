(
    ()=>{

        //  Objeto que contiene los valores de las class para asignarlas al body
        const VALUES = {
            body_dark : 'body-black',
            title_light: 'title-light',
            task_container: 'task__container--light',
            texto_vacio : 'aside__text--light',
            icon : {
                icon_luna : './icons/luna.png',
                icon_sol  : './icons/sol.png'
            }
        };

        // valor del boton, el body y los elementos para realizarles casting de background 
        const body    = document.querySelector('body'),
              btnMode = body.querySelector('#mode'),
              iconMode = body.querySelector('#iconMode'),
              title   = body.querySelector('#title'),
              textVacio = body.querySelector('#textVacio'),
              taskContainer = body.querySelector('#task-container');

        let isActive = true;

        btnMode.addEventListener('click', ()=>{
            updateModeDark(isActive);
            return (isActive) ? isActive = false : isActive = true;
        })

        function updateModeDark(boolean) {
            const {body_dark, title_light, task_container, texto_vacio, icon} = VALUES;

            if(boolean){
                body.classList.add(body_dark);
                title.classList.add(title_light);
                taskContainer.classList.add(task_container);
                textVacio.classList.add(texto_vacio);
                iconMode.src = icon.icon_luna;

                return localStorage.setItem('mode', JSON.stringify(VALUES));
            }
            
            body.classList.remove(body_dark);
            title.classList.remove(title_light);
            taskContainer.classList.remove(task_container);
            textVacio.classList.remove(texto_vacio);
            iconMode.src = icon.icon_sol;

            localStorage.removeItem('mode');
        }

        function checkMode() {
            const mode = localStorage.getItem('mode');
            if(mode){
                return updateModeDark(true);
            }
            updateModeDark(false);
        }

        checkMode();

    }
)();