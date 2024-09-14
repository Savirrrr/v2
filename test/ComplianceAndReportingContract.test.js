const ComplianceAndReporting = artifacts.require("ComplianceAndReporting");
const SupplyChainManagement = artifacts.require("SupplyChainManagement");
const UserManagement = artifacts.require("UserManagement");

contract("ComplianceAndReporting", (accounts) => {
    const [admin, user1, user2] = accounts;

    before(async () => {
        const userManagementInstance = await UserManagement.deployed();
        await userManagementInstance.registerUser(user1, "Eve", 3); // 3 for Regulator role

        const supplyChainInstance = await SupplyChainManagement.deployed();
        await supplyChainInstance.createShipment("Soybeans", user1, user2, 0, { from: user1 });
    });

    it("should generate a compliance report", async () => {
        const complianceInstance = await ComplianceAndReporting.deployed();
        const report = await complianceInstance.generateComplianceReport("Soybeans", { from: user1 });
        assert.equal(report.shipmentCount.toNumber(), 1, "The report should indicate 1 shipment");
    });
});
