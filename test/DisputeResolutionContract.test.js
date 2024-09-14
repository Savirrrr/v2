const DisputeResolution = artifacts.require("DisputeResolution");

contract("DisputeResolution", (accounts) => {
    const [admin, user1] = accounts;

    it("should initiate a dispute", async () => {
        const instance = await DisputeResolution.deployed();
        await instance.initiateDispute("Wheat", "Quality issue", "Mold detected", { from: user1 });
        const dispute = await instance.getDispute(1);
        assert.equal(dispute.productId, "Wheat", "The product ID should be Wheat");
    });

    it("should resolve a dispute", async () => {
        const instance = await DisputeResolution.deployed();
        await instance.resolveDispute(1, "Compensation provided", { from: admin });
        const dispute = await instance.getDispute(1);
        assert.equal(dispute.resolved, true, "The dispute should be resolved");
    });
});
