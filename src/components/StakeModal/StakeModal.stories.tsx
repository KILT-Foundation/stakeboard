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
  collatorAddress: '56713563215473164',
  newStake: 123,
  status: 'increaseStake',
}
