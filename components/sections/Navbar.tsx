"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { StaggerGroup } from "@/components/motion/StaggerGroup";
import { cn } from "@/lib/utils";
import { fadeInUp, motionTokens, EASE_STANDARD } from "@/lib/motion";
import { PERSON_NAME } from "@/lib/constants";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSectionId = useActiveSection(navLinks.map((link) => link.sectionId));
  const { direction, isAtTop } = useScrollDirection();
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpenRef = useRef(false);
  // Hide only when actively scrolling down past the top — never while the
  // mobile menu is open (it would rip a modal off-screen mid-interaction).
  const hideHeader = direction === "down" && !isAtTop && !isMenuOpen;

  useFocusTrap(menuRef, isMenuOpen);
  useLockBodyScroll(isMenuOpen);

  useEffect(() => {
    if (wasOpenRef.current && !isMenuOpen) {
      toggleButtonRef.current?.focus();
    }
    wasOpenRef.current = isMenuOpen;
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <motion.header
      animate={{ y: hideHeader ? "-100%" : "0%" }}
      transition={{ duration: motionTokens.duration.fast, ease: EASE_STANDARD }}
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b border-border-strong bg-bg/95 py-5 shadow-[0_12px_32px_-16px_rgba(0,0,0,0.6)] backdrop-blur-md",
        // The mobile overlay below is a DOM descendant of this header, so it's
        // capped at the header's own stacking level — bump it above
        // ScrollProgress (z-50) while the menu is open, rather than raising
        // the overlay itself (which wouldn't escape this context anyway).
        isMenuOpen && "z-[60]",
      )}
    >
      <nav
        aria-label="Ana navigasyon"
        className="container-max relative z-10 flex items-center justify-between px-(--section-px)"
      >
        <Link
          href="#hero"
          aria-label={PERSON_NAME}
          className="group relative flex h-10 w-10 items-center justify-center border border-accent bg-bg-elevated font-mono-ui text-[0.68rem] font-bold tracking-wide text-accent transition-colors duration-(--motion-fast) ease-out hover:bg-accent-soft"
        >
          CKR
          {/* Corner brackets snap inward and fade in on hover — a viewfinder
              "lock-on" cue that reinforces the mark without moving the box. */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2.5 -left-2.5 h-2.5 w-2.5 border-t border-l border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-top-1.5 group-hover:-left-1.5 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2.5 -right-2.5 h-2.5 w-2.5 border-t border-r border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-top-1.5 group-hover:-right-1.5 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2.5 -left-2.5 h-2.5 w-2.5 border-b border-l border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-bottom-1.5 group-hover:-left-1.5 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-2.5 w-2.5 border-b border-r border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-bottom-1.5 group-hover:-right-1.5 group-hover:opacity-100"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "relative py-1 font-mono-ui text-[0.76rem] tracking-wide uppercase transition-colors duration-(--motion-fast)",
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
                    transition={{ duration: motionTokens.duration.fast, ease: EASE_STANDARD }}
                  />
                )}
              </Link>
            </li>
          ))}
        </ul>

        {/* Placeholder link to a not-yet-built section — same lock-on visual
            language as the CKR mark, kept separate so it can be pointed at
            real content later without touching the brand mark. Also
            restores the nav-link list's original centered position (this
            slot used to hold a now-removed REV. badge). */}
        <Link
          href="/lab"
          aria-label="Yapım aşamasında yeni bölüm"
          className="group relative flex h-10 w-10 items-center justify-center border border-border-strong bg-bg-elevated font-mono-ui text-[0.68rem] font-bold tracking-wide text-text-tertiary transition-colors duration-(--motion-fast) ease-out hover:border-accent hover:bg-accent-soft hover:text-accent"
        >
          +
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2.5 -left-2.5 h-2.5 w-2.5 border-t border-l border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-top-1.5 group-hover:-left-1.5 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-2.5 -right-2.5 h-2.5 w-2.5 border-t border-r border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-top-1.5 group-hover:-right-1.5 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2.5 -left-2.5 h-2.5 w-2.5 border-b border-l border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-bottom-1.5 group-hover:-left-1.5 group-hover:opacity-100"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-2.5 -right-2.5 h-2.5 w-2.5 border-b border-r border-accent opacity-0 transition-all duration-(--motion-fast) ease-out group-hover:-bottom-1.5 group-hover:-right-1.5 group-hover:opacity-100"
          />
        </Link>

        <button
          ref={toggleButtonRef}
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
            ref={menuRef}
            role="dialog"
            aria-modal="true"
            aria-label="Mobil navigasyon"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: motionTokens.duration.fast }}
            className="fixed inset-0 top-0 h-[100dvh] bg-bg md:hidden"
          >
            <StaggerGroup as="ul" trigger="mount" className="flex flex-col gap-1 px-6 pt-28 pb-8">
              {navLinks.map((link) => (
                <motion.li key={link.href} variants={fadeInUp}>
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
            </StaggerGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
