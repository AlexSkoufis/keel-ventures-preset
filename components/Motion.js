"use client";

import { useEffect, useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MOTION = "(prefers-reduced-motion: no-preference)";
const DESKTOP_MOTION = "(prefers-reduced-motion: no-preference) and (min-width: 1024px)";

/*
 * All page animation lives here. Sections are server-rendered and fully visible;
 * this component only adds motion through data attributes once JS has loaded.
 */
export default function Motion() {
  useIsomorphicLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    const q = (sel) => gsap.utils.toArray(sel);
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // Pinned sections first, so triggers further down account for pin spacing.
    mm.add(DESKTOP_MOTION, () => {
      const section = document.querySelector("[data-process]");
      const track = section?.querySelector("[data-process-track]");
      const progress = section?.querySelector("[data-process-progress]");
      if (section && track) {
        section.classList.add("is-horizontal");
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            refreshPriority: 1,
          },
        });
        tl.to(track, { x: () => -distance(), ease: "none" }, 0);
        if (progress) tl.fromTo(progress, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
      }

      // How we partner: light up the item in view and sync the big counter.
      const approach = document.querySelector("[data-approach]");
      const items = q("[data-approach-item]");
      const num = document.querySelector("[data-approach-num]");
      const bars = q("[data-approach-bar] i");
      if (approach && items.length) {
        approach.classList.add("is-ready");
        let current = -1;
        const setActive = (i) => {
          if (i === current) return;
          current = i;
          items.forEach((el, n) => el.classList.toggle("is-active", n === i));
          if (num) {
            num.textContent = items[i].dataset.number;
            gsap.fromTo(num, { yPercent: 35, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.6, ease: "expo.out" });
          }
        };
        setActive(0);
        items.forEach((item, i) => {
          ScrollTrigger.create({
            trigger: item,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => self.isActive && setActive(i),
          });
          if (bars[i]) {
            gsap.fromTo(
              bars[i],
              { scaleX: 0 },
              { scaleX: 1, ease: "none", scrollTrigger: { trigger: item, start: "top 60%", end: "bottom 60%", scrub: true } }
            );
          }
        });
      }

      return () => {
        section?.classList.remove("is-horizontal");
        approach?.classList.remove("is-ready");
        items.forEach((el) => el.classList.remove("is-active"));
      };
    });

    mm.add(MOTION, () => {
      const cleanups = [];

      // Hero intro. Only on a fast first load, so a slow connection never sees
      // already-visible text disappear and replay.
      const introOk = performance.now() < 2500 && window.scrollY < 80;
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro.from("[data-hero-slash]", { scaleY: 0, duration: 1.5, ease: "expo.inOut" }, 0);
      if (introOk) {
        intro
          .from("[data-hero-line]", { yPercent: 112, duration: 1.3, stagger: 0.1 }, 0.1)
          .from("[data-hero-fade]", { y: 28, autoAlpha: 0, duration: 1.1, stagger: 0.08 }, 0.45)
          .from("[data-hero-panel]", { y: 40, autoAlpha: 0, duration: 1.2 }, 0.6)
          .from("[data-hero-panel] li", { y: 16, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.75);
      }

      // Hero depth on scroll
      gsap.to("[data-hero-slash]", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
      });

      // Generic scroll reveals, lightly staggered among siblings
      q("[data-reveal]").forEach((el) => {
        const siblings = el.parentElement ? [...el.parentElement.children].filter((c) => c.hasAttribute("data-reveal")) : [el];
        const index = Math.max(0, siblings.indexOf(el));
        gsap.from(el, {
          y: 48,
          autoAlpha: 0,
          duration: 1.1,
          ease: "expo.out",
          delay: (index % 4) * 0.08,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Statement: words fill in as you read
      const words = q("[data-words] > span");
      if (words.length) {
        gsap.fromTo(
          words,
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.1,
            ease: "none",
            scrollTrigger: { trigger: "[data-words]", start: "top 82%", end: "bottom 50%", scrub: true },
          }
        );
      }

      // Marquee reacts to scroll speed and direction
      const marquee = document.querySelector("[data-marquee]");
      if (marquee) {
        const loop = gsap.to(marquee, { xPercent: -50, duration: 36, ease: "none", repeat: -1 });
        ScrollTrigger.create({
          trigger: marquee,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 220, 6);
            gsap.to(loop, {
              timeScale: boost * self.direction,
              duration: 0.25,
              overwrite: true,
              onComplete: () => gsap.to(loop, { timeScale: self.direction, duration: 1.4, ease: "power2.out" }),
            });
          },
        });
      }

      if (canHover) {
        // Gentle pointer parallax on decorative shapes
        const movers = q("[data-mouse]").map((el) => ({
          f: parseFloat(el.dataset.mouse) || 0,
          x: gsap.quickTo(el, "x", { duration: 1.4, ease: "power3" }),
          y: gsap.quickTo(el, "y", { duration: 1.4, ease: "power3" }),
        }));
        const onMove = (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          const ny = e.clientY / window.innerHeight - 0.5;
          movers.forEach((m) => {
            m.x(nx * m.f);
            m.y(ny * m.f);
          });
        };
        window.addEventListener("pointermove", onMove, { passive: true });
        cleanups.push(() => window.removeEventListener("pointermove", onMove));

        // Cursor-following light on cards
        q("[data-spotlight]").forEach((card) => {
          const onCardMove = (e) => {
            const r = card.getBoundingClientRect();
            card.style.setProperty("--mx", `${e.clientX - r.left}px`);
            card.style.setProperty("--my", `${e.clientY - r.top}px`);
          };
          card.addEventListener("pointermove", onCardMove);
          cleanups.push(() => card.removeEventListener("pointermove", onCardMove));
        });

        // Magnetic buttons
        q("[data-magnetic]").forEach((btn) => {
          const x = gsap.quickTo(btn, "x", { duration: 0.6, ease: "power3" });
          const y = gsap.quickTo(btn, "y", { duration: 0.6, ease: "power3" });
          const onBtnMove = (e) => {
            const r = btn.getBoundingClientRect();
            x((e.clientX - r.left - r.width / 2) * 0.22);
            y((e.clientY - r.top - r.height / 2) * 0.3);
          };
          const onLeave = () => {
            x(0);
            y(0);
          };
          btn.addEventListener("pointermove", onBtnMove);
          btn.addEventListener("pointerleave", onLeave);
          cleanups.push(() => {
            btn.removeEventListener("pointermove", onBtnMove);
            btn.removeEventListener("pointerleave", onLeave);
          });
        });
      }

      return () => cleanups.forEach((fn) => fn());
    });

    // Web fonts change line lengths, so re-measure once they are in.
    let alive = true;
    document.fonts?.ready.then(() => alive && ScrollTrigger.refresh());

    return () => {
      alive = false;
      mm.revert();
    };
  }, []);

  return null;
}
