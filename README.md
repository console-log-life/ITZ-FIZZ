# WELCOME ITZFIZZ — Scroll-Driven Hero Animation

Built with **HTML, CSS, JavaScript (React + JSX), GSAP ScrollTrigger and Tailwind CSS**, bundled with Vite. No TypeScript.

## What it does
- **Intro (on load):** headline letters rise in with a stagger, the car slides in, then the four stats animate in one by one.
- **Scroll (core):** the hero is pinned. Car position, a glowing road line, the headline colour and the stats are all tied to scroll progress with `scrub` interpolation — nothing is time-based autoplay.
- **Story section:** a second pinned scene where the car accelerates through three chapters with a progress bar.
- **Performance:** only `transform`, `opacity` and `color` are animated; GSAP batches updates on its own ticker, so there are no layout reads on scroll events. `prefers-reduced-motion` turns the motion off.
- Responsive from 360px to large desktop.

## Structure
```
index.html
src/
  main.jsx            entry
  App.jsx             header, sections, footer
  styles.css          design tokens + layout (Tailwind layered in)
  components/
    Hero.jsx          intro + scroll-driven hero
    ScrollStory.jsx   pinned chapter scene
    Icons.jsx         inline SVG icons
  assets/car.svg
```

## Run locally
```bash
npm install
npm run dev
```

## Deploy to GitHub Pages
1. Push to the `main` branch of a GitHub repo.
2. **Settings → Pages → Source: GitHub Actions.**
3. The included workflow builds and publishes to `https://<username>.github.io/<repo>/`.
