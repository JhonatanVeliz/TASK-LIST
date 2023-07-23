import { $ } from "./modules/selector.js";
// TEMAS
const THEMEDARK = {
    alt: 'oscuro',
    src: './assets/luna.png',
};

const THEMELIGHT = {
    alt: 'claro',
    src: './assets/sol.png',
}

// DOM ELEMENTS
const btnMode = $('#mode', false);
const imgMode = $('#img-mode', false);
const documentBody = document.body;
const texts = $('.texto', true);

const addImg = (img, alt, src) => { img.alt = alt, img.src = src };

const bodyMode = (documento, texts) => {
    if (documento.className.includes('body--dark')) {
        texts.forEach(text => text.classList.remove('text--white'));
        return documento.className = '';
    }
    documento.className = 'body--dark';
    texts.forEach(text => { text.classList.add('text--white') });
}

function modeToggler(documento, img, texts, alt) {

    let theme = {...THEMELIGHT};

    if (alt == 'claro') {
        addImg(img, THEMEDARK.alt, THEMEDARK.src);
        bodyMode(documento, texts);
        theme = {...THEMEDARK};
    } else {
        addImg(img, THEMELIGHT.alt, THEMELIGHT.src);
        bodyMode(documento, texts);
    }

    localStorage.setItem('theme', JSON.stringify(theme));
}

const bodyModeStorage = (mode, body, texts) => {
    if (mode === 'oscuro') {
        body.className = 'body--dark';
        return texts.forEach(text => text.classList.add('text--white'));
    }
    body.className = '';
    texts.forEach(text => text.classList.remove('text--white'));
}

function modeStorage() {
    try {
        const theme = JSON.parse(localStorage.getItem('theme'));
        const { alt, src } = theme;
        addImg(imgMode, alt, src);
        bodyModeStorage(alt, documentBody, texts);
    } 
    catch (error) {return};
}
btnMode.addEventListener('click', () => modeToggler(documentBody, imgMode, texts, imgMode.alt));
modeStorage();