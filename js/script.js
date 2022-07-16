"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnScrollTo1 = document.querySelector(".btn--scroll-to-1");
const section3 = document.querySelector("#section3");
const nav = document.querySelector(".nav");

console.log("A page produced and edited by Etzelaire");

// const myName = "Jordi Vargas";
// const h1 = document.querySelector(".heading1");
// console.log(h1);

// h1.addEventListener("click", function () {
//   h1.textContent = myName;
//   h1.style.backgroundColor = "red";
//   h1.style.padding = "5rem";
// });
// Make mobile navigation work

////////////////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});
///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
console.log(currentYear);
yearEl.textContent = currentYear;
///////////////////////////////////////////////////////////
// Make mobile navigation work
const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnNavEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
//BUTTON SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section3.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  section3.scrollIntoView({ behavior: "smooth" });
});
///////////////////////////////////////////
btnScrollTo1.addEventListener("click", function (e) {
  const s1coords = pricing.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  pricing.scrollIntoView({ behavior: "smooth" });
});
///////////////////////////////////////////////////////////
// Smooth scrolling animation

const allLinks = document.querySelectorAll("a:link");

allLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    //     // Scroll to other links
    if (href !== "#" && href.startsWith("#")) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Close mobile naviagtion
  if (link.classList.contains("main-nav-link"))
    headerEl.classList.toggle("nav-open");
});

// PAGE NAVIGATION
document
  .querySelector(".main-nav-list")
  .addEventListener("click", function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains("main-nav-link")) {
      const id = e.target.getAttribute("href");
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("main-nav-link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".main-nav-link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
///////////////////////////////////////////////////////////
// Sticky navigation

const sectionHeroEl = document.querySelector(".section-hero");

const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    console.log(ent);

    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }

    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // In the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
///////////////////////////////////////
// Sticky navigation: Intersection Observer API

// const header = document.querySelector(".header");
// const navHeight = nav.getBoundingClientRect().height;

// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);

//   if (!entry.isIntersecting) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// };

// const headerObserver = new IntersectionObserver(stickyNav, {
//   root: null,
//   threshold: 0,
//   rootMargin: `-${navHeight}px`,
// });

// headerObserver.observe(header);

///////////////////////////////////////
///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions/////
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();
// https://unpkg.com/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js

////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
//BACK TO TOP BUTTON//

//////////////////////////////////////
// Slider
// const slider = function () {
//   const slides = document.querySelectorAll(".slide");
//   const btnLeft = document.querySelector(".slider__btn--left");
//   const btnRight = document.querySelector(".slider__btn--right");
//   const dotContainer = document.querySelector(".dots");

//   let curSlide = 0;
//   const maxSlide = slides.length;

//   // Functions
//   const createDots = function () {
//     slides.forEach(function (_, i) {
//       dotContainer.insertAdjacentHTML(
//         "beforeend",
//         `<button class="dots__dot" data-slide="${i}"></button>`
//       );
//     });
//   };

//   const activateDot = function (slide) {
//     document
//       .querySelectorAll(".dots__dot")
//       .forEach((dot) => dot.classList.remove("dots__dot--active"));

//     document
//       .querySelector(`.dots__dot[data-slide="${slide}"]`)
//       .classList.add("dots__dot--active");
//   };

//   const goToSlide = function (slide) {
//     slides.forEach(
//       (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
//     );
//   };

// Next slide
// const nextSlide = function () {
//   if (curSlide === maxSlide - 1) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const prevSlide = function () {
//   if (curSlide === 0) {
//     curSlide = maxSlide - 1;
//   } else {
//     curSlide--;
//   }
//   goToSlide(curSlide);
//   activateDot(curSlide);
// };

// const init = function () {
//   goToSlide(0);
//   createDots();

//   activateDot(0);
// };
// init();
// Lazy loading images
// const imgTargets = document.querySelectorAll("img[data-src]");

// const loadImg = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

// Replace src with data-src
//   entry.target.src = entry.target.dataset.src;

//   entry.target.addEventListener("load", function () {
//     entry.target.classList.remove("lazy-img");
//   });

//   observer.unobserve(entry.target);
// };

// const imgObserver = new IntersectionObserver(loadImg, {
//   root: null,
//   threshold: 0,
//   rootMargin: "200px",
// });

// imgTargets.forEach((img) => imgObserver.observe(img));
// // Event handlers
// btnRight.addEventListener("click", nextSlide);
// btnLeft.addEventListener("click", prevSlide);

// document.addEventListener("keydown", function (e) {
//   if (e.key === "ArrowLeft") prevSlide();
//   e.key === "ArrowRight" && nextSlide();
// });

// dotContainer.addEventListener("click", function (e) {
//   if (e.target.classList.contains("dots__dot")) {
//     const { slide } = e.target.dataset;
//     goToSlide(slide);
//     activateDot(slide);
//   }
// });

// slider();

// Tabbed component
// tabsContainer.addEventListener("click", function (e) {
//   const clicked = e.target.closest(".operations__tab");

//   // Guard clause
//   if (!clicked) return;

//   // Remove active classes
//   tabs.forEach((t) => t.classList.remove("operations__tab--active"));
//   tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

//   // Activate tab
//   clicked.classList.add("operations__tab--active");

//   // Activate content area
//   document
//     .querySelector(`.operations__content--${clicked.dataset.tab}`)
//     .classList.add("operations__content--active");
// });

// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   e.preventDefault();

//   // Matching strategy
//   if (e.target.classList.contains("nav__link")) {
//     const id = e.target.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   }
// });

///////////////////////////////////////
// Page navigation
// document
//   .querySelector(".main-nav-list")
//   .addEventListener("click", function (e) {
//     e.preventDefault();

//     // Matching strategy
//     if (e.target.classList.contains("main-nav-list")) {
//       const id = e.target.getAttribute("href");
//       document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     }
//   });

// VIDEO CONTROLS//
var myVideo = document.getElementById("video1");

function playPause() {
  if (myVideo.paused) myVideo.play();
  else myVideo.pause();
}

function makeBig() {
  myVideo.width = 560;
}

function makeSmall() {
  myVideo.width = 320;
}

function makeNormal() {
  myVideo.width = 420;
}

/////////////////////////////////////////
//////////////////////////////////////////////
//BACK TO TOP BUTTON///

///////////////////
// SCROLL BAR/////
