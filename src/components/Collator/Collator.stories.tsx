import { Story, Meta } from '@storybook/react'

import { Collator, Props } from './Collator'

export default {
  title: 'Collator',
  component: Collator,
  argTypes: {},
} as Meta

const Template: Story<Props> = (args) => <Collator {...args} />

export const Primary = Template.bind({})
Primary.args = {
  address: '5GQtYZsBDvgXq2KSffpN9HWxtK8rxG4gk1jWSp5MaDb1gurR',
}
