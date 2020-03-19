var numeroTotalSlides = 3;
var slideAtualSetado = 1;
var timerDefault = 5000;
var timer = timerDefault - 1000;

function setSlide(indiceSlide) {
    document.getElementById('slide'+indiceSlide).checked = true;
}

function nextSlide() {
    slideAtualSetado === numeroTotalSlides
        ? slideAtualSetado = 1
        : slideAtualSetado = slideAtualSetado + 1;
    setSlide(slideAtualSetado);    
}

function previousSlide() {
    slideAtualSetado === 1
        ? slideAtualSetado = numeroTotalSlides
        : slideAtualSetado = slideAtualSetado - 1;
    setSlide(slideAtualSetado);    
}

function clickedNextSlider() {
    document.getElementById('nextSlide').addEventListener('click', function () {
        timer = timerDefault;
        nextSlide();
    });
}

function clickedPreviousSlider() {
    document.getElementById('previousSlide').addEventListener('click', function () {
        timer = timerDefault;
        previousSlide();
    });
}

function startSlide() {
    setTimeout(() => {
        if (timer <= 0) {
            nextSlide();
            timer = timerDefault - 1000;
        } else {
            timer = timer - 1000;
        }
        startSlide();
    }, 1000);
}

startSlide();
clickedNextSlider();
clickedPreviousSlider();