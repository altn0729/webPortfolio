'use strict';

// navbar scroll시 배경 색깔 변경 및 에니메이션
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // console.log(`window.scrollY: ${window.scrollY}`);
    // console.log(`navbarHeight: ${navbarHeight}`);

    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar__background');
    } else {
        navbar.classList.remove('navbar__background');
    }
});