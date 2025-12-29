import './style.css'
import './hero-animation.js'

// Reveal on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('opacity-100', 'translate-y-0');
      entry.target.classList.remove('opacity-0', 'translate-y-10');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => {
    el.classList.add('transition-all', 'duration-1000', 'opacity-0', 'translate-y-10');
    observer.observe(el);
  });
  
  // Mobile Menu Logic
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  
  if(menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('translate-x-full');
    });
  }
  
  if(closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener('click', () => {
       mobileMenu.classList.add('translate-x-full');
    });
  }

  // Service Carousel Logic
  const carousels = document.querySelectorAll('.service-carousel');
  carousels.forEach(carousel => {
      const images = carousel.querySelectorAll('img');
      let activeIndex = 0;
      
      setInterval(() => {
          images[activeIndex].classList.remove('opacity-100');
          images[activeIndex].classList.add('opacity-0');
          
          activeIndex = (activeIndex + 1) % images.length;
          
          images[activeIndex].classList.remove('opacity-0');
          images[activeIndex].classList.add('opacity-100');
      }, 3000); // Change image every 3 seconds
  });
});
