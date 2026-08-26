import { socials } from "../../content/site";
import { SocialLinks } from "../shared/SocialLinks";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-text">© {new Date().getFullYear()} Arethusa Aryandhana</p>
        <p className="footer-text footer-text--mono">
          Built with React + TypeScript
        </p>
        <SocialLinks links={socials} className="footer-links" iconSize={16} buttonSize={36} />
      </div>
    </footer>
  );
}
