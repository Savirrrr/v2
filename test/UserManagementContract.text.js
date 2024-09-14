const UserManagement = artifacts.require("UserManagement");

contract("UserManagement", (accounts) => {
    const [admin, user1, user2] = accounts;

    it("should register a new user", async () => {
        const instance = await UserManagement.deployed();
        await instance.registerUser(user1, "Alice", 0); // 0 for Farmer role
        const user = await instance.getUser(user1);
        assert.equal(user.username, "Alice", "The user name should be Alice");
        assert.equal(user.role.toNumber(), 0, "The user role should be Farmer");
    });

    it("should fail to register the same user twice", async () => {
        const instance = await UserManagement.deployed();
        try {
            await instance.registerUser(user1, "Alice", 0);
            assert.fail("The same user should not be registered twice");
        } catch (err) {
            assert.include(err.message, "revert", "Expected revert error message");
        }
    });
});
