'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useSpring } from 'framer-motion';
import { usePathname } from 'next/navigation';

interface NavLink {
  label: string;
  href: string;
}

const homeLinks: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Advanced German (C1+)', href: '/advanced-german' },
];

const advancedGermanLinks: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'The Gap', href: '#problem' },
  { label: 'Training', href: '#training' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLinks = pathname === '/advanced-german' ? advancedGermanLinks : homeLinks;

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] bg-gradient-to-r from-[var(--c-accent-primary)] to-[var(--c-accent-secondary)]"
      />

      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

          <div className="flex items-center justify-between h-[60px]">

            {/* Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo-new.png"
                  alt="Aydence Logo"
                  width={320}
                  height={112}
                  priority
                  className="h-16 md:h-20 w-auto object-contain filter drop-shadow-sm"
                />
              </Link>
            </motion.div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-10">
              {currentLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    className="relative text-sm uppercase tracking-widest font-semibold text-slate-600 group hover:text-[var(--c-accent-primary)] transition-colors duration-300"
                  >
                    {link.label}
                    <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[var(--c-accent-primary)] rounded-full group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile hamburger */}
            <motion.button
              id="menu-toggle"
              className="md:hidden flex flex-col gap-[6px] p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((bar) => (
                <motion.span
                  key={bar}
                  animate={
                    bar === 0 ? (menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 })
                  : bar === 1 ? (menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 })
                  : (menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 })
                  }
                  className="block w-6 h-[2px] bg-slate-800 rounded-full origin-center"
                  transition={{ duration: 0.25 }}
                />
              ))}
            </motion.button>
          </div>

          {/* Mobile menu */}
          <motion.div
            initial={false}
            animate={menuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden"
          >
            <div className="flex flex-col gap-4 pt-4 pb-8 border-t border-slate-200 mt-4">
              {currentLinks.map((link, i) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-lg font-medium py-2 px-4 text-slate-700 hover:text-[var(--c-accent-primary)] hover:bg-slate-100 rounded-xl transition-all"
                >
                  <motion.span
                    initial={{ x: -16, opacity: 0 }}
                    animate={menuOpen ? { x: 0, opacity: 1 } : { x: -16, opacity: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="block"
                  >
                    {link.label}
                  </motion.span>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}
