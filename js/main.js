const navbarBtn = document.querySelector('.navbar__btn');
const navbarBtnSpan = document.querySelector('.navbar__btn span');
const navbarMenu = document.querySelector('.navbar__menu');
navbarBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (navbarBtn.classList.contains('active')) {
    navbarBtn.classList.remove('active');
    navbarMenu.style = 'left: -280; transition: left 0.5s';
  } else {
    navbarBtn.classList.add('active');
    navbarMenu.style = 'left: 0; transition: left 0.5s';
  }
});
document.addEventListener('mouseup', function (e) {
  if (e.target != navbarBtn && e.target != navbarBtnSpan || e.target == navbarBtnSpan && e.target == navbarBtn) {
    navbarBtn.classList.remove('active');
    navbarMenu.style = 'left: -280; transition: left 0.5s';
  }
});
navbarMenu.addEventListener('mouseup', function (e) {
  e.stopPropagation();
});
class Slider {
  constructor(options) {
    this.slider = options.slider;
    this.sliderList = this.slider.querySelector('.slider__items');
    this.sliderItems = this.slider.querySelectorAll('.slider__items--slide');
    this.btnPrev = this.slider.querySelector('.prev');
    this.btnNext = this.slider.querySelector('.next');
    this.activeSlide = 0;
    this.moveSlide = 100;
    this.dir = options.direction.toUpperCase() == 'X' ? 'X' : 'Y';
    this.timeMove = 0;
    this.interval = this.timeMove + 7000;
    this.newDots = options.createDots;
    if (this.newDots == 'true') {
      this.active = true;
      this.ul = document.createElement('ul');
      this.ul.classList.add('slider__dots');
      this.sliderItems.forEach(() => {
        const li = document.createElement('li');
        this.ul.appendChild(li);
      });
      this.slider.appendChild(this.ul);
      this.dots = this.slider.querySelectorAll('.slider__dots li');
      this.dots[this.activeSlide].classList.add('active');
      this.dots.forEach((dot, key) => {
        dot.addEventListener('click', () => {
          this.controllersDots(key);
        });
      });
    }
    if (options.play == 'true') {
      let avtoPlaySlider = setInterval(() => {
        this.move();
      }, this.interval);
      this.slider.addEventListener('mouseenter', () => {
        clearInterval(avtoPlaySlider);
      });
      this.slider.addEventListener('mouseleave', () => {
        avtoPlaySlider = setInterval(() => {
          this.move();
        }, this.interval);
      });
    }
    this.sliderItems.forEach((slide, key) => {
      if (key != this.activeSlide) {
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`;
      }
      if (key == this.sliderItems.length - 1) {
        slide.style.transform = `translate${this.dir}(${-this.moveSlide}%)`;
      }
    });
  }
  move() {
    this.sliderItems.forEach((slide, key) => {
      if (this.activeSlide != key) {
        slide.style.transform = `translate${this.dir}(${this.moveSlide}%)`;
        slide.style.transition = `0ms`;
      }
    });
    setTimeout(() => {
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-this.moveSlide}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
      if (this.newDots == 'true') {
        this.dots[this.activeSlide].classList.remove('active');
      }
      this.activeSlide++;
      if (this.activeSlide >= this.sliderItems.length) {
        this.activeSlide = 0;
      }
      this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
      this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
      if (this.newDots == 'true') {
        this.dots[this.activeSlide].classList.add('active');
      }
    }, this.timeMove + 200);
  }
  controllersDots(dotKey) {
    if (this.active && dotKey != this.activeSlide) {
      this.sliderItems.forEach(slide => {
        slide.style.transition = '0ms';
      });
      this.active = false;
      this.dots.forEach(dot => {
        dot.classList.remove('active');
      });
      let moveLeftOrRight = dotKey > this.activeSlide ? this.moveSlide : -this.moveSlide;
      this.sliderItems[dotKey].style.transform = `translate${this.dir}(${moveLeftOrRight}%)`;
      setTimeout(() => {
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${-moveLeftOrRight}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.remove('active');
        this.activeSlide = dotKey;
        this.sliderItems[this.activeSlide].style.transform = `translate${this.dir}(${0}%)`;
        this.sliderItems[this.activeSlide].style.transition = `${this.timeMove}ms`;
        this.dots[this.activeSlide].classList.add('active');
      }, 100);
      setTimeout(() => {
        this.active = true;
      }, this.timeMove + 200);
    }
  }
}
const sliders = document.querySelectorAll('.slider');
sliders.forEach((slider, num) => {
  const direction = slider.getAttribute('direction') != 'Y' ? 'X' : 'Y';
  const autoPlay = slider.hasAttribute('auto-play') ? 'true' : 'false';
  const createDots = slider.hasAttribute('create-dots') ? 'true' : 'false';
  const interval = +slider.getAttribute('interval') >= 2000 ? +slider.getAttribute('interval') : undefined;
  new Slider({
    slider: slider,
    direction: direction,
    play: autoPlay,
    createDots: createDots,
    interval: interval
  });
});
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');
let unlock = true;
const timeout = 800;
if (popupLinks.length > 0) {
  for (let index = 0; index < popupLinks.length; index++) {
    const popupLink = popupLinks[index];
    popupLink.addEventListener('click', function (e) {
      const popupName = popupLink.getAttribute('href').replace('#', '');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}
function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true) {
  if (unlock) {
    popupActive.classList.remove('open');
    if (doUnlock) {
      // bodyUnLock();
      body.classList.remove('lock');
    }
  }
}
function bodyLock() {
  const lockPaddingValue = window.innerWidth - document.querySelector('body').offsetWidth + 'px';
  if (lockPadding.length > 0) {
    for (let index = 0; index < lockPadding.length; index++) {
      const el = lockPadding[index];
      el.style.paddingRight = lockPaddingValue;
    }
  }
  body.style.paddingRight = lockPaddingValue;
  body.classList.add('lock');
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}
function bodyUnlock() {
  setTimeout(() => {
    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = '0px';
      }
    }
    body.style.paddingRight = '0px';
    body.classList.remove('lock');
  }, timeout);
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}
document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});