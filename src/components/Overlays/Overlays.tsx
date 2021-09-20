import styles from './Overlays.module.css'

export const Overlays: React.FC = ({ children }) => (
  <div className={styles.overlays}>{children}</div>
)
