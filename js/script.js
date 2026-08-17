const header = document.querySelector(".site-header");
const navLinks = document.querySelectorAll(".nav-links a:not(.nav-cta)");
const sections = [...document.querySelectorAll("main section[id]")];
const menuButton = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-links");
const progress = document.querySelector(".scroll-progress span");
const backToTop = document.querySelector(".back-to-top");

function updateScrollState() {
  const scrollY = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

  header?.classList.toggle("scrolled", scrollY > 20);
  backToTop?.classList.toggle("visible", scrollY > 650);

  if (progress) {
    progress.style.width = `${maxScroll ? (scrollY / maxScroll) * 100 : 0}%`;
  }

  const current = sections
    .filter((section) => scrollY >= section.offsetTop - 145)
    .pop();
  if (current) {
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current.id}`,
      );
    });
  }
}

window.addEventListener("scroll", updateScrollState, { passive: true });
window.addEventListener("resize", updateScrollState);
updateScrollState();

if (menuButton && navMenu) {
  const setMenuState = (open) => {
    navMenu.classList.toggle("open", open);
    menuButton.classList.toggle("open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.querySelector(".sr-only").textContent = open
      ? "Close navigation"
      : "Open navigation";
  };

  menuButton.addEventListener("click", () => {
    setMenuState(!navMenu.classList.contains("open"));
  });

  navMenu.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      setMenuState(false);
    }),
  );

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navMenu.classList.contains("open")) {
      setMenuState(false);
      menuButton.focus();
    }
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -30px" },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((element) => revealObserver.observe(element));
} else {
  document
    .querySelectorAll(".reveal")
    .forEach((element) => element.classList.add("visible"));
}

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
