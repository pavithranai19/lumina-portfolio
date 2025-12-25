import { useRef, useEffect, useState } from 'react';

export default function GridScanBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scanPosition, setScanPosition] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let scanPos = 0;
    let direction = 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawGrid = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      const gridSize = 40;

      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.strokeStyle = 'hsla(190, 100%, 50%, 0.1)';
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw scan line
      const scanWidth = 100;
      const gradient = ctx.createLinearGradient(
        scanPos - scanWidth,
        0,
        scanPos + scanWidth,
        0
      );
      gradient.addColorStop(0, 'hsla(330, 100%, 50%, 0)');
      gradient.addColorStop(0.5, 'hsla(330, 100%, 50%, 0.3)');
      gradient.addColorStop(1, 'hsla(330, 100%, 50%, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Brighten grid lines near scan
      ctx.strokeStyle = 'hsla(190, 100%, 50%, 0.4)';
      ctx.lineWidth = 2;

      for (let x = 0; x <= width; x += gridSize) {
        const dist = Math.abs(x - scanPos);
        if (dist < scanWidth) {
          const alpha = 1 - dist / scanWidth;
          ctx.strokeStyle = `hsla(190, 100%, 50%, ${0.3 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
      }

      // Animate scan position
      scanPos += 2 * direction;
      if (scanPos > width + 100) {
        direction = -1;
      } else if (scanPos < -100) {
        direction = 1;
      }

      animationId = requestAnimationFrame(drawGrid);
    };

    resize();
    window.addEventListener('resize', resize);
    drawGrid();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
