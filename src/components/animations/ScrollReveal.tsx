import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  delay?: number;
  distance?: number;
}

export function ScrollReveal({ 
  children, 
  direction = 'up', 
  delay = 0,
  distance = 50 
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const directionValues = {
      left: { x: -distance, y: 0 },
      right: { x: distance, y: 0 },
      up: { x: 0, y: distance },
      down: { x: 0, y: -distance }
    };

    gsap.fromTo(element,
      {
        opacity: 0,
        ...directionValues[direction]
      },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 1,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: element,
          start: "top bottom-=100",
          toggleActions: "play none none reverse"
        }
      }
    );
  }, [direction, delay, distance]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
}