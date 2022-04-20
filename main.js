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
  homeContainer.style.opacity = 1 - window.scrollY / homeHeight;
});

// 버튼 클릭시 Home section으로 이동
const scrollUpBtn = document.querySelector('.scroll__up-btn');

scrollUpBtn.addEventListener('click', () => {
  scrollIntoView('#home');
});

// scroll시 Arrow Button 보이게 활성화
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    scrollUpBtn.classList.add('show');
  } else {
    scrollUpBtn.classList.remove('show');
  }
});

// scroll시 nav Item 선택 및 위치 이동
const sectionIds = ['#home', '#about', '#work', '#contact'];
const sections = sectionIds.map((id) => document.querySelector(id));
const navItems = sectionIds.map((id) => document.querySelector(`[data-value="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

// 선택시 Nav Active 활성화 전 요소 제거
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  selectedNavItem.classList.add('active');
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  // 대상 요소가 root에 지정된 요소 내에서 30% 만큼 보여질 때 콜백 실행
  threshold: 0.3,
};

const observerCallback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);

      // 스크롤이 아래로 향하게 되어 페이지가 올라온다.
      if (entry.boundingClientRect.y < 0) {
        // section이 바깥으로 나갈 때 마다 그 다음 section을 가르킨다.
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};

// DOM의 속성, 텍스트, 자식 노드들에 대한 변경을 감지할 수 있는 API로
// 특정 노드 객체를 관찰하고, 변경이 발생했을 때 콜백 함수를 실행
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach((section) => observer.observe(section));

// selectNavItem이 반복적으로 호출되어서 wheel로 설정
window.addEventListener('wheel', () => {
  if (window.scrollY === 0) {
    // 스크롤이 가장 위에 위치하고 있으면 배열 0으로 초기화
    selectedNavIndex = 0;
  } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
    // 배열의 가장 마지막을 가르킨다.
    selectedNavIndex = navItems.length - 1;
  }

  // console.log(navItems[selectedNavIndex]);
  selectNavItem(navItems[selectedNavIndex]);
});

// navbar에서 선택된 아이템(Section) 위치로 이동
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const value = target.dataset.value;

  // console.log(`선택된 아이템 li Tag: ${target.innerHTML}`);
  // console.log(`선택된 아이템의 Tag value 값: ${value}`);

  // 선택된 값이 없을 경우 즉시 종료
  if (value == null) {
    return;
  }

  // Media CSS navbar 블록 처리
  navbarMenu.classList.remove('open');

  scrollIntoView(value);
});

// toggle 버튼 클릭 시 메뉴 바 Show or Hide
const toggleBtn = document.querySelector('.navbar__toggle-btn');
// console.log(toggleBtn);

toggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

// 해당 section 위치로 이동하는 함수
function scrollIntoView(sectionName) {
  const scroll = document.querySelector(sectionName);

  scroll.scrollIntoView({ behavior: 'smooth', block: 'center' });
  selectNavItem(navItems[sectionIds.indexOf(sectionName)]);
}

// Contact Me 버튼 클릭 시 contact Section으로 이동
const contactBtn = document.querySelector('.home__contact');

contactBtn.addEventListener('click', () => {
  scrollIntoView('#contact');
});

// Projcet 상태 표시
const categoryBtn = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');

async function loadItems() {
  return fetch('data/data.json')
    .then((response) => response.json())
    .then((json) => json.items);
}

loadItems().then((items) => {
  const elements = items.map(createElement);
  const container = document.querySelector('.work__projects');

  container.append(...elements);

  categoryBtn.addEventListener('click', (event) => onButtonClick(event, elements));
});

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

function onButtonClick(event, elements) {
  // 숫자 (span tag)를 클릭 시 필터 값이 나오지 않아 추가
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  const active = document.querySelector('.category__btn.active');
  // target의 element가 button 타입이면 e.target(button tag) 아니면 e.target.parentNode(span tag)
  const targetBtn = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;

  if (filter == null) {
    return;
  }

  active.classList.remove('active');
  targetBtn.classList.add('active');

  updateCategory(filter, elements);
}

function updateCategory(filter, elements) {
  projectContainer.classList.add('animation-out');

  setTimeout(() => {
    elements.forEach((item) => {
      if (filter === 'all' || item.dataset.type === filter) {
        item.classList.remove('invisible');
      } else {
        item.classList.add('invisible');
      }

      projectContainer.classList.remove('animation-out');
    });
  }, 300);
}
