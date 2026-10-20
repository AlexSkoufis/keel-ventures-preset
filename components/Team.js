import styles from "./Team.module.css";

export default function Team({ content }) {
  const { eyebrow, title, intro, members } = content;

  return (
    <section id="team" className={`section ${styles.section}`} aria-labelledby="team-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <p className="eyebrow" data-reveal>
              {eyebrow}
            </p>
            <h2 id="team-title" className={`h2 ${styles.title}`} data-reveal>
              {title}
            </h2>
          </div>
          <p className="lead" data-reveal>
            {intro}
          </p>
        </div>

        <ul className={styles.grid}>
          {members.map((m) => (
            <li key={m.name} className={styles.card} data-reveal>
              <div className={styles.media}>
                <span className={styles.monogram} aria-hidden="true">
                  {m.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
              </div>
              <div className={styles.body}>
                <h3 className={styles.name}>
                  {m.name}
                  {m.credentials && <span className={styles.cred}>, {m.credentials}</span>}
                </h3>
                <p className={styles.role}>{m.role}</p>
                <p className={styles.bio}>{m.bio}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
