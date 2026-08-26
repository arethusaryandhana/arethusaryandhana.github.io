import { socialIcons } from "../../iconMaps";

type SocialLink = {
  label: string;
  href: string;
};

type SocialLinksProps = {
  links: SocialLink[];
  className?: string;
  iconSize?: number;
  buttonSize?: number;
};

export function SocialLinks({
  links,
  className = "social-links",
  iconSize = 20,
  buttonSize,
}: SocialLinksProps) {
  return (
    <div className={className}>
      {links.map((link) => {
        const Icon = socialIcons[link.label];

        return (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={link.href.startsWith("mailto:") ? undefined : "noreferrer"}
            className="btn-icon"
            style={buttonSize ? { width: buttonSize, height: buttonSize } : undefined}
            aria-label={link.label}
            title={link.label}
          >
            {Icon ? <Icon size={iconSize} /> : link.label[0]}
          </a>
        );
      })}
    </div>
  );
}
