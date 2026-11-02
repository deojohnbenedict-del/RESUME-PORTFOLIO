document.getElementById("year").textContent = new Date().getFullYear();

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

const root = document.documentElement;
try {
  const saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);
  else if (window.matchMedia("(prefers-color-scheme: dark)").matches) root.setAttribute("data-theme", "dark");
} catch (e) {}
document.getElementById("themeToggle").addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

const roles = ["Aspiring Data Engineer", "Data Optimization Engineer", "Apps Script Developer", "Dashboard Builder"];
const typedEl = document.getElementById("typed");
let r = 0, c = 0, deleting = false;
function type() {
  const word = roles[r];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c < word.length) c++;
  else if (!deleting) { deleting = true; setTimeout(type, 1300); return; }
  else if (c > 0) c--;
  else { deleting = false; r = (r + 1) % roles.length; }
  setTimeout(type, deleting ? 45 : 95);
}
type();

document.querySelectorAll(".track").forEach(track => {
  const originals = Array.from(track.children);
  const setWidth = () => originals.reduce((w, li) => w + li.getBoundingClientRect().width, 0);
  let guard = 0;
  while (setWidth() < window.innerWidth * 1.2 && guard++ < 6) {
    originals.forEach(li => track.appendChild(li.cloneNode(true)));
  }
  Array.from(track.children).forEach(li => track.appendChild(li.cloneNode(true)));
});

document.querySelectorAll(".shot[data-img]").forEach(el => {
  const img = new Image();
  img.onload = () => {
    el.style.backgroundImage = `url("${el.dataset.img}")`;
    el.classList.add("has-img");
  };
  img.src = el.dataset.img;
});

document.querySelectorAll(".section .wrap > *, .project, .timeline li, .path li").forEach(el => el.classList.add("reveal"));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("show"); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

const sections = document.querySelectorAll("main section[id]");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 140) current = s.id; });
  navLinks.querySelectorAll("a").forEach(a =>
    a.classList.toggle("active", a.getAttribute("href") === "#" + current)
  );
});