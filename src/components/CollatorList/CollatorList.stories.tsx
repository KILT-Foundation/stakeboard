import { Story, Meta } from '@storybook/react'
import { BlockchainDataContext } from '../../utils/BlockchainDataContext'

import { CollatorList } from './CollatorList'

export default {
  title: 'CollatorList',
  component: CollatorList,
  argTypes: {},
} as Meta

const Template: Story = (args) => (
  <BlockchainDataContext.Provider
    value={{
      accounts: [
        {
          address: '5F1P7WAgEkh7YWCHCBcnBx8Gvx2VbCMrjezUjiJRoZmmR464',
          name: 'KILT Identity 1',
          stakeable: 100_000,
          staked: 0,
          unstaking: [],
        },
        {
          address: '5GN6CNx5L44Ga372PvyD639ukHTvoUktkDCNL4rY7sEFy57P',
          name: 'KILT Identity 2',
          stakeable: 800_000,
          staked: 0,
          unstaking: [],
        },
        {
          address: '5D7WMHRftdGWGhfAP7NaJfKuRyvfES77ZnjcBzqgMFMjTsGu',
          name: 'KILT Identity 3',
          stakeable: 10_000,
          staked: 0,
          unstaking: [],
        },
      ],
      dataSet: [
        {
          collator: '5HTySzbJiBYuJow2ZKSHJTnMHF14S8oNnkkEBzzhyqaAPTAH',
          active: true,
          activeNext: false,
          isLeaving: false,
          totalStake: 200_000,
          delegators: 5,
          lowestStake: 10_000,
          stakes: [],
          favorite: true,
        },
        {
          collator: '5DLYuqjWyEFWF6c4oVDh62L4cPZajvupNj6uUNS4tBSux3ay',
          active: true,
          activeNext: true,
          isLeaving: false,
          totalStake: 400_000,
          delegators: 15,
          lowestStake: 15_000,
          stakes: [
            {
              stake: 100_000,
              account: '5D7WMHRftdGWGhfAP7NaJfKuRyvfES77ZnjcBzqgMFMjTsGu',
            },
          ],
          favorite: false,
        },
        {
          collator: '5GQtYZsBDvgXq2KSffpN9HWxtK8rxG4gk1jWSp5MaDb1gurR',
          active: true,
          activeNext: true,
          isLeaving: true,
          totalStake: 600_000,
          delegators: 25,
          lowestStake: 20_000,
          stakes: [],
          favorite: false,
        },
        {
          collator: '4siCnobG887X3dG4NA9EQn1HWF11pogAAdNmGBnyH2uN4CQM',
          active: false,
          activeNext: false,
          isLeaving: false,
          totalStake: 10_000,
          delegators: 0,
          lowestStake: 0,
          stakes: [],
          favorite: false,
        },
        {
          collator: '4tBHgCpZZVyhY4pGg5rHMYj6j5TMuPG7vtcpK28Cpy1c5o8h',
          active: false,
          activeNext: true,
          isLeaving: false,
          totalStake: 100_000,
          delegators: 2,
          lowestStake: 15_000,
          stakes: [],
          favorite: false,
        },
        {
          collator: '4rBMZdMBa8JD9oghH3Djukof7RAiMgJb28vHNqSJ54EKKpQ2',
          active: true,
          activeNext: true,
          isLeaving: false,
          totalStake: 150_000,
          delegators: 1,
          lowestStake: 50_000,
          stakes: [],
          favorite: false,
        },
        {
          collator: '4rC1U8kMf3icQZPLH5cJ5q8yE5ozEnka5rUQtxe7A1uRG1G1',
          active: true,
          activeNext: false,
          isLeaving: false,
          totalStake: 20_000,
          delegators: 1,
          lowestStake: 10_000,
          stakes: [],
          favorite: false,
        },
        {
          collator: '4rDeMGr3Hi4NfxRUp8qVyhvgW3BSUBLneQisGa9ASkhh2sXB',
          active: true,
          activeNext: true,
          isLeaving: false,
          totalStake: 200_000,
          delegators: 0,
          lowestStake: 0,
          stakes: [],
          favorite: false,
        },
      ],
    }}
  >
    {' '}
    <CollatorList {...args} />
  </BlockchainDataContext.Provider>
)

export const Primary = Template.bind({})
Primary.args = {}
