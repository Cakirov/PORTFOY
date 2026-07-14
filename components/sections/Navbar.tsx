"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/lib/utils";
import { fadeInUp } from "@/lib/motion";
import { CURRENT_REVISION } from "@/lib/constants";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSectionId = useActiveSection(navLinks.map((link) => link.sectionId));

  useEffect(() => {
    if (!isMenuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border-strong bg-bg/95 py-4 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md">
      <nav
        aria-label="Ana navigasyon"
        className="relative z-10 mx-auto flex max-w-(--container-max) items-center justify-between px-(--section-px)"
      >
        <Link
          href="#hero"
          className="text-h3 font-display font-bold tracking-tight text-text-primary"
        >
          Ömer Çakıroğlu<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative py-1 font-mono-ui text-[0.76rem] tracking-wide uppercase transition-colors duration-300",
                  activeSectionId === link.sectionId
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary",
                )}
              >
                {link.label}
                {activeSectionId === link.sectionId && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        <span className="hidden font-mono-ui text-[0.68rem] tracking-wide text-text-tertiary lg:inline">
          REV. {CURRENT_REVISION.date}
        </span>

        <button
          type="button"
          className="inline-flex items-center justify-center border border-border-strong p-2 text-text-primary md:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 h-[100dvh] bg-bg md:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 pt-28 pb-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={cn(
                      "text-h3 block py-3",
                      activeSectionId === link.sectionId
                        ? "text-accent"
                        : "text-text-primary",
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
