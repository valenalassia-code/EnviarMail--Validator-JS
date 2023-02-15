
document.addEventListener('DOMContentLoaded', () => {


    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnEnviar = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');
    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }
    inputEmail.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail);
    
    btnReset.addEventListener('click', e=> {
        e.preventDefault();
        resetFormulario();

    });

    function enviarEmail(e){
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            
            resetFormulario();
            
            const mensajeExito = document.createElement('P');
            mensajeExito.classList.add('bg-green-500','text-white','p-2', 'mt-10','font-bold','text-center','uppercase');
            mensajeExito.textContent = "Mensaje enviado correctamente";

            formulario.appendChild(mensajeExito);
            setTimeout(() => {
                mensajeExito.remove();
            }, 3000);

        }, 3000);

    }
    
    function validar(e) {

        const referencia = e.target.parentElement;
        if (e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio *`, referencia);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es válido*`, referencia);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        limpiarAlerta(referencia);

        email[e.target.name] = e.target.value.trim().toLowerCase();

        comprobarEmail();
    }
    function mostrarAlerta(msg, referencia) {
        limpiarAlerta(referencia);

        const error = document.createElement('P');
        error.textContent = msg;
        error.classList.add('bg-red-600', 'text-center', 'text-white', 'p-2');

        referencia.appendChild(error);
    }
    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }
    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }
    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnEnviar.classList.add('opacity-50');
            btnEnviar.disabled = true;
            return;
        }
        btnEnviar.classList.remove('opacity-50');
        btnEnviar.disabled = false;

    }
    function resetFormulario(){
        email.email = "";
        asunto.email = "";
        mensaje.email = "";
    
        formulario.reset();
        comprobarEmail();
    }
});