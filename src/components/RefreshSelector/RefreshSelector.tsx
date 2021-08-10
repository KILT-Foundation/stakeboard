import { Select, Props } from '../Select/Select'

export const RefreshSelector: React.FC<Props> = ({
  options,
  onChange,
  placeholder,
}) => {
  return (
    <Select options={options} placeholder={placeholder} onChange={onChange} />
  )
}
