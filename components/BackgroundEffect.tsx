import React, { useEffect, useRef } from 'react';

const BackgroundEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    let frame = 0;
    
    // Perspective Grid Parameters
    const horizon = height * 0.4; // Horizon line height
    const gridSpeed = 0.5;
    
    class DataPacket {
      x: number;
      y: number;
      z: number;
      speed: number;
      
      constructor() {
        this.x = (Math.random() - 0.5) * width * 2;
        this.z = Math.random() * 1000;
        this.y = 0; // On the floor
        this.speed = Math.random() * 5 + 2;
      }

      update() {
        this.z -= this.speed;
        if (this.z <= 1) {
           this.z = 1000;
           this.x = (Math.random() - 0.5) * width * 2;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        // Perspective projection
        const scale = 200 / (this.z || 1);
        const screenX = width / 2 + this.x * scale;
        const screenY = horizon + 100 * scale + 200 * scale; // Move floor down

        const alpha = Math.min(1, (1000 - this.z) / 500);
        
        ctx.fillStyle = `rgba(16, 185, 129, ${alpha})`;
        ctx.fillRect(screenX, screenY, 2 * scale * 2, 2 * scale * 2);
      }
    }

    const packets: DataPacket[] = Array.from({ length: 20 }, () => new DataPacket());

    const animate = () => {
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Draw Grid
      const time = frame * gridSpeed;
      
      ctx.strokeStyle = 'rgba(16, 185, 129, 0.15)';
      ctx.lineWidth = 1;
      
      // Vertical lines (converging to vanishing point)
      const centerX = width / 2;
      const numVLines = 30;
      for (let i = -numVLines; i <= numVLines; i++) {
        const x = i * 100;
        ctx.beginPath();
        ctx.moveTo(centerX, horizon); // Vanishing point
        ctx.lineTo(centerX + x * 10, height + 500); // Spread out at bottom
        ctx.stroke();
      }

      // Horizontal lines (moving towards camera)
      const numHLines = 20;
      for (let i = 0; i < numHLines; i++) {
        // Exponential distance for perspective feel
        const z = (i * 50 - time) % 1000;
        const zPos = z < 0 ? z + 1000 : z;
        
        const scale = 200 / (zPos || 1);
        const y = horizon + 200 * scale; // Floor level

        if (y > height) continue;

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        
        ctx.globalAlpha = Math.min(1, zPos / 500) * 0.3; // Fade out near horizon
        ctx.stroke();
        ctx.globalAlpha = 1.0;
      }
      
      // Draw Packets
      packets.forEach(p => {
          p.update();
          p.draw(ctx);
      });

      frame++;
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full z-0 opacity-60 pointer-events-none"
    />
  );
};

export default BackgroundEffect;