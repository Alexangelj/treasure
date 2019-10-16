# Treasure
 A full stack ERC-20 complient token integrated on a personal website.

High - Level Architecture:

    Migrations - Database (Controller)
    Contracts - Model
    JS files - View

    1. Contracts are compiled prior to being deployed.
    2. Migrations deploy the contracts to the Ethereum network
    3. Ganache will help us interact with the contract on a local blockchain.

    4. Eventually, we will deploy to Rinkeby test network. 
    5. We have to run a geth node to interact with our contract.
    6. Develop a website that interfaces with the contract through metamask.

