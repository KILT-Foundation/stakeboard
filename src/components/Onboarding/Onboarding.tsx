import React, { useContext, useEffect, useState } from 'react'
import styles from './Onboarding.module.css'
import { Account, Extension } from '../../types'
import bg1 from '../../pics/FTU_BG_01.png'
import bg2 from '../../pics/FTU_BG_02.png'
import bg3 from '../../pics/FTU_BG_03.png'
import bg4 from '../../pics/FTU_BG_04.png'
import { StoredStateContext } from '../../utils/StoredStateContext'
import { Overlays } from '../Overlays/Overlays'
import { NoExtension } from './NoExtension'
import { NoAccount } from './NoAccount'
import { NoTokens } from './NoTokens'
import { NotAcceptedTerms } from './NotAcceptedTerms'
import { Icon } from '../Icon/Icon'
import { Button } from '../Button/Button'

const backgrounds = [bg1, bg2, bg3, bg4]

enum OnboardingStatus {
  NoExtension,
  NoAccount,
  NoTokens,
  NotAcceptedTerms,
  Ok,
}

function isUsableAccount(account: Account) {
  if (account.staked > 0) return true
  if (account.stakeable >= 1000) return true
  if (account.unstaking.length > 0) return true
}

function needsOnboarding(
  extensions: Extension[],
  accounts: Account[],
  termsAccepted: boolean
) {
  if (extensions.length === 0) {
    return OnboardingStatus.NoExtension
  } else if (accounts.length === 0) {
    return OnboardingStatus.NoAccount
  } else if (!accounts.some(isUsableAccount)) {
    return OnboardingStatus.NoTokens
  } else if (!termsAccepted) {
    return OnboardingStatus.NotAcceptedTerms
  } else {
    return OnboardingStatus.Ok
  }
}

export interface OnboardingContentProps {
  status: OnboardingStatus
}

const OnboardingContent: React.FC<OnboardingContentProps> = ({ status }) => {
  switch (status) {
    case OnboardingStatus.NoExtension:
      return <NoExtension />
    case OnboardingStatus.NoAccount:
      return <NoAccount />
    case OnboardingStatus.NoTokens:
      return <NoTokens />
    case OnboardingStatus.NotAcceptedTerms:
      return <NotAcceptedTerms />
  }
  return null
}

const DownloadLinks: React.FC = () => {
  return (
    <div className={styles.downloadContainer}>
      <span className={styles.icon}>
        <Button
          onClick={() => {
            window.open(
              'https://chrome.google.com/webstore/detail/sporran/djdnajgjcbjhhbdblkegbcgodlkkfhcl',
              '_blank'
            )
          }}
        >
          <Icon type="chrome_store" width={200} />
        </Button>
      </span>
      <span className={styles.icon}>
        <Button
          onClick={() => {
            window.open(
              'https://addons.mozilla.org/de/firefox/addon/sporran/',
              '_blank'
            )
          }}
        >
          <Icon type="firefox_store" width={200} />
        </Button>
      </span>
      <span className={styles.icon}>
        <Icon type="sporran_logo" width={70} />
      </span>
    </div>
  )
}

export interface Props {
  accounts: Account[]
  extensions: Extension[]
}
export const Onboarding: React.FC<Props> = ({
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

  const {
    state: { termsAccepted },
  } = useContext(StoredStateContext)

  const status = needsOnboarding(extensions, accounts, termsAccepted)

  if (status === OnboardingStatus.Ok) {
    return <>{children}</>
  } else {
    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
        }}
        className={styles.backgroundImage}
      >
        <Overlays>
          <div className={styles.container}>
            <OnboardingContent status={status} />
          </div>
          <DownloadLinks />
        </Overlays>
      </div>
    )
  }
}
