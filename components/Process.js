import styles from "./Process.module.css";

export default function Process({ content }) {
  const { eyebrow, title, intro, steps } = content;

  return (
    <section id="process" className={styles.section} aria-labelledby="process-title" data-process>
      <div className={styles.pin} data-process-pin>
        <div className={`container ${styles.head}`}>
          <div>
            <p className="eyebrow" data-reveal>
              {eyebrow}
            </p>
            <h2 id="process-title" className={`h2 ${styles.title}`} data-reveal>
              {title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {intro}
          </p>
        </div>

        <div className={styles.viewport}>
          <div className={styles.rail} aria-hidden="true">
            <i data-process-progress />
          </div>
          <ol className={styles.track} data-process-track>
            {steps.map((step) => (
              <li key={step.number} className={styles.step} data-reveal>
                <span className={styles.num}>{step.number}</span>
                <div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
