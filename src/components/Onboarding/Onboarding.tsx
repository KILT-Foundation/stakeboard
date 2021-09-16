import React, { useEffect, useState } from 'react'
import styles from './Onboarding.module.css'
import { Account, Extension } from '../../types'
import bg1 from '../../pics/FTU_BG_01.png'
import bg2 from '../../pics/FTU_BG_02.png'
import bg3 from '../../pics/FTU_BG_03.png'
import bg4 from '../../pics/FTU_BG_04.png'

const backgrounds = [bg1, bg2, bg3, bg4]

export interface Props {
  accounts: Account[]
  extensions: Extension[]
}
export const OnboardingBg: React.FC<Props> = ({
  accounts,
  extensions,
  children,
}) => {
  // Get state and corresponding text

  const [background, setBackground] = useState<string | null>(null)

  useEffect(() => {
    const random = Math.floor(Math.random() * backgrounds.length)
    setBackground(backgrounds[random])
  }, [])

  if (true) {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
        }}
        className={styles.backgroundImage}
      >
        {children}
      </div>
    )
  } else {
    return <>{children}</>
  }
}

export const Onboarding: React.FC<Props> = ({ children }) => {
  return <>{children}</>
}

let a = 1
let b = 2

export { a, b }
