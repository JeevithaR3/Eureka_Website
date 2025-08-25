// Staggered reveal for schedule items
document.addEventListener('DOMContentLoaded', function() {
  const items = document.querySelectorAll('.schedule-list li');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const li = entry.target;
        const index = Array.from(items).indexOf(li);
        setTimeout(() => {
          li.classList.add('show');
        }, index * 120); // 120ms stagger
        observer.unobserve(li);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(li => observer.observe(li));
});
// Nav slider underline effect (works on all pages, runs after DOM loaded)
function updateNavSliderAllNavs() {
  document.querySelectorAll('.nav').forEach(nav => {
    const navSlider = nav.querySelector('.nav-slider');
    const navLinks = Array.from(nav.querySelectorAll('a'));

    function moveNavSliderTo(el) {
      if (!navSlider || !el) return;
      const navRect = nav.getBoundingClientRect();
      const elRect = el.getBoundingClientRect();
      navSlider.style.width = elRect.width + 'px';
      navSlider.style.left = (elRect.left - navRect.left) + 'px';
    }

    // Set initial slider position to current page
    let activeLink = navLinks.find(a => {
      const href = a.getAttribute('href');
      if (href === '/' && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
        return true;
      }
      return window.location.pathname.startsWith(href) && href !== '/';
    });

    if (!activeLink) activeLink = navLinks[0];
    moveNavSliderTo(activeLink);

    // Animate on hover/click
    navLinks.forEach(link => {
      link.addEventListener('mouseenter', () => moveNavSliderTo(link));
      link.addEventListener('focus', () => moveNavSliderTo(link));
      link.addEventListener('mouseleave', () => moveNavSliderTo(activeLink));
      link.addEventListener('click', () => {
        activeLink = link;
        moveNavSliderTo(activeLink);
      });
    });

    window.addEventListener('resize', () => moveNavSliderTo(activeLink));
  });
}

document.addEventListener('DOMContentLoaded', updateNavSliderAllNavs);

// ✅ Use `pageshow` for correct highlighting after Back/Forward navigation
window.addEventListener('pageshow', updateNavSliderAllNavs);

// Simple interactive JS: mobile nav, reveal on scroll, particles canvas, form handler
document.addEventListener('DOMContentLoaded', function(){
  // Mobile nav toggle
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  navToggle && navToggle.addEventListener('click', ()=> nav.classList.toggle('show'));

  // Reveal on scroll
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('show');
    });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // Particles background (lightweight)
  const canvas = document.getElementById('particles');
  const ctx = canvas && canvas.getContext && canvas.getContext('2d');
  let W, H, particles=[];
  function setup(){
    if(!canvas) return;
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
    particles = [];
    for(let i=0;i<80;i++){
      particles.push({
        x: Math.random()*W,
        y: Math.random()*H,
        r: 1+Math.random()*2.6,
        vx: (Math.random()-0.5)*0.3,
        vy: (Math.random()-0.5)*0.3,
        hue: Math.random()*360
      });
    }
  }
  function draw(){
    if(!ctx) return;
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x += p.vx;
      p.y += p.vy;
      if(p.x<0) p.x=W;
      if(p.x>W) p.x=0;
      if(p.y<0) p.y=H;
      if(p.y>H) p.y=0;
      // draw glow
      let g = ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*8);
      g.addColorStop(0,'hsla('+ (p.hue) +',85%,60%,0.18)');
      g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r*6,0,Math.PI*2);
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }
  function onResize(){ setup(); }
  window.addEventListener('resize', onResize);
  setup(); draw();

  // Contact form (no backend) - simple front-end confirmation
  const form = document.getElementById('contactForm');
  form && form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    if(!name || !email) return alert('Please enter name and email');
    // micro animation
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    submit.textContent = 'Sending...';
    setTimeout(()=>{
      submit.disabled = false;
      submit.textContent = 'Send';
      alert('Thanks, ' + name + '! We will get back to you.');
      form.reset();
    }, 900);
  });

  // small helper: smooth scroll for links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

  // join button micro interaction
  const joinBtn = document.getElementById('joinBtn');
  joinBtn && joinBtn.addEventListener('click', ()=>{ alert('Thanks for your interest! Join form coming soon.') });
});
