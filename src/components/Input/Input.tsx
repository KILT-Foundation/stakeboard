import React, { ChangeEventHandler } from 'react'
import styles from './Input.module.css'
import cx from 'classnames'

export interface Props {
  number?: true
  placeholder?: string
  autoFocus?: HTMLInputElement['autofocus']
  autoComplete?: HTMLInputElement['autocomplete']
  onInput: ChangeEventHandler<HTMLInputElement>
  value: HTMLInputElement['value']
}

export const Input: React.FC<Props> = ({
  number,
  placeholder,
  autoFocus,
  autoComplete,
  onInput,
  value,
}) => {
  if (number) {
    return (
      <>
        <input
          type="number"
          autoFocus={autoFocus}
          autoComplete={autoComplete}
          className={cx(styles.input, styles.number)}
          placeholder={placeholder ? placeholder : '0'}
          value={value}
          onInput={onInput}
        />
      </>
    )
  }

  return (
    <input
      type="text"
      className={styles.input}
      placeholder={placeholder ? placeholder : ''}
      autoFocus={autoFocus}
      autoComplete={autoComplete}
      value={value}
      onInput={onInput}
    />
  )
}
