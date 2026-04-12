"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface TocEntry {
  id: string;
  text: string;
}

/**
 * Auto-generated table of contents from <h2> elements in the article.
 * Client-side — scans the DOM after hydration, adds IDs to headings,
 * and highlights the current section on scroll. No changes to guide
 * content files needed.
 */
export function TableOfContents() {
  const [entries, setEntries] = useState<TocEntry[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Scan headings on mount
  useEffect(() => {
    const article = document.querySelector("article");
    if (!article) return;

    const headings = article.querySelectorAll(".prose h2");
    if (headings.length < 3) return; // Don't show TOC for short guides

    const items: TocEntry[] = [];

    headings.forEach((h2) => {
      const text = h2.textContent?.trim() || "";
      // Generate a slug from the heading text
      const id =
        h2.id ||
        text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "");

      if (!h2.id) h2.id = id;
      items.push({ id, text });
    });

    setEntries(items);

    // Intersection observer for active section tracking
    observerRef.current = new IntersectionObserver(
      (intersections) => {
        // Find the first visible heading
        for (const entry of intersections) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h2) => observerRef.current!.observe(h2));

    return () => observerRef.current?.disconnect();
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(id);
    }
  }, []);

  if (entries.length === 0) return null;

  return (
    <nav className="not-prose mb-10 rounded-xl bg-surface border border-border overflow-hidden">
      <div className="px-5 py-3 border-b border-border">
        <span className="text-[11px] font-bold tracking-[1.5px] uppercase text-muted">
          In this guide
        </span>
      </div>
      <ol className="px-5 py-3 space-y-1">
        {entries.map((entry, i) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={(e) => handleClick(e, entry.id)}
              className={`flex items-start gap-2.5 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                activeId === entry.id
                  ? "text-accent bg-accent/[0.06]"
                  : "text-muted hover:text-text hover:bg-surface2/50"
              }`}
            >
              <span className="text-[11px] font-mono text-muted/40 mt-0.5 w-4 text-right flex-shrink-0">
                {i + 1}
              </span>
              <span className="leading-snug">{entry.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
