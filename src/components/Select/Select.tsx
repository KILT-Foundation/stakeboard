import { useState } from '@storybook/addons'
import React, { useEffect } from 'react'
import ReactSelect from 'react-select'
import './ReactSelect.css'

export interface Option {
  value: string
  label: string
}
export interface Props {
  options: readonly Option[]
  onChange?: (value: Option | null) => void
  clearValue?: boolean
  placeholder: string
}

const IndicatorSeparator = null

export const Select: React.FC<Props> = ({
  options,
  onChange,
  clearValue,
  placeholder,
}) => {
  const [value, setValue] = useState(null)

  useEffect(() => {
    if (clearValue) {
      setValue(null)
    }
  }, [clearValue])

  return (
    <ReactSelect
      options={options}
      value={value}
      // menuIsOpen={true}
      components={{ IndicatorSeparator }}
      placeholder={placeholder}
      className={'Select'}
      classNamePrefix="s"
      onChange={onChange}
      theme={(theme) => ({
        ...theme,
        spacing: {
          ...theme.spacing,
          controlHeight: 30,
          baseUnit: 2,
        },
      })}
    />
  )
}
