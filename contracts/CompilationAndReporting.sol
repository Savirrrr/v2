// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./SupplyChainManagementContract.sol";
import "./UserManagementContract.sol";

contract ComplianceAndReporting {
    SupplyChainManagement private supplyChain;
    UserManagement private userManagement;

    constructor(address supplyChainAddress, address userManagementAddress) {
        supplyChain = SupplyChainManagement(supplyChainAddress);
        userManagement = UserManagement(userManagementAddress);
    }

    function auditTransactionHistory(string memory productId) public view returns (SupplyChainManagement.Shipment[] memory) {
        return supplyChain.getShipmentHistory(productId);
    }

    function generateComplianceReport(string memory productId) public view returns (uint256) {
        // Implementation of compliance report generation
        return supplyChain.getShipmentCount(productId);
    }
}
