# init hardhat
npx hardhat init
# select: Create an empty hardhat.config.js

# compile smart contract
npx hardhat compile

# deploy smart contract
npx hardhat ignition deploy ./ignition/modules/Store.js --network localhost

