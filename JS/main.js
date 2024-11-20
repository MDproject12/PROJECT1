const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const toggle = item.querySelector('.faq-toggle'); 
  const content = item.querySelector('.faq-content'); 


  item.addEventListener('click', () => {

    item.classList.toggle('faq-active');


    if (item.classList.contains('faq-active')) {
      content.style.display = 'block';
      toggle.classList.replace('bi-chevron-right', 'bi-chevron-down');
    } else {
      content.style.display = 'none';
      toggle.classList.replace('bi-chevron-down', 'bi-chevron-right');
    }
  });
});





function startCounters() {
  const count = document.querySelectorAll(".count");
  const time = 1000; // ا

  count.forEach(count => {
    const num = +count.getAttribute("data-target");
    const add = num / (time / 10); 
    let current = 0;

    const updateCounter = () => {
      current += add;
      if (current >= num) {
        count.textContent = num;
      } else {
        count.textContent = Math.floor(current);
        setTimeout(updateCounter, 10);
      }
    };

    updateCounter();
  });
} window.onload = startCounters;



document.addEventListener("DOMContentLoaded", () => {
  const swiperWrapper = document.querySelector(".swiper-wrapper");
  const slides = document.querySelectorAll(".swiper-slide");
  const pagination = document.querySelector(".swiper-pagination");
  let currentIndex = 0;

 
  function createPagination() {
    slides.forEach((_, index) => {
      const dot = document.createElement("div");
      dot.className = "swiper-pagination-bullet";
      if (index === 0) dot.classList.add("swiper-pagination-bullet-active");
      dot.addEventListener("click", () => goToSlide(index));
      pagination.appendChild(dot);
    });
  }

  function updatePagination() {
    const bullets = document.querySelectorAll(".swiper-pagination-bullet");
    bullets.forEach((bullet, index) => {
      bullet.classList.toggle("swiper-pagination-bullet-active", index === currentIndex);
    });
  }


  function goToSlide(index) {
    currentIndex = index;
    const offset = -currentIndex * 100; // Move slides by percentage
    swiperWrapper.style.transform = `translateX(${offset}%)`;
    updatePagination();
  }


  function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
  }


  function startAutoplay() {
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
  }

 
  createPagination();
  goToSlide(currentIndex);
  startAutoplay();
});


(function () {
  "use strict";

 
  function toggleScrolled() {
    const selectBody = document.querySelector("body");
    const selectHeader = document.querySelector("#header");
    if (
      !selectHeader.classList.contains("scroll-up-sticky") &&
      !selectHeader.classList.contains("sticky-top") &&
      !selectHeader.classList.contains("fixed-top")
    )
      return;
    window.scrollY > 100
      ? selectBody.classList.add("scrolled")
      : selectBody.classList.remove("scrolled");
  }

  document.addEventListener("scroll", toggleScrolled);
  window.addEventListener("load", toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector(".mobile-nav-toggle");

  function mobileNavToogle() {
    document.querySelector("body").classList.toggle("mobile-nav-active");
    mobileNavToggleBtn.classList.toggle("bi-list");
    mobileNavToggleBtn.classList.toggle("bi-x");
  }
  mobileNavToggleBtn.addEventListener("click", mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll("#navmenu a").forEach((navmenu) => {
    navmenu.addEventListener("click", () => {
      if (document.querySelector(".mobile-nav-active")) {
        mobileNavToogle();
      }
    });
  });
  /**
   * Preloader
   */
  const preloader = document.querySelector("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector(".scroll-top");

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100
        ? scrollTop.classList.add("active")
        : scrollTop.classList.remove("active");
    }
  }
  scrollTop.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  window.addEventListener("load", toggleScrollTop);
  document.addEventListener("scroll", toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }
  window.addEventListener("load", aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Frequently Asked Questions Toggle
   */
  document
    .querySelectorAll(".faq-item h3, .faq-item .faq-toggle")
    .forEach((faqItem) => {
      faqItem.addEventListener("click", () => {
        faqItem.parentNode.classList.toggle("faq-active");
      });
    });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function (swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener("load", function (e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: "smooth",
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll(".navmenu a");

  function navmenuScrollspy() {
    navmenulinks.forEach((navmenulink) => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        document
          .querySelectorAll(".navmenu a.active")
          .forEach((link) => link.classList.remove("active"));
        navmenulink.classList.add("active");
      } else {
        navmenulink.classList.remove("active");
      }
    });
  }
  window.addEventListener("load", navmenuScrollspy);
  document.addEventListener("scroll", navmenuScrollspy);
})();
