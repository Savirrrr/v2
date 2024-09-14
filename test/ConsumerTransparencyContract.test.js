const ConsumerTransparency = artifacts.require("ConsumerTransparency");
const SupplyChainManagement = artifacts.require("SupplyChainManagement");

contract("ConsumerTransparency", (accounts) => {
    const [admin, user1, user2] = accounts;

    before(async () => {
        const supplyChainInstance = await SupplyChainManagement.deployed();
        await supplyChainInstance.createShipment("Rice", user1, user2, 0, { from: user1 });
    });

    it("should fetch the provenance of a product", async () => {
        const consumerTransparencyInstance = await ConsumerTransparency.deployed();
        const provenance = await consumerTransparencyInstance.getProvenance(user1, "Rice");
        assert.isArray(provenance, "Provenance should be an array");
        assert.equal(provenance.length, 1, "Provenance should contain one shipment");
    });
});
