import Hero from "./components/Hero.jsx";
import ScrollStory from "./components/ScrollStory.jsx";
import { ArrowDownRight, ArrowUp } from "./components/Icons.jsx";

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>

      <header className="site-header">
        <nav className="nav">
          <a className="brand" href="#top">ITZ<span>FIZZ</span><b>/</b></a>
          <a className="nav-link" href="#experience">Explore the experience <ArrowDownRight /></a>
        </nav>
      </header>

      <main id="main">
        <Hero />
        <ScrollStory />
      </main>

      <footer className="footer">
        <div>
          <p>Itzfizz Digital <span>/ Frontend internship assignment</span></p>
          <small>Scroll motion study · 2026</small>
        </div>
        <a href="#top" className="flex items-center gap-2 text-xs hover:text-lime-brand">Back to top <ArrowUp /></a>
      </footer>
    </>
  );
}
