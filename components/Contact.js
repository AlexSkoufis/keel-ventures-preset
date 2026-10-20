import ContactForm from "./ContactForm";
import styles from "./Contact.module.css";

export default function Contact({ content, contact }) {
  const { eyebrow, title, intro, directLabel, form } = content;

  return (
    <section id="contact" className={`section on-dark ${styles.section}`} aria-labelledby="contact-title">
      <div className={styles.slash} aria-hidden="true" data-mouse="18" />
      <div className={`container ${styles.layout}`}>
        <div className={styles.copy}>
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <h2 id="contact-title" className={`h2 ${styles.title}`} data-reveal>
            {title}
          </h2>
          <p className="lead" data-reveal>
            {intro}
          </p>

          <div className={styles.direct} data-reveal>
            <p className={styles.directLabel}>{directLabel}</p>
            <a href={`mailto:${contact.email}`} className={styles.email}>
              {contact.email}
            </a>
            <a href={contact.linkedin.href} className={styles.social} target="_blank" rel="noopener noreferrer">
              {contact.linkedin.label}
              <span className="visually-hidden"> (opens in a new tab)</span>
              <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
                <path d="M3 9 9 3M4 3h5v5" fill="none" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>
        </div>

        <div className={styles.formWrap} data-reveal>
          <ContactForm form={form} email={contact.email} />
        </div>
      </div>
    </section>
  );
}
