const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const StoreModule3 = buildModule("StoreModule3", (m) => {
    const store = m.contract("Store");

    return { store };
});

module.exports = StoreModule3;