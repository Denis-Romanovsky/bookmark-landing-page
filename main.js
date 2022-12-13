// Mobile Hamburger Menu
const test = document.querySelector('.site-nav__logo');
const menuToggle = document.querySelector('.menu-toggle');
const btnHamburger = document.querySelector('.btn-hamburger');
const ulMenu = document.querySelector('.site-nav__primary');
const socialLinks = document.querySelector('.site-nav__social-links');

// Carousel Section
const carousel = document.querySelector('.carousel');
const carouselNav = document.querySelector('.carousel-nav');
const carouselNavItem = document.querySelectorAll('.carousel-nav__item');
const carouselNavLi = document.querySelectorAll('.carousel-nav__li');

// FAQ Section
const faqDropdown = document.querySelectorAll('.faq__dropdown');
const faqAnswer = document.querySelector('.faq__answer');


menuToggle.addEventListener('click', () => {
  const isOpened = menuToggle.getAttribute('aria-expanded') === 'true';
  if (isOpened ? closeMenu() : openMenu());
});

function openMenu() {
  menuToggle.setAttribute('aria-expanded', 'true');
  ulMenu.setAttribute('data-state', 'opened');
  socialLinks.setAttribute('data-state', 'opened');
  test.setAttribute('data-color', 'white');
}

function closeMenu() {
  menuToggle.setAttribute('aria-expanded', 'false');
  ulMenu.setAttribute('data-state', 'closed'); // closing
  socialLinks.setAttribute('data-state', 'closed'); // closing
  test.setAttribute('data-color', 'default');
}

ulMenu.addEventListener('animationend', () => {
  ulMenu.setAttribute('data-state', 'closed');
}, { once: true });


const bPoint = 900;

// Close menu when window width is bigger than 900px because when you resize back to less than 600px the menu pops back.
window.addEventListener('resize', () => {
  if (window.innerWidth > bPoint) {
    closeMenu();
  }
});


const carouselData = new Map();

carouselData.set(
  'bookmarking', {
  heading: `Bookmark in one click`,
  description: `Organize your bookmarks however you like. Our simple drag-and-drop interface gives
  you complete control over how you manage your favourite sites.`
});
carouselData.set('searching', {
  heading: `Intelligent search`,
  description: `Our powerful search feature will help you saved sites in no time at all. No need
  to trawl through all of your bookmarks.`,
});
carouselData.set('sharing', {
  heading: `Share your bookmarks`,
  description: `Easily share your bookmarks and collections with others. Create a shareable link
  that you can send at the click of a button.`
});


let itemData;

carouselNav.addEventListener('click', e => {
  const cur = e.target;

  /*
    if cur is a link and has no active class
    remove all active classes from LIs
    add active class to cur
  */

  let index;
  if (cur.matches('.carousel-nav__item')) {
    if (!cur.classList.contains('active')) {

      // Remove data before before assigning an active class in order to avoid overlapping
      document.querySelector('.carousel__item').remove();

      carouselNavItem.forEach(heading => {
        heading.classList.remove('active');
      });

      carouselNavLi.forEach(li => {
        li.classList.remove('active');
      });


      cur.classList.add('active');
      cur.parentElement.classList.add('active');

      // Get index of an active class
      const lis = carouselNav.children;

      for (let i = 0; i < lis.length; i++) {
        if (lis[i].classList.contains('active')) {
          index = i + 1;
        }
      }


      // Insert carousel__item DIV
      for (let key of carouselData.keys()) {

        if (cur.matches(`.carousel-nav__item--${key}`)) {
          itemData = carouselData.get(key);

          const carouselDiv = `
            <div class="carousel__item carousel__item--${index}">
              <div class="carousel__img-box">
                <img
                  class="carousel__img carousel__img--${index}"
                  src="/images/illustration-features-tab-${index}.svg"
                  alt="Illustration-${index}"
                />
                <div class="shape-secondary shape-secondary--${index}"></div>
              </div>
              <div class="carousel__info-box">
                <h3 class="heading-secondary">${itemData['heading']}</h3>
                <p class="carousel__text">
                  ${itemData['description']}
                </p>
                <button class="btn carousel__btn btn--primary">More Info</button>
              </div>
            </div>`;

          carousel.innerHTML += carouselDiv;
        }
      }
    }
  }
});