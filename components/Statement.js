import styles from "./Statement.module.css";

export default function Statement({ content }) {
  const words = content.text.split(" ");

  return (
    <section className={`section ${styles.section}`} aria-label={content.label}>
      <div className="container">
        <p className={styles.label} data-reveal>
          {content.label}
        </p>
        <p className={styles.text} data-words>
          {words.map((word, i) => (
            <span key={i} className={styles.word}>
              {word}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
