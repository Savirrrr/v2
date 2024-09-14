const InventoryManagement = artifacts.require("InventoryManagement");
const UserManagement = artifacts.require("UserManagement");

contract("InventoryManagement", (accounts) => {
    const [admin, user1] = accounts;

    before(async () => {
        const userManagementInstance = await UserManagement.deployed();
        await userManagementInstance.registerUser(user1, "Bob", 0); // 0 for Farmer role
    });

    it("should allow a user to add inventory", async () => {
        const inventoryInstance = await InventoryManagement.deployed();
        await inventoryInstance.addInventory(user1, "Wheat", 100, 10, { from: user1 });
        const inventory = await inventoryInstance.getInventory(user1, "Wheat");
        assert.equal(inventory.quantity.toNumber(), 100, "The inventory quantity should be 100");
    });
});
