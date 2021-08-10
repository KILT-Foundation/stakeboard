import React from 'react'
import { Select, Props as SelectProps } from '../../components/Select/Select'
import { Account } from '../../types'
import { format } from '../../utils'

export interface Props {
  onChange?: SelectProps['onChange']
  accounts: Account[]
}

export const IdentitySelector: React.FC<Props> = ({ onChange, accounts }) => {
  const options = accounts.map((account) => ({
    value: account.address,
    label: `${account.name} (Stakeable: ${format(account.stakeable)})`,
  }))
  return (
    <Select
      options={options}
      onChange={onChange}
      placeholder={'Select KILT Identity'}
    />
  )
}
