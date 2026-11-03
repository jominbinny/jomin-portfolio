import { GrassInteraction } from "@/components/GrassInteraction";
import { personalInfo } from "@/lib/data";

export function Footer() {
  return (
    <footer className="footer-section relative overflow-hidden border-t border-border px-5 pb-6 pt-20 sm:px-8">
      <div className="footer-content relative z-10 mx-auto max-w-6xl">
        <div className="footer-heading">
          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              You made it to the end
            </p>
            <h2 className="footer-title font-pixel text-[clamp(2rem,7vw,5.5rem)]">
              ENOUGH SCROLLING.
              <br />
              <span>TOUCH SOME GRASS.</span>
            </h2>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="font-mono text-[10px] text-muted-foreground">
            © {new Date().getFullYear()} {personalInfo.name} / Built with curiosity
          </p>
          <div className="flex items-center gap-4 font-mono text-[10px] text-muted-foreground">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>
      <GrassInteraction />
    </footer>
  );
}
