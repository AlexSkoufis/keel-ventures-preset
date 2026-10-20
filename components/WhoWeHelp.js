import Arrow from "./Arrow";
import styles from "./WhoWeHelp.module.css";

export default function WhoWeHelp({ content }) {
  const { eyebrow, title, intro, cards } = content;

  return (
    <section id="who-we-help" className={`section ${styles.section}`} aria-labelledby="who-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              {eyebrow}
            </p>
            <h2 id="who-title" className={`h2 ${styles.title}`} data-reveal>
              {title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {intro}
          </p>
        </div>

        <ul className={styles.cards}>
          {cards.map((card, i) => (
            <li key={card.service} className={styles.card} data-spotlight data-reveal>
              <div className={styles.cardTop}>
                <span className={styles.service}>{card.service}</span>
                <span className={styles.index}>0{i + 1}</span>
              </div>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.text}>{card.text}</p>
              <ul className={styles.points}>
                {card.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a href="#contact" data-topic={card.topic} className={styles.cta}>
                <span>{card.cta}</span>
                <span className={styles.ctaIcon}>
                  <Arrow />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
