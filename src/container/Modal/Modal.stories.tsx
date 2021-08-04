import { Story, Meta } from '@storybook/react'

import { Modal, Props } from './Modal'

export default {
  title: 'Modal',
  component: Modal,
} as Meta

const Template: Story<Props> = ({ ...args }) => {
  return <Modal {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  isVisible: true,
  text: {
    title: 'string',
    text: 'string',
  },
}
