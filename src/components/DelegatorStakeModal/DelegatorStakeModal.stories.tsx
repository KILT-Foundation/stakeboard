import { Story, Meta } from '@storybook/react'

import {
  DelegatorStakeModal,
  Props,
} from './DelegatorStakeModal'

export default {
  title: 'DelegatorStakeModal',
  component: DelegatorStakeModal,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <DelegatorStakeModal {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  isVisible: true,
}
