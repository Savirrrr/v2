// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./UserManagementContract.sol";
import "./InventoryManagemntContract.sol";

contract SupplyChainManagement {
    UserManagement private userManagement;
    InventoryManagement private inventoryManagement;

    enum ShipmentStatus { Created, InTransit, Delivered, QualityVerified }

    struct Shipment {
        string productId;
        address origin;
        address destination;
        ShipmentStatus status;
        uint256 timestamp;
    }

    mapping(string => Shipment[]) public shipments;

    constructor(address userManagementAddress, address inventoryManagementAddress) {
        userManagement = UserManagement(userManagementAddress);
        inventoryManagement = InventoryManagement(inventoryManagementAddress);
    }

    function createShipment(string memory productId, address origin, address destination, ShipmentStatus status) public {
        shipments[productId].push(Shipment(productId, origin, destination, status, block.timestamp));
    }

    function getShipmentHistory(string memory productId) public view returns (Shipment[] memory) {
        return shipments[productId];
    }

    // Adding getShipmentCount function
    function getShipmentCount(string memory productId) public view returns (uint256) {
        return shipments[productId].length;
    }
}
