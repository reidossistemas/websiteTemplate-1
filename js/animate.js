const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';
let   totalPaginas = 3;  
let   paginaAtual = 1;
let   podeMudarPagina = true;

const debounce = function(func, wait, immediate) {
    let timeout;
    return function(...args) {
        const context = this;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    }
}


function animeScrool() {
    const windowTop = window.pageYOffset + (window.innerHeight * 3 / 4);
    target.forEach(e => {
        if (windowTop > e.offsetTop) {
            e.classList.add(animationClass);
        } else {
            e.classList.remove(animationClass);
        }
    });
}

if (target.length) {
    window.addEventListener('scroll', debounce(function (element) {
        if (podeMudarPagina) {
            podeMudarPagina = false;
            setTimeout(() => podeMudarPagina = true, 500);
            if (window.pageYOffset > window.innerHeight * (paginaAtual - 1)) {
                proximaPagina(paginaAtual);
            } else {
                anteriorPagina(paginaAtual);
            }
        }
        animeScrool();
    }, 50));

    // window.addEventListener('keydown', debounce(function (element) {
    //     if (element.key === 'ArrowUp' && paginaAtual === 1) {
    //         podeMudarPagina = false;
    //         setTimeout(() => podeMudarPagina = true, 500);
    //         if (window.pageYOffset > window.innerHeight * (paginaAtual - 1)) {
    //             proximaPagina(paginaAtual);
    //         } else {
    //             anteriorPagina(paginaAtual);
    //         }
    //     }
    //     animeScrool();
    // }

}

animeScrool();

console.log('tamanhoPagina', window.innerHeight);
console.log('posicaoQuemSomos', document.querySelectorAll('[data-anime]')[0].offsetTop);

function proximaPagina(numPagina) {
    (numPagina === totalPaginas) ? paginaAtual = 1 : ++paginaAtual;
    setarPagina(paginaAtual)
    
}
function anteriorPagina(numPagina) {
    (numPagina === 1)            ? proximaPagina(totalPaginas) : --paginaAtual;
    setarPagina(paginaAtual)
}
function setarPagina(numPagina) {
    document.body.scrollTop = document.documentElement.scrollTop = window.innerHeight * (numPagina - 1);
}

