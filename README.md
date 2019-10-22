# Treasure
 A full stack ERC-20 complient token integrated on a personal website.

High - Level Architecture:

    Migrations - Database (Controller)
    Contracts - Model
    JS files - View

    Backend:
    1. Contracts are compiled prior to being deployed.
    2. Migrations deploy the contracts to the Ethereum network specified, "1" is mainnet, "4" is rinkeby.
    3. Ganache will help us interact with the contract on a local blockchain. Run tests.
    4. Eventually, we will deploy to Rinkeby test network. Run tests.
    5. We have to run a geth node to deploy to both testnet and mainnets.

    Frontend:
    1. React app builds the components which handles the state of the smart contract.
    2. NPM manages the packages.
    3. In cli, run npm build creates the 'build' folder which we serve to the web.
    4. Serve the build folder to IPFS.

