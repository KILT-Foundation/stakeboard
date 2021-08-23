import React, { MouseEvent } from 'react'
import cx from 'classnames'
import styles from './Button.module.css'

export interface ButtonProps {
  /**
   * Label of the button.
   */
  label?: string
  /**
   * Optional click handler
   */
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
  orangeButton?: boolean
}

export const Button: React.FC<ButtonProps> = ({
  label,
  children,
  disabled,
  orangeButton,
  ...props
}) => {
  if (children && !label) {
    return (
      <span className={cx(styles.buttonRaw)} {...props}>
        {children}
      </span>
    )
  }
  return (
    <button
      type="button"
      className={cx({
        [styles.button]: !orangeButton,
        [styles.buttonOrange]: orangeButton,
      })}
      disabled={disabled}
      {...props}
    >
      {label}
    </button>
  )
}
