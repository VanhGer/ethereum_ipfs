# Ethereum Private Networks

This guide explains how to set up a private network of multiple Geth nodes.

## Install Geth

You need to download **Geth** from [here](https://geth.ethereum.org/downloads).


## Create Node

In this tutorial, we create a simple EPN (Ethereum Private Networks) with only 2 nodes. Enter to your folder and run:
```sh
mkdir node1
mkdir node2
```

Next, you'll need to create accounts to each node to receive some Ether at launch. Enter each `node` and do the following command to create an account:
```sh
geth --datadir "./data" account new

```

This command prompts you to enter a password. Once entered, you will receive the public address associated with the key and the corresponding key file.
## Create Genesis Block

Every blockchain begins with a genesis block. When Geth is initially run with default settings, it initializes the database with the Mainnet genesis. However, for a private network, it's typically advisable to employ a distinct genesis block. This block is configured via a *genesis.json* file, the path of which must be specified upon Geth startup.

Here, I use a `genenis.json` file for [PoA](https://eips.ethereum.org/EIPS/eip-225) network:
```json
{
  "config": {
    "chainId": { CHAIN_ID },
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0,
    "clique": {
      "period": 5,
      "epoch": 30000
    }
  },
  "difficulty": "1",
  "gasLimit": "8000000",
  "extradata": "0x0000000000000000000000000000000000000000000000000000000000000000{ INITIAL_SIGNER_ADDRESS }0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "alloc": {
    "{ FIRST_NODE_ADDRESS }": { "balance": "{ ETHER_AMOUNT }" },
    "{ SECOND_NODE_ADDRESS }": { "balance": "{ EHTER_AMOUNT }" }
  }
}

```

Here, the `chainId` is the Id of our network. The Ethereum Mainnet is identified by Network ID 1. Geth offers connectivity to various networks through alternative Chain IDs, including testnets and alternative networks derived from forks of the Geth source code. You should choose the network ID not in use by existing networks or testnets. Current network IDs can be found on [ChainList](https://chainlist.org/).

The `INITIAL_SIGNER_ADDRESS` represents the address of the initial signer on the blockchain, which is typically chosen as the address of the first node.

After creating the `genesis.json` file, you need to run this command on both nodes to initialize the genesis block:
```sh
geth init --datadir ./data genesis.json

```

## Create the BootNode



