export function initHeroAnimation() {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
  
    const ctx = canvas.getContext('2d');
    let width, height;
    let bubbles = [];
  
    function resize() {
      // Use parent container size
      const parent = canvas.parentElement;
      width = canvas.width = parent.offsetWidth;
      height = canvas.height = parent.offsetHeight;
    }
  
    class Bubble {
      constructor() {
        this.init();
      }
  
      init() {
        this.x = Math.random() * width;
        this.y = height + Math.random() * 100;
        this.size = Math.random() * 20 + 5; // Bubbles size
        this.speed = Math.random() * 1.5 + 0.5;
        this.opacity = Math.random() * 0.3 + 0.1;
        this.wobble = Math.random() * Math.PI * 2;
        this.wobbleSpeed = 0.02 + Math.random() * 0.03;
        this.wobbleDistance = Math.random() * 20 + 10;
        this.initialX = this.x;
      }
  
      update() {
        this.y -= this.speed;
        this.wobble += this.wobbleSpeed;
        this.x = this.initialX + Math.sin(this.wobble) * this.wobbleDistance;

        if (this.y < -50) {
          this.init();
        }
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        
        // Gradient for bubble shine
        const gradient = ctx.createRadialGradient(
            this.x - this.size/3, this.y - this.size/3, this.size/10,
            this.x, this.y, this.size
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.4})`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${this.opacity})`);
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Ring
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity + 0.1})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  
    function init() {
      resize();
      bubbles = [];
      for (let i = 0; i < 40; i++) {
        bubbles.push(new Bubble());
      }
      animate();
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
      bubbles.forEach(b => {
        b.update();
        b.draw();
      });
      requestAnimationFrame(animate);
    }
  
    window.addEventListener('resize', () => {
        resize();
        bubbles.forEach(b => b.init());
    });
    init();
}

// Auto-run if document is ready, or wait
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeroAnimation);
} else {
    initHeroAnimation();
}
