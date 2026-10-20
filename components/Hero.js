import Arrow from "./Arrow";
import styles from "./Hero.module.css";

export default function Hero({ content }) {
  const { eyebrow, titleLines, titleAccent, lead, primaryCta, secondaryCta, pillars, panel, scrollHint } = content;

  return (
    <section id="top" className={`on-dark ${styles.hero}`} data-hero>
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.grid} />
        <div className={styles.slashWrap} data-mouse="28">
          <div className={styles.slash} data-hero-slash />
        </div>
        <div className={styles.slashOutline} data-mouse="-14" />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className="eyebrow" data-hero-fade>
          {eyebrow}
        </p>

        <h1 className={styles.title}>
          {titleLines.map((line) => (
            <span className="line-mask" key={line}>
              <span data-hero-line>{line}</span>
            </span>
          ))}
          <span className="line-mask">
            <span data-hero-line className={styles.accent}>
              {titleAccent}
            </span>
          </span>
        </h1>

        <div className={styles.bottom}>
          <div className={styles.intro}>
            <p className={`lead ${styles.lead}`} data-hero-fade>
              {lead}
            </p>
            <div className={styles.ctas} data-hero-fade>
              <a href={primaryCta.href} className="btn btn--light" data-magnetic>
                {primaryCta.label}
                <Arrow />
              </a>
              <a href={secondaryCta.href} className="btn btn--ghost">
                {secondaryCta.label}
              </a>
            </div>
            <ul className={styles.pillars} data-hero-fade>
              {pillars.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>

          <nav className={styles.panel} aria-labelledby="hero-panel-title" data-hero-panel>
            <p id="hero-panel-title" className={styles.panelTitle}>
              {panel.title}
            </p>
            <ul>
              {panel.items.map((item, i) => (
                <li key={item.label}>
                  <a href={item.href} data-topic={item.topic} className={styles.panelLink}>
                    <span className={styles.panelNum}>0{i + 1}</span>
                    <span className={styles.panelText}>
                      <strong>{item.label}</strong>
                      <span>{item.text}</span>
                    </span>
                    <Arrow className={styles.panelArrow} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className={styles.scrollHint} aria-hidden="true">
        <span>{scrollHint}</span>
        <i />
      </div>
    </section>
  );
}
