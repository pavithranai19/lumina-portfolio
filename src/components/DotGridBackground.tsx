import { useRef, useEffect, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  active: boolean;
}

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: -1000, y: -1000 });
  const dotsRef = useRef<Dot[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const dotSize = 3;
    const gap = 40;
    const proximity = 150;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Initialize dots
      dotsRef.current = [];
      const cols = Math.ceil(canvas.offsetWidth / gap);
      const rows = Math.ceil(canvas.offsetHeight / gap);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dotsRef.current.push({
            x: i * gap + gap / 2,
            y: j * gap + gap / 2,
            baseX: i * gap + gap / 2,
            baseY: j * gap + gap / 2,
            vx: 0,
            vy: 0,
            active: false,
          });
        }
      }
    };

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      dotsRef.current.forEach((dot) => {
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < proximity) {
          const force = (proximity - dist) / proximity;
          const angle = Math.atan2(dy, dx);
          dot.vx -= Math.cos(angle) * force * 5;
          dot.vy -= Math.sin(angle) * force * 5;
          dot.active = true;
        }

        // Spring back
        const springX = (dot.baseX - dot.x) * 0.05;
        const springY = (dot.baseY - dot.y) * 0.05;
        dot.vx += springX;
        dot.vy += springY;

        // Damping
        dot.vx *= 0.9;
        dot.vy *= 0.9;

        dot.x += dot.vx;
        dot.y += dot.vy;

        // Check if returned to base
        if (Math.abs(dot.x - dot.baseX) < 0.5 && Math.abs(dot.y - dot.baseY) < 0.5) {
          dot.active = false;
        }

        // Draw dot
        const alpha = dot.active ? 1 : 0.3;
        const color = dot.active ? 'hsl(190, 100%, 50%)' : 'hsl(190, 100%, 50%)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.active ? dotSize * 1.5 : dotSize, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        // Glow effect for active dots
        if (dot.active) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, dotSize * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            dot.x, dot.y, 0,
            dot.x, dot.y, dotSize * 3
          );
          gradient.addColorStop(0, 'hsla(190, 100%, 50%, 0.3)');
          gradient.addColorStop(1, 'hsla(190, 100%, 50%, 0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      setMouse({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0"
    />
  );
}
