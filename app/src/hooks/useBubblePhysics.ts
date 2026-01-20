"use client";

import { useAnimationFrame, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState, useMemo } from "react";
import { random } from "../utils/common";

export function useBubblePhysics({ containerW, containerH, speed = 1, showInfo, pulseSpeed = 2, minPulseScale = 0.7, maxPulseScale = 1.2, maxHoverScale = 1.6 }: any) {
  const [mounted, setMounted] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const z = useMotionValue(0);
  const scale = useMotionValue(1);
  
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const time = useRef(random(0, 100));
  const baseSize = useMemo(() => random(95, 115), []);
  const radius = baseSize / 2;
  const bounds = useRef({ w: (containerW / 2) - radius, h: (containerH / 2) - radius, d: 200 });

  useEffect(() => {
    const { w, h, d } = bounds.current;
    x.set(random(-w, w)); y.set(random(-h, h)); z.set(random(-d, d));
    velocity.current = { x: random(-0.1, 0.1) * speed, y: random(-0.1, 0.1) * speed, z: random(-0.08, 0.08) * speed };
    setMounted(true);
  }, [speed]);

  useAnimationFrame((_, delta) => {
    
    if (!mounted || showInfo) return; 

    const { w, h, d } = bounds.current;

    const dt = Math.min(delta, 16) * 0.1;

    const currentVelMag = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
    const targetVel = 0.08 * speed;

    if (currentVelMag > targetVel) {
      velocity.current.x *= 0.98;
      velocity.current.y *= 0.98;
    } else {
      const ratio = targetVel / (currentVelMag || 1);
      velocity.current.x *= (0.9 + ratio * 0.1);
      velocity.current.y *= (0.9 + ratio * 0.1);
    }

    let nx = x.get() + velocity.current.x * dt;
    let ny = y.get() + velocity.current.y * dt;
    let nz = z.get() + velocity.current.z * dt;

    if (Math.abs(nx) >= w) { velocity.current.x *= -1; nx = nx >= w ? w : -w; }
    if (Math.abs(ny) >= h) { velocity.current.y *= -1; ny = ny >= h ? h : -h; }
    if (Math.abs(nz) >= d) { velocity.current.z *= -1; nz = nz >= d ? d : -d; }

    x.set(nx); y.set(ny); z.set(nz);
    
    time.current += (delta * 0.001) * pulseSpeed;
    const oscillation = (minPulseScale + maxPulseScale) / 2 + Math.sin(time.current) * ((maxPulseScale - minPulseScale) / 2);
    scale.set(oscillation);
  });

  useEffect(() => {
    if (showInfo) scale.set(maxHoverScale);
  }, [showInfo, maxHoverScale, scale]);

  const handleDragEnd = (onEndCallback: () => void) => (_: any, info: any) => {
    onEndCallback();
    velocity.current.x = info.velocity.x / 180;
    velocity.current.y = info.velocity.y / 180;
  };

  return { x, y, z, scale, baseSize, mounted, handleDragEnd };
}