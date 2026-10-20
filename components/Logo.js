// Keel wordmark: heavy capitals with an orange keel wedge under the K.
// Drawn in currentColor so the header can switch it between light and dark.
export default function Logo({ className = "" }) {
  return (
    <svg className={className} viewBox="0 0 168 56" aria-hidden="true">
      <path d="M2 50h24l-8 6H2z" fill="var(--red)" />
      <text x="0" y="44" fill="currentColor" className="logo-word">
        KEEL
      </text>
    </svg>
  );
}
