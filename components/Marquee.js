import styles from "./Marquee.module.css";

export default function Marquee({ items }) {
  const row = (hidden) => (
    <ul className={styles.row} aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );

  return (
    <div className={styles.marquee}>
      <div className={styles.track} data-marquee>
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
