'use client';

import { useEffect, useRef, useState } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  r: number;
  g: number;
  b: number;
};

function particleCountForViewport(width: number): number {
  if (width < 640) return 28;
  if (width < 1024) return 48;
  return 72;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationId = 0;
    let running = true;
    let width = 0;
    let height = 0;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const initParticles = () => {
      const count = particleCountForViewport(width);
      const next: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const green = Math.random() > 0.5;
        next.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.45 + 0.35,
          r: green ? 160 : 0,
          g: green ? 255 : 189,
          b: green ? 196 : 253,
        });
      }
      particlesRef.current = next;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) animate();
    };

    const animate = () => {
      if (!running) return;

      ctx.fillStyle = 'rgba(14, 14, 14, 0.22)';
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const maxDistance = 120;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        particle.vx += (Math.random() - 0.5) * 0.08;
        particle.vy += (Math.random() - 0.5) * 0.08;
        particle.vx = Math.max(-1.4, Math.min(1.4, particle.vx));
        particle.vy = Math.max(-1.4, Math.min(1.4, particle.vy));

        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.hypot(dx, dy);

        if (distance < maxDistance && distance > 0.1) {
          const force = (1 - distance / maxDistance) * 0.35;
          particle.vx += (dx / distance) * force;
          particle.vy += (dy / distance) * force;
          particle.opacity = Math.min(0.95, 0.4 + (1 - distance / maxDistance) * 0.45);
          particle.size = 1.4 + (1 - distance / maxDistance) * 2.2;
        } else {
          particle.opacity = Math.max(0.3, particle.opacity - 0.008);
          particle.size = Math.max(1, particle.size - 0.04);
        }

        particle.vx *= 0.985;
        particle.vy *= 0.985;

        ctx.fillStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${particle.opacity})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        // Fewer connection checks (every other particle, short window)
        if (i % 2 === 0) {
          const limit = Math.min(i + 6, particles.length);
          for (let j = i + 1; j < limit; j++) {
            const other = particles[j];
            const dist = Math.hypot(other.x - particle.x, other.y - particle.y);
            if (dist < 90 && dist > 5) {
              ctx.strokeStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${
                particle.opacity * other.opacity * 0.35
              })`;
              ctx.lineWidth = 0.8;
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(other.x, other.y);
              ctx.stroke();
            }
          }
        }

        if (distance < maxDistance && distance > 0.1) {
          ctx.strokeStyle = `rgba(${particle.r}, ${particle.g}, ${particle.b}, ${particle.opacity * 0.45})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    animate();

    return () => {
      running = false;
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationId);
    };
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse at 20% 20%, rgba(160,255,196,0.08), transparent 50%), radial-gradient(ellipse at 80% 60%, rgba(0,189,253,0.08), transparent 45%), #0e0e0e',
        }}
        aria-hidden
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden
      style={{
        background: '#0e0e0e',
        display: 'block',
        width: '100%',
        height: '100%',
      }}
    />
  );
}
