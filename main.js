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



const homeContainer = document.querySelector('.home__container');
const homeHeight = homeContainer.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
    // scroll시 home Section 자식 서서히 투명화 
    homeContainer.style.opacity = 1 - window.scrollY / homeHeight
});


const scrollUpBtn = document.querySelector('.scroll__up-btn');

// scroll시 Arrow Button 보이게 활성화
document.addEventListener('scroll', () => {
    if (window.scrollY > homeHeight / 2) {
        scrollUpBtn.classList.add('show');
    } else {
        scrollUpBtn.classList.remove('show');
    }
});

// 버튼 클릭시 Home section으로 이동
scrollUpBtn.addEventListener('click', () => {
    scrollIntoView('#home');
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


// Contact Me 버튼 클릭 시 contact Section으로 이동
const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
    scrollIntoView('#contact');
});

function loadItems() {
    return fetch("data/data.json")
        .then(response => response.json())
        .then(json => json.items);
}


function createElement(items) {
    const a = document.createElement('a');
    a.setAttribute('class', 'project');
    a.setAttribute('target', 'blank');
    a.setAttribute('href', items.git);
    a.setAttribute('data-type', items.type);

    const img = document.createElement('img');
    img.setAttribute('class', 'project__img');
    img.setAttribute('src', items.image);
    img.setAttribute('alt', items.alt);

    const div = document.createElement('div');
    div.setAttribute('class', 'project__description');

    const title = document.createElement('h3');
    title.innerHTML = `${items.title}`;

    const des = document.createElement('span');
    des.innerHTML = `${items.des}`;

    div.appendChild(title);
    div.appendChild(des);

    a.appendChild(img);
    a.appendChild(div);

    return a;
}


loadItems()
.then(items => {
    console.log(items);
    const elements = items.map(createElement);
    const container = document.querySelector('.work__projects');
    const categoryBtn = document.querySelector('.work__categories');

    container.append(...elements);
    
    categoryBtn.addEventListener('click', event => onButtonClick(event, items, elements));
})

function onButtonClick(event, items, elements) {
    const key = event.target.dataset.key;
    const value = event.target.dataset.value;

    if (key == null || value == null){
        return;
    }

    updateCategory(key, value, elements);
}

function updateCategory(key, value, elements) {
    elements.forEach(item => {
        if(item.dataset[type] === value) {
            item.classList.remove('invisible');
        } else {
            item.classList.add('invisible');
        }
    });
}