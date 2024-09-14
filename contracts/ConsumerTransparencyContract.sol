// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SupplyChainManagementContract.sol";

contract ConsumerTransparency {
    SupplyChainManagement private supplyChain;

    constructor(address supplyChainAddress) {
        supplyChain = SupplyChainManagement(supplyChainAddress);
    }

    function getProvenance(string memory productId) public view returns (SupplyChainManagement.Shipment[] memory) {
        return supplyChain.getShipmentHistory(productId);
    }

    function getQualityChecks(string memory productId) public view returns (SupplyChainManagement.Shipment[] memory) {
        // Implementation of quality checks
        return supplyChain.getShipmentHistory(productId);
    }

    function getCertifications(string memory productId) public view returns (string memory) {
        // Implementation of certifications retrieval
        return "Certified";
    }
}
