'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface GlobePoint {
  x: number;
  y: number;
  z: number;
  lat: number;
  lng: number;
  active: boolean;
}

export default function AnimatedGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<GlobePoint[]>([]);
  const rotationRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const updateSize = () => {
      const size = Math.min(window.innerWidth * 0.4, 500);
      canvas.width = size;
      canvas.height = size;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Generate globe points
    const generatePoints = () => {
      const points: GlobePoint[] = [];
      const numPoints = 800;
      const radius = canvas.width / 2.5;

      for (let i = 0; i < numPoints; i++) {
        const lat = Math.acos(2 * Math.random() - 1) - Math.PI / 2;
        const lng = Math.random() * 2 * Math.PI;

        const x = radius * Math.cos(lat) * Math.cos(lng);
        const y = radius * Math.cos(lat) * Math.sin(lng);
        const z = radius * Math.sin(lat);

        points.push({
          x,
          y,
          z,
          lat,
          lng,
          active: Math.random() > 0.95, // 5% active emergency points
        });
      }

      pointsRef.current = points;
    };

    generatePoints();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      rotationRef.current += 0.002;

      // Sort points by z-index for proper rendering
      const sortedPoints = [...pointsRef.current].sort((a, b) => {
        const rotatedAZ = a.z * Math.cos(rotationRef.current) - a.x * Math.sin(rotationRef.current);
        const rotatedBZ = b.z * Math.cos(rotationRef.current) - b.x * Math.sin(rotationRef.current);
        return rotatedAZ - rotatedBZ;
      });

      sortedPoints.forEach((point) => {
        // Rotate point
        const rotatedX = point.x * Math.cos(rotationRef.current) + point.z * Math.sin(rotationRef.current);
        const rotatedZ = point.z * Math.cos(rotationRef.current) - point.x * Math.sin(rotationRef.current);

        // Only render points on the visible hemisphere
        if (rotatedZ > 0) {
          const scale = 1 / (1 + rotatedZ / 400);
          const x2d = centerX + rotatedX * scale;
          const y2d = centerY + point.y * scale;

          // Calculate opacity based on z-depth
          const opacity = Math.max(0.1, 1 - rotatedZ / 300);

          if (point.active) {
            // Emergency point - pulsing red
            const pulse = Math.sin(Date.now() / 300) * 0.5 + 0.5;
            ctx.fillStyle = `rgba(239, 68, 68, ${opacity * (0.5 + pulse * 0.5)})`;
            ctx.beginPath();
            ctx.arc(x2d, y2d, 3 * scale, 0, Math.PI * 2);
            ctx.fill();

            // Glow effect
            ctx.fillStyle = `rgba(239, 68, 68, ${opacity * 0.2})`;
            ctx.beginPath();
            ctx.arc(x2d, y2d, 6 * scale, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Normal point
            ctx.fillStyle = `rgba(59, 130, 246, ${opacity * 0.6})`;
            ctx.beginPath();
            ctx.arc(x2d, y2d, 1.5 * scale, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      });

      // Draw globe outline
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(centerX, centerY, canvas.width / 2.5, 0, Math.PI * 2);
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="relative flex items-center justify-center"
    >
      <canvas
        ref={canvasRef}
        className="max-w-full h-auto"
        style={{ filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.3))' }}
      />
      
      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute w-full h-full border-2 border-primary-500/20 rounded-full"
          style={{ transform: 'rotateX(75deg)' }}
        />
      </div>
    </motion.div>
  );
}

// Made with Bob