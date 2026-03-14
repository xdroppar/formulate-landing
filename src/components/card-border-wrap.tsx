"use client";

import { useState, type ReactNode } from "react";
import { CardBorder } from "./card-border";

export function CardBorderWrap({ children }: { children: ReactNode }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="card-wrap h-full hover:-translate-y-0.5 transition-transform relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <CardBorder hovered={hovered} />
      {children}
    </div>
  );
}
