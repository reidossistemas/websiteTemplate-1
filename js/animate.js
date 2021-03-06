const target = document.querySelectorAll('[data-anime]');
const animationClass = 'animate';
let totalPaginas = 3;
let paginaAtual = 1;
let podeMudarPagina = true;

const debounce = function (func, wait, immediate) {
    let timeout;
    return function (...args) {
        const context = this;
        const later = function () {
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
    var x = window.matchMedia("(max-width: 576px) and (orientation: portrait)")
    if (!x.matches) {
        window.addEventListener('scroll', debounce(function (element) {
            console.log(`passou`);
            if (podeMudarPagina) {
                podeMudarPagina = false;
                setTimeout(() => podeMudarPagina = true, 500);
                if (window.pageYOffset > window.innerHeight * (paginaAtual - 1)) {
                    paginaAtual = proximaPagina(paginaAtual);
                } else {
                    paginaAtual = anteriorPagina(paginaAtual);
                }
            }
            setarPagina(paginaAtual);
            animeScrool();
        }, 300));
    }

    window.addEventListener('touchmove', debounce(function (element) {
        console.log(`mobile`);
        if (podeMudarPagina) {
            podeMudarPagina = false;
            setTimeout(() => podeMudarPagina = true, 300);
            if (window.pageYOffset > window.innerHeight * (paginaAtual - 1)) {
                paginaAtual = proximaPagina(paginaAtual);
            } else {
                paginaAtual = anteriorPagina(paginaAtual);
            }
        }
        setarPagina(paginaAtual);
        animeScrool();
    }, 300));


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

paginaAtual = 1;
animeScrool();

// console.log('tamanhoPagina', window.innerHeight);
// console.log('posicaoQuemSomos', document.querySelectorAll('[data-anime]')[0].offsetTop);

function proximaPagina(numPagina) {
    return (numPagina === totalPaginas) ? 1 : paginaAtual + 1;
}
function anteriorPagina(numPagina) {
    return (numPagina === 1) ? totalPaginas : paginaAtual - 1;
}
function setarPagina(numPagina) {
    document.body.scrollTop = document.documentElement.scrollTop = window.innerHeight * (numPagina - 1);
}

