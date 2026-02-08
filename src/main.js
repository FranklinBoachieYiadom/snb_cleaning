import "./style.css";
import "./hero-animation.js";

// Reveal on Scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("opacity-100", "translate-y-0");
      entry.target.classList.remove("opacity-0", "translate-y-10");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const revealElements = document.querySelectorAll(".reveal");
  revealElements.forEach((el) => {
    el.classList.add(
      "transition-all",
      "duration-1000",
      "opacity-0",
      "translate-y-10",
    );
    observer.observe(el);
  });

  // Mobile Menu Logic
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const closeMenuBtn = document.getElementById("close-menu-btn");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
    });
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
    });
  }

  // Service Carousel Logic
  const carousels = document.querySelectorAll(".service-carousel");
  carousels.forEach((carousel) => {
    const images = carousel.querySelectorAll("img");
    let activeIndex = 0;

    setInterval(() => {
      images[activeIndex].classList.remove("opacity-100");
      images[activeIndex].classList.add("opacity-0");

      activeIndex = (activeIndex + 1) % images.length;

      images[activeIndex].classList.remove("opacity-0");
      images[activeIndex].classList.add("opacity-100");
    }, 3000); // Change image every 3 seconds
  });
});

// EmailJS contact form handling
// Replace these with your actual EmailJS service/template IDs
const EMAILJS_SERVICE_ID = "service_bwgoncz";
const EMAILJS_TEMPLATE_ID = "template_87g5d5s";
const EMAILJS_PUBLIC_KEY = "08nSt1Ieq0hVEKVG5";

function initEmailJS() {
  if (typeof window.emailjs !== "undefined") {
    try {
      // emailjs.init accepts a string public key; calling again is safe
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (e) {
      // ignore initialization errors
      console.warn("EmailJS init error", e);
    }
  }
}

async function sendMail(e) {
  if (e && e.preventDefault) e.preventDefault();
  initEmailJS();

  const first_name = document.getElementById("first_name")?.value || "";
  const last_name = document.getElementById("last_name")?.value || "";
  const email = document.getElementById("email")?.value || "";
  const subject = document.getElementById("service_type")?.value || "";
  const message = document.getElementById("message")?.value || "";

  if (!email) {
    Swal.fire("Please provide an email address.");
    // alert("Please provide an email address.");
    return;
  }

  const templateParams = {
    first_name,
    last_name,
    email,
    subject,
    message,
  };

  // If the developer didn't replace the placeholders, warn and abort
  if (
    EMAILJS_SERVICE_ID === "YOUR_SERVICE_ID" ||
    EMAILJS_TEMPLATE_ID === "YOUR_TEMPLATE_ID"
  ) {
    console.error("EmailJS service/template IDs are not set in src/main.js");
    alert(
      "Email sending is not configured. Please set your EmailJS service and template IDs in src/main.js",
    );
    return;
  }

  try {
    await window.emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
    );
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Message sent — thank you!",
      showConfirmButton: false,
      timer: 1500
    });
    //alert("Message sent — thank you!");
    // clear form
    const form = document.querySelector("form");
    if (form) form.reset();
  } catch (err) {
    console.error("EmailJS error", err);
    alert("Failed to send message. Please try again later.");
  }
}

// // Expose sendMail so inline onclick="sendMail()" still works
window.sendMail = sendMail;

// // Also attach to form submit to support progressive enhancement
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  if (form) form.addEventListener("submit", sendMail);
});


