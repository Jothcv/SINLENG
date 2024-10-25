var cartitas = [
    { num: 1, dibujito: '👋', significado: 'Hola' },
    { num: 2, dibujito: '🙏', significado: 'Por favor' },
    { num: 3, dibujito: '❤️', significado: 'Amor' },
    { num: 4, dibujito: '👍', significado: 'Bien' },
    { num: 5, dibujito: '🙅', significado: 'No' },
    { num: 6, dibujito: '👆', significado: 'Arriba' },
    { num: 7, dibujito: '👇', significado: 'Abajo' },
    { num: 8, dibujito: '🤝', significado: 'Gracias' }
];

var cosasDelJuego = {
    cartasVolteadas: [],
    paresEncontrados: 0,
    vidas: 4,
    tiempoPasado: 0,
    intervalito: null,
    puedoVoltear: false,
    mostrandoCartas: true
};

function actualizarViditas() {
    var viditas = document.getElementById('vidas');
    viditas.textContent = '❤️'.repeat(cosasDelJuego.vidas);
    
    if (cosasDelJuego.vidas <= 0) {
        mostrarMensajito('¡Perdiste! Empezando de nuevo...');
        setTimeout(function() {
            empezarJuego();
        }, 2000);
    }
}

function mostrarMensajito(texto) {
    var mensajito = document.getElementById('mensajito');
    mensajito.textContent = texto;
    mensajito.style.display = 'block';
    setTimeout(function() {
        mensajito.style.display = 'none';
    }, 2000);
}

function empezarJuego() {
    var tablero = document.getElementById('tablero');
    tablero.innerHTML = '';
    
    cosasDelJuego = {
        cartasVolteadas: [],
        paresEncontrados: 0,
        vidas: 4,
        tiempoPasado: 0,
        puedoVoltear: false,
        mostrandoCartas: true
    };

    var cartitasDelJuego = [...cartitas, ...cartitas]
        .sort(function() { return Math.random() - 0.5; })
        .map(function(carta, indice) {
            return {...carta, unicoId: indice};
        });

    cartitasDelJuego.forEach(function(carta) {
        var elementoCartita = document.createElement('div');
        elementoCartita.className = 'cartita volteada';
        elementoCartita.setAttribute('data-num', carta.num);
        elementoCartita.setAttribute('data-unico', carta.unicoId);
        
        elementoCartita.innerHTML = `
            <div class="cartita_frente">?</div>
            <div class="cartita_atras">
                <div>${carta.dibujito}</div>
                <div style="font-size: 0.5em">${carta.significado}</div>
            </div>
        `;
        
        elementoCartita.addEventListener('click', function() { 
            voltearCartita(elementoCartita); 
        });
        tablero.appendChild(elementoCartita);
    });

    document.getElementById('botonSiguiente').style.display = 'none';
    actualizarCositas();
    actualizarViditas();
    empezarTiempito();

    setTimeout(function() {
        document.querySelectorAll('.cartita').forEach(function(carta) {
            carta.classList.remove('volteada');
        });
        cosasDelJuego.mostrandoCartas = false;
        cosasDelJuego.puedoVoltear = true;
    }, 3000);
}

function voltearCartita(cartita) {
    if (!cosasDelJuego.puedoVoltear || cosasDelJuego.cartasVolteadas.length >= 2 || cartita.classList.contains('volteada') ||cosasDelJuego.cartasVolteadas.some
    (function(c) { 
            return c.getAttribute('data-unico') === cartita.getAttribute('data-unico');
        })) {
        return;
    }

    cartita.classList.add('volteada');
    cosasDelJuego.cartasVolteadas.push(cartita);

    if (cosasDelJuego.cartasVolteadas.length === 2) {
        revisarPareja();
    }
}   

function revisarPareja() {
    var carta1 = cosasDelJuego.cartasVolteadas[0];
    var carta2 = cosasDelJuego.cartasVolteadas[1];
    var sonPar = carta1.getAttribute('data-num') === carta2.getAttribute('data-num');

    cosasDelJuego.puedoVoltear = false;
    
    setTimeout(function() {
        if (sonPar) {
            cosasDelJuego.paresEncontrados++;
            carta1.style.backgroundColor = '#e8f5e9';
            carta2.style.backgroundColor = '#e8f5e9';
            revisarSiGano();
        } else {
            cosasDelJuego.vidas--;
            actualizarViditas();
            carta1.classList.remove('volteada');
            carta2.classList.remove('volteada');
        }
        
        cosasDelJuego.cartasVolteadas = [];
        cosasDelJuego.puedoVoltear = true;
        actualizarCositas();
    }, 1000);
}

function revisarSiGano() {
    if (cosasDelJuego.paresEncontrados === cartitas.length) {
        clearInterval(cosasDelJuego.intervalito);
        hacerFiesta();
        document.getElementById('botonSiguiente').style.display = 'block';
    }
}

function hacerFiesta() {
    var fiesta = document.getElementById('fiesta');
    fiesta.classList.add('activa');
    
    for (var i = 0; i < 50; i++) {
        var papelito = document.createElement('div');
        papelito.className = 'papelito';
        papelito.style.left = Math.random() * 100 + '%';
        papelito.style.backgroundColor = 'hsl(' + Math.random() * 360 + ', 80%, 50%)';
        papelito.style.animationDelay = Math.random() * 3 + 's';
        fiesta.appendChild(papelito);
    }

    mostrarMensajito('¡Ganaste! ¡Nivel completado!');

    setTimeout(function() {
        fiesta.classList.remove('activa');
        fiesta.innerHTML = '';
    }, 5000);
}

function actualizarCositas() {
    document.getElementById('pares').textContent = cosasDelJuego.paresEncontrados;
}

function empezarTiempito() {
    if (cosasDelJuego.intervalito) {
        clearInterval(cosasDelJuego.intervalito);
    }
    
    cosasDelJuego.tiempoPasado = 0;
    var elementoTiempo = document.getElementById('tiempito');
    
    cosasDelJuego.intervalito = setInterval(function() {
        cosasDelJuego.tiempoPasado++;
        var minutos = Math.floor(cosasDelJuego.tiempoPasado / 60);
        var segundos = cosasDelJuego.tiempoPasado % 60;
        elementoTiempo.textContent = minutos + ':' + (segundos < 10 ? '0' : '') + segundos;
    }, 1000);
}

document.getElementById('botonReinicio').addEventListener('click', empezarJuego);
document.getElementById('botonSiguiente').addEventListener('click', function() {
    window.location.href = 'nivel2.html';
});

empezarJuego();