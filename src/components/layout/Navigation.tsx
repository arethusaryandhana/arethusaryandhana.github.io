import { useState } from "react";
import { navItems, profile } from "../../content/site";

type NavigationProps = {
  activeId: string;
};

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 8h16" />
          <path d="M4 16h16" />
        </>
      )}
    </svg>
  );
}

export function Navigation({ activeId }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <a className="nav-logo" onClick={() => scrollTo("about")} role="button" tabIndex={0}>
          A.
        </a>

        <ul className={`nav-links ${menuOpen ? "nav-links--open" : ""}`}>
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                className={`nav-link ${activeId === item.id ? "nav-link--active" : ""}`}
                onClick={() => scrollTo(item.id)}
                role="button"
                tabIndex={0}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav-cta" href={`mailto:${profile.email}`}>
              Hire Me
            </a>
          </li>
        </ul>

        <button className="nav-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <MenuIcon open={menuOpen} />
        </button>
      </div>
    </nav>
  );
}
