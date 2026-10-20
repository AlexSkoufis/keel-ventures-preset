import Logo from "./Logo";
import styles from "./Footer.module.css";

export default function Footer({ site }) {
  const { footer, logo, contact, tagline } = site;
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <a href="#top" className={styles.logo} aria-label={`${logo.alt}, back to top`}>
              <Logo />
            </a>
            <p className={styles.tagline}>{tagline}</p>
            <p className={styles.statement}>{footer.statement}</p>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className={styles.col}>
              <p className={styles.colTitle}>{col.title}</p>
              <ul>
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className={styles.col}>
            <p className={styles.colTitle}>{footer.contactTitle}</p>
            <ul>
              <li>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li>
                <a href={contact.linkedin.href} target="_blank" rel="noopener noreferrer">
                  {contact.linkedin.label}
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>{footer.copyright.replace("{year}", year)}</p>
          <p className={styles.credit}>
            {footer.credit.prefix}{" "}
            <a href={footer.credit.href} target="_blank" rel="noopener noreferrer">
              {footer.credit.label}
            </a>
          </p>
          <a href="#top" className={styles.toTop}>
            {footer.backToTop}
            <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
              <path d="M6 10V2M2.5 5.5 6 2l3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
