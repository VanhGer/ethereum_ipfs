# Ethereum Private Blockchain As A Distributed Storage

## Overview

This project demonstrates the use of a private Ethereum blockchain as a distributed storage solution. By leveraging the Ethereum network's decentralized architecture and smart contract capabilities, we achieve a secure and immutable method for storing data across multiple nodes.

## Set up Private Ethereum Network

First, you need to run Ethereum nodes via docker:

```bash
cd private_eth
docker compose build
docker compose up
```

Then, open nodes and unlock all accounts:
```bash
geth attach
personal.unlockAccount(eth.accounts[0], <password>, 0)
```


## Set up IPFS
Second, you need to run IPFS nodes via docker:

```bash
#generate swarm key  
echo -e "/key/swarm/psk/1.0.0/\n/base16/\n`tr -dc 'a-f0-9' < /dev/urandom | head -c64`" > swarm.key  
  
#build my_private_ipfs image  
docker build -t my_private_ipfs .  
  
#run docker compose to create 2 ipfs node  
docker compose up
```

## Deploy SmartContract

You need to deploy smart contract via [hardhat](https://hardhat.org/): 
```bash
# init hardhat  
npx hardhat init  
# select: Create an empty hardhat.config.js  
  
# compile smart contract  
npx hardhat compile  
  
# deploy smart contract  
npx hardhat ignition deploy ./ignition/modules/Store.js --network localhost
```


## Deploy web

Run the backend and frontend via:
```bash
npm run dev
```