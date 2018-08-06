var popupToggle = document.getElementById('popup-toggle');
var popup = document.getElementById('modal');
var close = document.getElementById('modal-close');
var popupWrapper = document.querySelector('.popup-wrapper');

popupToggle.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.add('popup-rules--open');
  popupWrapper.style.display = 'block';
});

close.addEventListener('click', function (e) {
  e.preventDefault();
  popup.classList.remove('popup-rules--open');
  popupWrapper.style.display = 'none';
});

jQuery(document).ready(function () {
  jQuery('.scrollbar-rail').scrollbar();
});

var mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  grabCursor: false,
  noSwipingClass: 'gallery__item-hello',

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})