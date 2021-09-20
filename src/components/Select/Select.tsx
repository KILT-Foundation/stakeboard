import React, { useEffect, useRef } from 'react'
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
  const refContainer = useRef<ReactSelect>(null)

  useEffect(() => {
    if (clearValue) {
      refContainer.current?.select.clearValue()
    }
  }, [clearValue])

  return (
    <ReactSelect
      ref={refContainer}
      options={options}
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
