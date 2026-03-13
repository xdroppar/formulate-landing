"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { AuthModal } from "@/components/auth-modal";
import { UserMenu } from "@/components/user-menu";

function AuthButtons() {
  const { isSignedIn, isLoading } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) return null;

  if (isSignedIn) {
    return <UserMenu />;
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-accent text-bg hover:bg-[#00ffb3] transition-all cursor-pointer"
      >
        Sign In
      </button>
      <AuthModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}

export function Nav() {
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `text-sm font-medium transition-colors ${
      pathname === href
        ? "text-accent"
        : "text-muted hover:text-text"
    }`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 flex items-center justify-between px-6 md:px-12 py-4 bg-bg/85 backdrop-blur-md border-b border-border">
      <Link href="/" className="text-xl font-extrabold tracking-tight text-text">
        Formulate<span className="text-accent">.</span>
      </Link>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/catalog" className={linkClass("/catalog")}>
          Catalog
        </Link>
        <Link href="/brands" className={linkClass("/brands")}>
          Brands
        </Link>
        <Link href="/#features" className="text-sm font-medium text-muted hover:text-text transition-colors">
          Features
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <AuthButtons />
      </div>
    </nav>
  );
}
