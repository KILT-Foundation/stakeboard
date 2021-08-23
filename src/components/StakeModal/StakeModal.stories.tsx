import { Story, Meta } from '@storybook/react'

import { StakeModal, Props } from './StakeModal'

export default {
  title: 'StakeModal',
  component: StakeModal,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <StakeModal {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  modalStake: {
    name: 'KILT Identity 1',
    address: '56713563215473164',
    newStake: 123,
  },
  isVisible: true,
  status: 'increaseStake',
}
