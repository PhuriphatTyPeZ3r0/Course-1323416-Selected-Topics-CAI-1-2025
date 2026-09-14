const drums = document.querySelectorAll('.drum');

for (let i = 0; i < drums.length; i++) {
    drums[i].addEventListener('click', function () {
        const key = this.classList[0];
        playSound(key);
        buttonAnimation(key);
    });
}

document.addEventListener('keydown', function (event) {
    const key = event.key.toLowerCase();
    playSound(key);
    buttonAnimation(key);
});

function playSound(key) {
    switch (key) {
        case 'w':
            new Audio('sounds/tom-1.mp3').play();
            break;
        case 'a':
            new Audio('sounds/tom-2.mp3').play();
            break;
        case 's':
            new Audio('sounds/tom-3.mp3').play();
            break;
        case 'd':
            new Audio('sounds/tom-4.mp3').play();
            break;
        case 'j':
            new Audio('sounds/crash.mp3').play();
            break;
        case 'k':
            new Audio('sounds/kick-bass.mp3').play();
            break;
        case 'l':
            new Audio('sounds/snare.mp3').play();
            break;
        default:
            break;
    }
}

function buttonAnimation(key) {
    if (!key) return;
    const activeButton = document.querySelector(`.${key}.drum`);
    if (!activeButton) return;
    activeButton.classList.add('pressed');
    setTimeout(function () {
        activeButton.classList.remove('pressed');
    }, 100);
}

