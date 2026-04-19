"use client";

import { m } from "framer-motion";

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  y = 28,
  scale = 0.98
}: RevealOnScrollProps) {
  return (
    <m.div
      initial={{ opacity: 0, y, scale }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
