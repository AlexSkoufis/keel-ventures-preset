import styles from "./Approach.module.css";

export default function Approach({ content }) {
  const { eyebrow, title, intro, items } = content;

  return (
    <section id="approach" className={`section on-dark ${styles.section}`} aria-labelledby="approach-title" data-approach>
      <div className={`container ${styles.layout}`}>
        <div className={styles.aside}>
          <div className={styles.sticky}>
            <p className="eyebrow" data-reveal>
              {eyebrow}
            </p>
            <h2 id="approach-title" className={`h2 ${styles.title}`} data-reveal>
              {title}
            </h2>
            <p className="lead" data-reveal>
              {intro}
            </p>

            <div className={styles.counter} aria-hidden="true">
              <span className={styles.counterNum} data-approach-num>
                {items[0].number}
              </span>
              <span className={styles.counterTotal}>/ 0{items.length}</span>
            </div>
            <div className={styles.bars} aria-hidden="true">
              {items.map((item) => (
                <span key={item.number} data-approach-bar>
                  <i />
                </span>
              ))}
            </div>
          </div>
        </div>

        <ol className={styles.list}>
          {items.map((item) => (
            <li key={item.number} className={styles.item} data-approach-item data-number={item.number}>
              <span className={styles.itemNum}>{item.number}</span>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemText}>{item.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
