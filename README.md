# Stakeboard
![kilt](https://user-images.githubusercontent.com/1248214/110625865-49edbe00-81a0-11eb-9393-596c6a1f8eba.png)


## KILT Staking

The Stakeboard is an open-source staking platform built for the KILT protocol. The Stakeboard features enable users to add, remove and change stakes for the available Collators. It is currently compatible with [Sporran wallet](https://github.com/BTE-Trusted-Entity/sporran-extension) and [Polkadot js Extension](https://github.com/polkadot-js/extension).

### Contribution

Contributing to the Stakeboard requires the contributor to follow the guidelines set in the [KILT dev docs](https://dev.kilt.io).

## Getting Started

The Stakeboard requires a connection to the KILT chain. 

**Recommended: Do not use the live net for testing**

For testing purposes, the Stakeboard is connected to the KILT test net Peregrine by default. If you wish to use a local chain for testing, you can be connect by making a copy of the `.env.example` and renaming the file to `.env`. Here you can change the `REACT_APP_FULL_NODE_ENDPOINT` to the new endpoint.

Run the following commands to install dependencies and start developing

```js
yarn install
yarn start
```

**NEED PEREGRINE TEST TOKENS?** Go to our [testnet faucet](https://faucet.peregrine.kilt.io/).


## Learn more about KILT

Do you want to learn more about KILT? Come checkout our [SDK](https://github.com/KILTprotocol/sdk-js), [KILT Chain](https://github.com/KILTprotocol/mashnet-node) or [Documentations](https://dev.kilt.io)

## Built With


-   [React](https://reactjs.org)
-   [Create React App](https://create-react-app.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Storybook](https://storybook.js.org/)
-   [Jest](https://jestjs.io)
-   [Eslint](https://eslint.org/)
-   [Prettier](https://prettier.io/)
-   [Polkadot JS](https://github.com/polkadot-js)
