'use strict';

const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

const navbarMenu = document.querySelector('.navbar__menu');
console.log(navbarMenu);

// scroll시 navbar 상단 고정 및 배경 색깔 변경, 에니메이션
document.addEventListener('scroll', () => {
    // console.log(`window.scrollY: ${window.scrollY}`);
    // console.log(`navbarHeight: ${navbarHeight}`);

    if (window.scrollY > navbarHeight) {
        navbar.classList.add('navbar__background');
    } else {
        navbar.classList.remove('navbar__background');
    }
});

// navbar에서 선택된 아이템 테두리 효과 및 선택된 아이템(Section) 위치로 이동
navbarMenu.addEventListener('click', (event) => {
    const activeItem = document.querySelector('.navbar__menu > .active');
    const activeValue = activeItem.dataset.value;

    // console.log(`Active 상태인 li Tag: ${activeItem.innerHTML}`);
    // console.log(`Active 상태인 아이템의 Tag의 value 값: ${activeValue}`);

    const target = event.target
    const value = target.dataset.value;

    // console.log(`선택된 아이템 li Tag: ${target.innerHTML}`);
    // console.log(`선택된 아이템의 Tag value 값: ${value}`);

    if (value == null) {
        return;
    }

    const selectedItem = document.querySelector(value);
    selectedItem.scrollIntoView({behavior:'smooth', block:'center'});

    if (activeValue === value) {
        target.classList.remove('active');
        activeItem.classList.add('acitve');
    } else {
        activeItem.classList.remove('active');
        target.classList.add('active');
    }
});

const toggleBtn = document.querySelector('.navbar__toggle-btn');
console.log(toggleBtn);

toggleBtn.addEventListener('click', () => {
    console.log('click!');
    navbarMenu.style.display = 'block';
});