import styles from "./Values.module.css";

export default function Values({ content }) {
  const { eyebrow, title, items } = content;

  return (
    <section id="values" className={`section on-dark ${styles.section}`} aria-labelledby="values-title">
      <div className="container">
        <div className={styles.head}>
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <h2 id="values-title" className="h2" data-reveal>
            {title}
          </h2>
        </div>

        <ul className={styles.list}>
          {items.map((item, i) => (
            <li key={item.title} className={styles.row} data-reveal>
              <span className={styles.num}>0{i + 1}</span>
              <h3 className={styles.name}>
                <span className={styles.mark} aria-hidden="true" />
                {item.title}
              </h3>
              <p className={styles.text}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
