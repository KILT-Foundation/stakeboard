import React from 'react'
import styles from './Web3Name.module.css'

const W3N_URL = process.env.W3N_URL || 'https://w3n.id/'
const W3N_PREFIX = process.env.W3N_PREFIX || 'w3n:'

export interface Props {
  name: string
}

export const Web3Name: React.FC<Props> = ({ name }) => {
  return (
    <a
      className={styles.yellow}
      href={W3N_URL + name}
      rel="noopener noreferrer"
      target="_blank"
      onClick={(e) => e.stopPropagation()}
    >
      {W3N_PREFIX + name}
    </a>
  )
}
