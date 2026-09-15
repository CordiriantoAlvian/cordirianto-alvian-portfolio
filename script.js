const header = document.getElementById('site-header');
const progress = document.getElementById('scroll-progress');
const menuButton = document.getElementById('menu-toggle');
const nav = document.getElementById('main-nav');
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('#main-nav a')];

function onScroll() {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = `${total > 0 ? (window.scrollY / total) * 100 : 0}%`;
  header.classList.toggle('scrolled', window.scrollY > 20);
  let current = 'home';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
});
navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

document.querySelectorAll('.filter').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const selected = button.dataset.filter;
    document.querySelectorAll('.project').forEach(project => {
      const categories = project.dataset.category.split(' ');
      project.classList.toggle('hidden', selected !== 'all' && !categories.includes(selected));
    });
  });
});

document.getElementById('copy-name').addEventListener('click', async event => {
  try {
    await navigator.clipboard.writeText(event.currentTarget.dataset.copy);
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  } catch {
    event.currentTarget.textContent = 'Cordirianto Alvian';
  }
});
