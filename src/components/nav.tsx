"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import { useStack } from "@/lib/stack-context";
import { AuthModal } from "@/components/auth-modal";
import { UserMenu } from "@/components/user-menu";

function AuthButtons() {
  const { isSignedIn, isLoading } = useAuth();
  const stack = useStack();
  const [modalOpen, setModalOpen] = useState(false);

  // Open auth modal when stack action requires login
  useEffect(() => {
    if (stack.authRequired) {
      setModalOpen(true);
      stack.dismissAuth();
    }
  }, [stack.authRequired, stack.dismissAuth]);

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
  const { isSignedIn } = useAuth();
  const stack = useStack();

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
        {isSignedIn && (
          <Link href="/stack" className={`${linkClass("/stack")} relative`}>
            My Stack
            {stack.count > 0 && (
              <span className="absolute -top-1.5 -right-4 inline-flex items-center justify-center w-4 h-4 rounded-full bg-accent text-bg text-[9px] font-bold">
                {stack.count}
              </span>
            )}
          </Link>
        )}
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
