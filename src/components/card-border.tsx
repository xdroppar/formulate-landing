"use client";

import { useRef, useEffect, useCallback } from "react";
import { usePreferences } from "@/lib/preferences";

/**
 * Canvas border overlay matching the Formulate app's _BorderOverlay.
 * Draws 4 edge lines, each with a gradient fading to transparent at both ends.
 * On hover: accent color, stroke 1.5px. Default: white 27% opacity, stroke 1px.
 */
export function CardBorder({ hovered }: { hovered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { accentColor } = usePreferences();

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const fade = 30;
    const sw = hovered ? 1.5 : 1;

    // Parse accent color for hover state
    let r = 255, g = 255, b = 255, a = 0.27;
    if (hovered) {
      // Parse hex accent color
      const hex = accentColor.replace("#", "");
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
      a = 0.78;
    }

    const solid = `rgba(${r},${g},${b},${a})`;
    const transparent = `rgba(${r},${g},${b},0)`;

    ctx.lineWidth = sw;

    // Top edge
    const topGrad = ctx.createLinearGradient(0, 0, w, 0);
    topGrad.addColorStop(0, transparent);
    topGrad.addColorStop(Math.min(fade / w, 0.5), solid);
    topGrad.addColorStop(Math.max(1 - fade / w, 0.5), solid);
    topGrad.addColorStop(1, transparent);
    ctx.strokeStyle = topGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0.5);
    ctx.lineTo(w, 0.5);
    ctx.stroke();

    // Bottom edge
    const botGrad = ctx.createLinearGradient(0, 0, w, 0);
    botGrad.addColorStop(0, transparent);
    botGrad.addColorStop(Math.min(fade / w, 0.5), solid);
    botGrad.addColorStop(Math.max(1 - fade / w, 0.5), solid);
    botGrad.addColorStop(1, transparent);
    ctx.strokeStyle = botGrad;
    ctx.beginPath();
    ctx.moveTo(0, h - 0.5);
    ctx.lineTo(w, h - 0.5);
    ctx.stroke();

    // Left edge
    const leftGrad = ctx.createLinearGradient(0, 0, 0, h);
    leftGrad.addColorStop(0, transparent);
    leftGrad.addColorStop(Math.min(fade / h, 0.5), solid);
    leftGrad.addColorStop(Math.max(1 - fade / h, 0.5), solid);
    leftGrad.addColorStop(1, transparent);
    ctx.strokeStyle = leftGrad;
    ctx.beginPath();
    ctx.moveTo(0.5, 0);
    ctx.lineTo(0.5, h);
    ctx.stroke();

    // Right edge
    const rightGrad = ctx.createLinearGradient(0, 0, 0, h);
    rightGrad.addColorStop(0, transparent);
    rightGrad.addColorStop(Math.min(fade / h, 0.5), solid);
    rightGrad.addColorStop(Math.max(1 - fade / h, 0.5), solid);
    rightGrad.addColorStop(1, transparent);
    ctx.strokeStyle = rightGrad;
    ctx.beginPath();
    ctx.moveTo(w - 0.5, 0);
    ctx.lineTo(w - 0.5, h);
    ctx.stroke();
  }, [hovered, accentColor]);

  useEffect(() => {
    draw();
  }, [draw]);

  // Redraw on resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
}
