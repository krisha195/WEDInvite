/* ================= LOADER ================= */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(() => { loader.style.display = 'none'; }, 1000);
});

/* ================= COUNTDOWN ================= */
const weddingDate = new Date("April 27, 2026 17:00:00").getTime();

setInterval(() => {
    const now = new Date().getTime();
    const diff = weddingDate - now;

    if (diff < 0) return;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = d < 10 ? "0"+d : d;
    document.getElementById("hours").innerText = h < 10 ? "0"+h : h;
    document.getElementById("minutes").innerText = m < 10 ? "0"+m : m;
    document.getElementById("seconds").innerText = s < 10 ? "0"+s : s;
}, 1000);

/* ================= SCROLL ANIMATION (Visible Effect) ================= */
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.scroll-anim').forEach(el => observer.observe(el));

/* ================= GALLERY CAROUSEL ================= */
const cards = document.querySelectorAll('.card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0; 

function updateCards() {
    cards.forEach((card, index) => {
        card.className = 'card'; 
        
        let diff = index - currentIndex;
        if (diff < 0) diff += cards.length; 
        
        if (diff === 0) card.classList.add('active');
        else if (diff === 1) card.classList.add('next');
        else if (diff === 2) card.classList.add('next-2');
        else if (diff === cards.length - 1) card.classList.add('prev');
        else if (diff === cards.length - 2) card.classList.add('prev-2');
    });
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCards();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCards();
});

// Initial call
updateCards();

/* ================= GOLD PARTICLES ================= */
const canvas = document.getElementById('goldCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.opacity = Math.random();
    }
    update() {
        this.y -= this.speedY;
        if (this.y < 0) this.y = canvas.height;
        this.opacity = Math.abs(Math.sin(Date.now() * 0.001 + this.x)); 
    }
    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for(let i=0; i<70; i++) particles.push(new Particle());

function animate() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
}
animate();