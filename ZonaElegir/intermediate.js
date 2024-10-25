
document.addEventListener("DOMContentLoaded", function () {//todo cargue
    const text = "Hola, mi nombre es Lensito y te doy la bienvenida a SinLeng. Veo que has elegido el nivel Principiante, así que alístate porque ahora comienza nuestra aventura. pero.. primero una guia no oh noooo";
    const animatedTextElement = document.getElementById("animatedText");
    let index = 0;

    const typingSound = new Audio('typing-sound.mp3');
    typingSound.loop = true; 

    function typeText() {
        if (index < text.length) {
            if (!typingSound.playing) {
                typingSound.play(); 
            }
            animatedTextElement.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeText, 100); 
        } else {
            typingSound.pause(); 
            document.getElementById("readyButton").style.display = "inline-block"; 
        }
    }

    typeText();
});