"use client";

import { useEffect, useRef, useState } from "react";
import Logo from "./Logo";
import Arrow from "./Arrow";
import styles from "./Header.module.css";

export default function Header({ site }) {
  const { nav, logo, contact } = site;
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const progressRef = useRef(null);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setSolid(y > 40);
      setHidden(y > 480 && y > lastY + 2 ? true : y < lastY - 2 ? false : (prev) => prev);
      lastY = y;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const lenis = window.__lenis;
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      firstLinkRef.current?.focus();
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
    }
    const onKey = (e) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const close = () => setOpen(false);

  // Lenis is stopped while the menu is open, so close first, then scroll.
  const goTo = (e, href) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector(href);
      if (!target) return;
      if (window.__lenis) window.__lenis.scrollTo(target, { force: true, duration: 1.2 });
      else target.scrollIntoView();
      history.replaceState(null, "", href);
    });
  };
  const cls = [styles.header, solid && styles.solid, hidden && !open && styles.hidden, open && styles.open]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className={styles.progress} ref={progressRef} aria-hidden="true" />
      <div className={`container ${styles.bar}`}>
        <a href="#top" className={styles.logo} aria-label={`${logo.alt}, back to top`} onClick={close}>
          <Logo className={styles.logoLight} />
          <Logo className={styles.logoDark} />
        </a>

        <nav aria-label={nav.label} className={styles.nav}>
          <ul>
            {nav.items.map((item) => (
              <li key={item.href}>
                <a href={item.href} className={styles.link}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href={nav.cta.href} className={`btn ${styles.cta}`} data-magnetic>
          {nav.cta.label}
          <Arrow />
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? nav.menuClose : nav.menuOpen}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={styles.menu} inert={!open} aria-hidden={!open}>
        <div className={`container ${styles.menuInner}`}>
          <nav aria-label={nav.label}>
            <ul className={styles.menuList}>
              {[...nav.items, nav.cta].map((item, i) => (
                <li key={item.label} style={{ "--i": i }}>
                  <a href={item.href} onClick={(e) => goTo(e, item.href)} ref={i === 0 ? firstLinkRef : undefined}>
                    <span className={styles.menuIndex}>0{i + 1}</span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className={styles.menuFoot}>
            <p>{nav.mobileNote}</p>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </header>
  );
}
