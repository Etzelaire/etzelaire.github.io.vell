"use strict";

// const overlay = document.querySelector(".overlay");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnScrollTo1 = document.querySelector(".btn--scroll-to-1");
const section1 = document.querySelector("#section1");
const sectionhow = document.querySelector("#how");
const nav = document.querySelector(".main-nav");
const mainnavlinks = document.querySelectorAll(".man-nav-links");

console.log("A page produced and edited by Etzelaire");

////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Set current year
const yearEl = document.querySelector(".year");
const currentYear = new Date().getFullYear();
console.log(currentYear);
console.log("Copyright protected site?");
yearEl.textContent = currentYear;
///////////////////////////////////////////////////////////
// Make mobile navigation work
// const btnNavEl = document.querySelector(".btn-mobile-nav");
// const headerEl = document.querySelector(".header");
// btnNavEl.addEventListener("click", function () {
//   headerEl.classList.toggle("nav-open");
// });

///////////////////////////////////////////////////////////
//BUTTON SCROLLING
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = sectionhow.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  sectionhow.scrollIntoView({ behavior: "smooth" });
});
///////////////////////////////////////////
btnScrollTo1.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);

  console.log(
    "height/width viewport",
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  section1.scrollIntoView({ behavior: "smooth" });
});
//////////////////////////
//BACK TO TOP BUTTON//
document.addEventListener('DOMContentLoaded', (event) => {
  //Get the button
  var mybutton = document.getElementById("back-to-top-btn");

  // When the user scrolls down from the height of the window, show the button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
      if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
          mybutton.style.display = "block";
      } else {
          mybutton.style.display = "none";
      }
  }

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
      window.scrollTo({top: 0, behavior: 'smooth'});
  }

  // attach the click event to the button here, inside DOMContentLoaded event listener
  mybutton.addEventListener("click", topFunction);
});

///////////////////////////////////////////////////////////

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains("main-nav-list")) {
    const link = e.target;
    const siblings = link
      .closest(".main-nav")
      .querySelectorAll(".main-nav-list");
    const logo = link.closest(".main-nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
  }
};

// Passing "argument" into handler
nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));
////////////////////////////////////////
//Sticky navigation: Intersection Observer API
document.addEventListener('DOMContentLoaded', (event) => {
  var header = document.getElementById('header');
  var sticky = header.offsetTop;
  var btn = document.querySelector(".back-to-top");

  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
      if (window.pageYOffset > sticky) {
          header.classList.add("sticky");
          btn.style.display = "block"; // show the button when we start scrolling
      } else {
          header.classList.remove("sticky");
          btn.style.display = "none"; // hide the button when we're at the top of the page
      }
  }

  // When the user clicks on the button, scroll to the top of the document
  btn.onclick = function() {
      window.scrollTo({top: 0, behavior: 'smooth'});
  }
});


///////////////////////////////////////////////////////////
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

// Lazy loading images
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazyload"));

  if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
          entries.forEach(function(entry) {
              if (entry.isIntersecting) {
                  let lazyImage = entry.target;
                  lazyImage.src = lazyImage.dataset.src;
                  lazyImage.classList.remove("lazyload");
                  lazyImageObserver.unobserve(lazyImage);
              }
          });
      });

      lazyImages.forEach(function(lazyImage) {
          lazyImageObserver.observe(lazyImage);
      });
  } else {
      // Fallback for browsers that do not support IntersectionObserver
      lazyImages.forEach(function(lazyImage) {
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazyload");
      });
  }
});
///////////////////////////////////////
///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions/////
// function checkFlexGap() {
//   var flex = document.createElement("div");
//   flex.style.display = "flex";
//   flex.style.flexDirection = "column";
//   flex.style.rowGap = "1px";

//   flex.appendChild(document.createElement("div"));
//   flex.appendChild(document.createElement("div"));

//   document.body.appendChild(flex);
//   var isSupported = flex.scrollHeight === 1;
//   flex.parentNode.removeChild(flex);
//   console.log(isSupported);

//   if (!isSupported) document.body.classList.add("no-flexbox-gap");
// }
// checkFlexGap();
document.addEventListener('DOMContentLoaded', (event) => {
  // Get the hamburger button, close button and the nav menu
  var hamburger = document.querySelector(".icon-mobile-nav[name='menu-outline']");
  var close = document.querySelector(".icon-mobile-nav[name='close-outline']");
  var nav = document.querySelector(".main-nav");

  // Attach click event to the hamburger button
  hamburger.addEventListener("click", function() {
      hamburger.style.display = "none";
      close.style.display = "block";
      nav.style.display = "block";
  });

  // Attach click event to the close button
  close.addEventListener("click", function() {
      close.style.display = "none";
      hamburger.style.display = "block";
      nav.style.display = "none";
  });

  // Listen for resize events
  window.addEventListener('resize', function() {
      // If the screen size is 768px or larger
      if (window.innerWidth >= 768) {
          // Reset everything to the default state
          hamburger.style.display = "";
          close.style.display = "";
          nav.style.display = "";
      }
  });
});


//DROPDOWN MENU//

   

 

