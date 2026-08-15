const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...document.querySelectorAll('main section[id]')];
const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  const current = sections.filter(section => window.scrollY >= section.offsetTop - 120).pop();
  if (current) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current.id}`));
}, { passive: true });

menuButton.addEventListener('click', () => {
  const open = navMenu.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
navLinks.forEach(link => link.addEventListener('click', () => { navMenu.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); }));

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
}), { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const role = document.getElementById('typed-role');
const phrase = 'Penetration Tester | Cybersecurity Professional';
let index = 0;
if (role) { role.textContent = ''; function typeRole() { if (index < phrase.length) { role.textContent += phrase[index++]; setTimeout(typeRole, 33); } } setTimeout(typeRole, 350); }

const dialog = document.getElementById('project-dialog');
const dialogTitle = document.getElementById('dialog-title');
if (dialog && dialogTitle) { document.querySelectorAll('.details-button').forEach(button => button.addEventListener('click', () => { dialogTitle.textContent = button.dataset.project; dialog.showModal(); })); document.querySelector('.dialog-close').addEventListener('click', () => dialog.close()); dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }); }
