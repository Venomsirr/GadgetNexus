// Custom animations


// ===== Parallax Scroll Effect =====
window.addEventListener("scroll", function() {
  let scrolled = window.pageYOffset;
  document.querySelectorAll("img").forEach((el, index) => {
    let speed = (index % 5 + 1) * 0.1; // vary speed by index
    el.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// ===== Floating Animation =====
function floatImages() {
  document.querySelectorAll("img").forEach((el, i) => {
    el.animate(
      [
        { transform: "translateY(0px)" },
        { transform: "translateY(-10px)" },
        { transform: "translateY(0px)" }
      ],
      {
        duration: 4000 + i * 200, // staggered timing
        iterations: Infinity,
        easing: "ease-in-out"
      }
    );
  });
}
window.onload = floatImages;


// ===== Fireworks / Particle Background =====
const canvas = document.createElement('canvas');
canvas.id = "fireworksCanvas";
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.zIndex = "-1";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.radius = Math.random() * 2 + 1;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.alpha = 1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 0.01;
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}

let particles = [];

function createFirework(x, y) {
  const colors = ["#ff004f", "#ff9100", "#00eaff", "#ffffff", "#00ff6a"];
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)]));
  }
}

function animateFireworks() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animateFireworks);
}

canvas.addEventListener("click", (e) => {
  createFirework(e.clientX, e.clientY);
});

// Auto fireworks burst every 2 seconds
setInterval(() => {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  createFirework(x, y);
}, 2000);

animateFireworks();
