const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
const sections = [...document.querySelectorAll('main section[id]')];
const menuButton = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const progress = document.querySelector('.scroll-progress span');
const backToTop = document.querySelector('.back-to-top');
function updateScrollState(){const y=window.scrollY;const max=document.documentElement.scrollHeight-window.innerHeight;header.classList.toggle('scrolled',y>20);backToTop.classList.toggle('visible',y>650);progress.style.width=`${max?(y/max)*100:0}%`;const current=sections.filter(section=>y>=section.offsetTop-145).pop();if(current)navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${current.id}`));}
window.addEventListener('scroll',updateScrollState,{passive:true});window.addEventListener('resize',updateScrollState);updateScrollState();
menuButton.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuButton.classList.toggle('open',open);menuButton.setAttribute('aria-expanded',String(open));});
navMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navMenu.classList.remove('open');menuButton.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -30px'});document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));backToTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
