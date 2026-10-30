// Mobile navigation, reveal-on-scroll effects, and a small hero text animation.
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle?.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const typeLine = document.querySelector("#type-line");
const phrases = ["web development", "creative coding", "learning every day"];
let phraseIndex = 0;
let charIndex = phrases[0].length;
let deleting = false;

function typePhrase() {
  if (!typeLine || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const phrase = phrases[phraseIndex];
  if (deleting) {
    charIndex -= 1;
    typeLine.textContent = phrase.slice(0, charIndex);
  } else {
    charIndex += 1;
    typeLine.textContent = phrase.slice(0, charIndex);
  }

  let delay = deleting ? 45 : 75;
  if (!deleting && charIndex >= phrase.length) {
    deleting = true;
    delay = 1400;
  } else if (deleting && charIndex <= 0) {
    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 350;
  }
  window.setTimeout(typePhrase, delay);
}
window.setTimeout(() => {
  deleting = true;
  typePhrase();
}, 1700);
