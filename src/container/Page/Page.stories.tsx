import { Story, Meta } from '@storybook/react'

import { Page, Props } from './Page'
import { Primary as DashboardPrimary } from '../../components/Dashboard/Dashboard.stories'
import { Primary as CollatorListPrimary } from '../../components/CollatorList/CollatorList.stories'

export default {
  title: 'Page',
  component: Page,
  argTypes: {},
  parameters: {
    backgrounds: {
      default: '',
    },
  },
} as Meta

const Template: Story<Props> = ({ accounts, ...args }) => {
  return <Page accounts={accounts} {...args} />
}

export const Primary = Template.bind({})
Primary.args = {
  accounts: DashboardPrimary.args?.accounts,
  dataSet: CollatorListPrimary.args?.dataSet,
}
