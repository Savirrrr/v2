// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.19;

contract UserManagement {
    enum Role { Farmer, Distributor, Retailer, Consumer, Regulator }

    struct User {
        address userAddress;
        string username;
        Role role;
    }

    mapping(address => User) public users;
    mapping(address => bool) public isUserRegistered;

    event UserRegistered(address userAddress, string username, Role role);
    event UserProfileUpdated(address userAddress, string newUsername, Role newRole);

    function registerUser(address msg_address, string memory username, Role role) public {
        require(!isUserRegistered[msg_address], "User already registered.");

        users[msg_address] = User({
            userAddress: msg_address,
            username: username,
            role: role
        });
        isUserRegistered[msg_address] = true;

        emit UserRegistered(msg_address, username, role);
    }

    function updateUserProfile(address msg_address, string memory newUsername, Role newRole) public {
        require(isUserRegistered[msg_address], "User not registered.");

        User storage user = users[msg_address];
        user.username = newUsername;
        user.role = newRole;

        emit UserProfileUpdated(msg_address, newUsername, newRole);
    }

    function getUser(address userAddress) public view returns (string memory, Role) {
        require(isUserRegistered[userAddress], "User not registered.");
        User memory user = users[userAddress];
        return (user.username, user.role);
    }
}
