
let Respuestacorrecta = 'si';

function comprobarRespuestacorrecta(button, respuestausuario) {
    if (respuestausuario === Respuestacorrecta) {
        button.style.backgroundColor = '#4CAF50'; 
        document.getElementById('siguiente1id').disabled = false; 
        document.getElementById('siguiente1id').classList.add('enabled'); 
    } else {
        button.style.backgroundColor = '#f44336'; 
        document.getElementById('siguiente1id').disabled = true;
        document.getElementById('siguiente1id').classList.remove('enabled');
    }
}

function siguiente3() {
    window.location.href = '1-5.html';
}
