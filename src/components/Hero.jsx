import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import car from "../assets/car.svg";
import { ArrowDown } from "./Icons.jsx";

gsap.registerPlugin(ScrollTrigger);

const HEADLINE = "WELCOME ITZFIZZ";
const STATS = [
  { value: "58%", label: "Increase in pickup point use" },
  { value: "23%", label: "Decrease in customer calls" },
  { value: "27%", label: "Faster delivery time" },
  { value: "40%", label: "More repeat customers" },
];

export default function Hero() {
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      { motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 768px)" },
      (context) => {
        const { motion, desktop } = context.conditions;
        if (!motion) return;

        const ctx = gsap.context(() => {
          // 1) INTRO on load — staggered headline, car slides in, stats one by one.
          gsap
            .timeline({ defaults: { ease: "power3.out" } })
            .from("[data-letter]", { yPercent: 105, opacity: 0, duration: 0.85, stagger: 0.04 })
            .from("[data-car-intro]", { x: -80, opacity: 0, duration: 1.1 }, "-=0.5")
            .from("[data-stat]", { y: 24, opacity: 0, duration: 0.6, stagger: 0.14 }, "-=0.6");

          // 2) SCROLL — the hero is pinned and everything below is tied to
          //    scroll progress. scrub adds interpolation so motion stays fluid.
          const letters = gsap.utils.toArray("[data-letter]");
          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: () => "+=" + window.innerHeight * (desktop ? 1.4 : 1),
              pin: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to("[data-hero-car]", { xPercent: desktop ? 70 : 45, scale: desktop ? 1.08 : 1.04, duration: 1 }, 0)
            .to(".road-glow", { scaleX: 1, duration: 1 }, 0)
            .to(letters, { color: "#b7df3d", stagger: 0.9 / letters.length, duration: 0.1 }, 0)
            .to("[data-headline]", { yPercent: -18, letterSpacing: "0.08em", duration: 1 }, 0)
            .to("[data-stats]", { y: -30, duration: 1 }, 0);
        }, root);

        return () => ctx.revert();
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="top" className="hero">
      <div className="wrap">
        <div className="eyebrow-row">
          <p>Itzfizz Digital / Motion study</p>
          <p className="desktop">Frontend assignment — 01</p>
        </div>

        <h1 data-headline className="headline" aria-label="Welcome Itzfizz">
          {HEADLINE.split(" ").map((word, wi) => (
            <span className="word" key={word} aria-hidden="true">
              {word.split("").map((ch, i) => (
                <span data-letter key={i} style={{ color: wi === 1 ? "#5d6b2a" : "#eee" }}>{ch}</span>
              ))}
            </span>
          ))}
        </h1>
      </div>

      <div className="car-wrap">
        <div className="road" />
        <div className="road-glow" />
        <div data-hero-car className="car hero-car">
          <img data-car-intro src={car} alt="Black sports coupé driving along the road" />
        </div>
      </div>

      <div className="wrap" data-stats>
        <ul className="stats">
          {STATS.map((s, i) => (
            <li data-stat key={s.value}>
              <div className="stat-row">
                <small>0{i + 1}</small>
                <strong>{s.value}</strong>
              </div>
              <p>{s.label}</p>
            </li>
          ))}
        </ul>
        <div className="cue">
          <p className="scroll-hint"><i /> Scroll to drive</p>
          <a href="#experience" className="hover:text-lime-brand">Explore the experience <ArrowDown /></a>
        </div>
      </div>
    </section>
  );
}
