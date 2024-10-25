var estado_juego = {
    vidas: 5,
    tiempo: 100,
    tiempo_max: 100,
    nivel: 1,
    intervalo_tiempo: null,
    preguntas: [
        {
            pregunta: "¿Qué es esta haciendo en el video?",
            opciones: ["si", "no", "buenos dias"],
            correcta: 2,//nunos dias
            videoURL: "/buenosdias.mp4"
        },
        {
            pregunta: "Qué es esta haciendo en el video ",
            opciones: ["buenas tardes", "Tigre", "Ciem"],
            correcta: 0,//buenas tardes
            videoURL: "/buenasnoches.mp4"
        },
        {
            pregunta: "Qué es esta haciendo en el video",
            opciones: ["peru good", "no gracias", "buenas noches"],
            correcta: 1,//no gracias
            videoURL: "/nogracias.mp4"
        },
        {
            pregunta: "Qué es esta haciendo en el video",
            opciones: [ "rapido", "Hola","adios"],
            correcta: 1,//hola
            videoURL:"/hola.mp4"
        },
        {
            pregunta: "Qué es esta haciendo en el video",
            opciones: ["buenas noches", "nuenas tardes", "gracias"],
            correcta: 2,//gracias
            videoURL: "/gracias.mp4"
        }
    ]
};

function actualizarEstadisticas() {
    document.getElementById('vidas').textContent = estado_juego.vidas;
    document.getElementById('nivel').textContent = estado_juego.nivel;
    
    var barra = document.getElementById('barra_tiempo');
    barra.style.width = estado_juego.tiempo + '%';
    
    if (estado_juego.tiempo < 30) {
        barra.classList.add('aviso_tiempo');
    } else {
        barra.classList.remove('aviso_tiempo');
    }
}

function iniciarTemporizador() {
    var velocidad = 2;
    estado_juego.intervalo_tiempo = setInterval(function() {
        estado_juego.tiempo = estado_juego.tiempo - velocidad;
        actualizarEstadisticas();
        
        if (estado_juego.tiempo <= 0) {
            finJuego();
        }
    }, 100);
}

function cargarNivel() {
    var pregunta_actual = estado_juego.preguntas[estado_juego.nivel - 1];
    document.getElementById('pregunta').textContent = pregunta_actual.pregunta;
    
    var videoElement = document.getElementById('video_nivel');
    videoElement.src = pregunta_actual.videoURL;
    videoElement.load();

    var botones = document.querySelectorAll('.opciones button');
    for(var i = 0; i < botones.length; i++) {
        botones[i].textContent = pregunta_actual.opciones[i];
    }
}

function verificarRespuesta(opcion) {
    var pregunta_actual = estado_juego.preguntas[estado_juego.nivel - 1];
    
    if (opcion === pregunta_actual.correcta) {
        estado_juego.tiempo = estado_juego.tiempo_max;
        estado_juego.nivel++;
        
        if (estado_juego.nivel > 5) {
            victoria();
            return;
        }
    } else {
        estado_juego.vidas--;
        estado_juego.tiempo = Math.max(0, estado_juego.tiempo - 20);
        
        if (estado_juego.vidas <= 0) {
            finJuego();
            return;
        }
    }
    
    actualizarEstadisticas();
    cargarNivel();
}

function finJuego() {
    clearInterval(estado_juego.intervalo_tiempo);
    document.getElementById('contenido_juego').style.display = 'none';
    document.getElementById('fin_juego').style.display = 'block';
}

function victoria() {
    clearInterval(estado_juego.intervalo_tiempo);
    document.getElementById('contenido_juego').style.display = 'none';
    document.getElementById('victoria').style.display = 'block';
}

function reiniciarJuego() {
    estado_juego.vidas = 5;
    estado_juego.tiempo = estado_juego.tiempo_max;
    estado_juego.nivel = 1;
    
    document.getElementById('contenido_juego').style.display = 'block';
    document.getElementById('fin_juego').style.display = 'none';
    document.getElementById('victoria').style.display = 'none';
    
    actualizarEstadisticas();
    cargarNivel();
    clearInterval(estado_juego.intervalo_tiempo);
    iniciarTemporizador();
}

cargarNivel();
iniciarTemporizador();