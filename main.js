'use strict';

// scroll시 navbar 상단 고정 및 배경 색깔 변경, 에니메이션
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


// scroll시 home Section 자식 서서히 투명화
const homeContainer = document.querySelector('.home__container');
const homeHeight = homeContainer.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight
});


// navbar에서 선택된 아이템 테두리 효과 및 선택된 아이템(Section) 위치로 이동
const navbarMenu = document.querySelector('.navbar__menu');

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

    scrollIntoView(value);

    if (activeValue === value) {
        target.classList.remove('active');
        activeItem.classList.add('acitve');
    } else {
        activeItem.classList.remove('active');
        target.classList.add('active');
    }
});


// Contact Me 버튼 클릭 시 contact Section으로 이동
const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});


// toggle 버튼 클릭 시 메뉴 바 Show or Hide
const toggleBtn = document.querySelector('.navbar__toggle-btn');
// console.log(toggleBtn);

toggleBtn.addEventListener('click', () => {
    console.log('click!');
    navbarMenu.style.display = 'block';
});


// 해당 section 위치로 이동하는 함수
function scrollIntoView(sectionName) {
    const scroll = document.querySelector(sectionName);

    scroll.scrollIntoView({behavior:'smooth', block:'center'});
}