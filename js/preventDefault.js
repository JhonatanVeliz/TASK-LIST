(
    ()=>{

        // valor del formulario
        const form = document.querySelector('#form');
        
        // Previniendo el comportamiento del navegador
        form.addEventListener('submit', (e)=>{
            e.preventDefault();
        })
        
    }
)();