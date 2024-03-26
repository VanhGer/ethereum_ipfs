const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const StoreModule = buildModule("StoreModule", (m) => {
    const store = m.contract("Store");

    return { store };
});

module.exports = StoreModule;