'use strict';

// navbar scroll시 배경 색깔 변경 및 에니메이션
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

const navbarMenu = document.querySelector('.navbar__menu');
console.log(navbarMenu);

const about = document.querySelector('#about');
const aboutScrollY = about.offsetTop - 200;
console.log(`aboutScrollY: ${aboutScrollY}`);

document.addEventListener('scroll', () => {
    // console.log(`window.scrollY: ${window.scrollY}`);
    // console.log(`navbarHeight: ${navbarHeight}`);

    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar__background');
    } else {
        navbar.classList.remove('navbar__background');
    }
});

navbarMenu.addEventListener('click', (event) => {
    const target = event.target
    const value = target.dataset.value;

    // console.log(target);
    // console.log(value);

    if (value == null) {
        return;
    }

    const scrollTo = document.querySelector(value);
    scrollTo.scrollIntoView({behavior:'smooth', block:'center'});
});