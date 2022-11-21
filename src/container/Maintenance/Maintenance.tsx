import styles from './Maintenance.module.css'

const maintenanceText = process.env.REACT_APP_MAINTENANCE_TEXT || ''

export function Maintenance() {
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h1 className={styles.heading}>Currently under maintenance</h1>
        <p className={styles.text}>
          Stakeboard is under maintenance for a short time.
        </p>
        {maintenanceText.length > 0 && (
          <p className={styles.text}>{maintenanceText}</p>
        )}
        <a
          className={styles.anchor}
          href="https://status.kilt.io/"
          target="_blank"
          rel="noreferrer"
        >
          Please check our status page for updates.
        </a>
      </div>
    </div>
  )
}
