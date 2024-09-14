const SupplyChainManagement = artifacts.require("SupplyChainManagement");
const UserManagement = artifacts.require("UserManagement");
const InventoryManagement = artifacts.require("InventoryManagement");

contract("SupplyChainManagement", (accounts) => {
    const [admin, user1, user2] = accounts;

    before(async () => {
        const userManagementInstance = await UserManagement.deployed();
        await userManagementInstance.registerUser(user1, "Charlie", 1); // 1 for Distributor role
        await userManagementInstance.registerUser(user2, "Daisy", 2); // 2 for Retailer role

        const inventoryInstance = await InventoryManagement.deployed();
        await inventoryInstance.addInventory(user1, "Corn", 200, 20, { from: user1 });
    });

    it("should create a shipment", async () => {
        const supplyChainInstance = await SupplyChainManagement.deployed();
        await supplyChainInstance.createShipment("Corn", user1, user2, 0, { from: user1 }); // 0 for Created status
        const shipment = await supplyChainInstance.getShipment("Corn");
        assert.equal(shipment.origin, user1, "The origin address should match user1");
        assert.equal(shipment.destination, user2, "The destination address should match user2");
    });

    it("should update shipment status", async () => {
        const supplyChainInstance = await SupplyChainManagement.deployed();
        await supplyChainInstance.updateShipmentStatus("Corn", 1, { from: user1 }); // 1 for InTransit status
        const shipment = await supplyChainInstance.getShipment("Corn");
        assert.equal(shipment.status.toNumber(), 1, "The shipment status should be InTransit");
    });
});
