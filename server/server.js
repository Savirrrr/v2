require('dotenv').config();
const express = require('express');
const { ethers } = require('ethers');
const fs = require('fs-extra');

const app = express();
const port = 3000;

const userManagementABI = JSON.parse(fs.readFileSync('build/contracts/UserManagement.json', 'utf8')).abi;
const inventoryManagementABI = JSON.parse(fs.readFileSync('build/contracts/InventoryManagement.json', 'utf8')).abi;
const supplyChainManagementABI = JSON.parse(fs.readFileSync('build/contracts/SupplyChainManagement.json', 'utf8')).abi;
const complianceAndReportingABI = JSON.parse(fs.readFileSync('build/contracts/ComplianceAndReporting.json', 'utf8')).abi;
const consumerTransparencyABI = JSON.parse(fs.readFileSync('build/contracts/ConsumerTransparency.json', 'utf8')).abi;
const disputeResolutionABI = JSON.parse(fs.readFileSync('build/contracts/DisputeResolution.json', 'utf8')).abi;

const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);
//const encryptedjson = fs.readFileSync('./build/contracts/encryptedKey.json', 'utf8');
const signer = provider.getSigner(0);


    const userManagementContract = new ethers.Contract(process.env.USER_MANAGEMENT_ADDRESS, userManagementABI, signer);
    const inventoryManagementContract = new ethers.Contract(process.env.INVENTORY_MANAGEMENT_ADDRESS, inventoryManagementABI, signer);
    const supplyChainManagementContract = new ethers.Contract(process.env.SUPPLY_CHAIN_MANAGEMENT_ADDRESS, supplyChainManagementABI, signer);
    const complianceAndReportingContract = new ethers.Contract(process.env.COMPLIANCE_AND_REPORTING_ADDRESS, complianceAndReportingABI, signer);
    const consumerTransparencyContract = new ethers.Contract(process.env.CONSUMER_TRANSPARENCY_ADDRESS, consumerTransparencyABI, signer);
    const disputeResolutionContract = new ethers.Contract(process.env.DISPUTE_RESOLUTION_ADDRESS, disputeResolutionABI, signer);

    app.use(express.json());

    // User Management Endpoints
    app.post('/register-user', async (req, res) => {
        const { address, username, role } = req.body;
        try {
            const tx = await userManagementContract.registerUser(address, username, role);
            await tx.wait();
            res.json({ message: 'User registered successfully', transaction: tx });
        } catch (error) {
            console.error('Error in register-user:', error);
            res.status(500).send('Error registering user');
        }
    });

    app.get('/get-user/:address', async (req, res) => {
        const address = req.params.address;
        try {
            const user = await userManagementContract.getUser(address);
            res.json({ user });
        } catch (error) {
            console.error('Error in get-user:', error);
            res.status(500).send('Error fetching user data');
        }
    });

    // Inventory Management Endpoints
    app.post('/add-inventory', async (req, res) => {
        const { userAddress, productId, quantity, price } = req.body;
        try {
            const tx = await inventoryManagementContract.addInventory(userAddress, productId, quantity, price);
            await tx.wait();
            res.json({ message: 'Inventory added successfully', transaction: tx });
        } catch (error) {
            console.error('Error in add-inventory:', error);
            res.status(500).send('Error adding inventory');
        }
    });

    app.get('/get-inventory/:userAddress/:productId', async (req, res) => {
        const { userAddress, productId } = req.params;
        try {
            const inventory = await inventoryManagementContract.getInventory(userAddress, productId);
            res.json({ inventory });
        } catch (error) {
            console.error('Error in get-inventory:', error);
            res.status(500).send('Error fetching inventory data');
        }
    });

    // Supply Chain Management Endpoints
    app.post('/create-shipment', async (req, res) => {
        const { productId, origin, destination, status } = req.body;
        try {
            const tx = await supplyChainManagementContract.createShipment(productId, origin, destination, status);
            await tx.wait();
            res.json({ message: 'Shipment created successfully', transaction: tx });
        } catch (error) {
            console.error('Error in create-shipment:', error);
            res.status(500).send('Error creating shipment');
        }
    });

    app.get('/get-shipment/:productId', async (req, res) => {
        const productId = req.params.productId;
        try {
            const shipment = await supplyChainManagementContract.getShipment(productId);
            res.json({ shipment });
        } catch (error) {
            console.error('Error in get-shipment:', error);
            res.status(500).send('Error fetching shipment data');
        }
    });

    app.post('/update-shipment-status', async (req, res) => {
        const { productId, status } = req.body;
        try {
            const tx = await supplyChainManagementContract.updateShipmentStatus(productId, status);
            await tx.wait();
            res.json({ message: 'Shipment status updated successfully', transaction: tx });
        } catch (error) {
            console.error('Error in update-shipment-status:', error);
            res.status(500).send('Error updating shipment status');
        }
    });

    app.get('/get-all-shipments', async (req, res) => {
        try {
            const shipments = await supplyChainManagementContract.getAllShipments();
            res.json({ shipments });
        } catch (error) {
            console.error('Error in get-all-shipments:', error);
            res.status(500).send('Error fetching all shipments');
        }
    });

    // Compliance and Reporting Endpoints
    app.get('/generate-compliance-report/:productId', async (req, res) => {
        const productId = req.params.productId;
        try {
            const report = await complianceAndReportingContract.generateComplianceReport(productId);
            res.json({ report });
        } catch (error) {
            console.error('Error in generate-compliance-report:', error);
            res.status(500).send('Error generating compliance report');
        }
    });

    // Consumer Transparency Endpoints
    app.get('/get-provenance/:productId', async (req, res) => {
        const productId = req.params.productId;
        try {
            const provenance = await consumerTransparencyContract.getProvenance(req.body.address, productId);
            res.json({ provenance });
        } catch (error) {
            console.error('Error in get-provenance:', error);
            res.status(500).send('Error fetching provenance');
        }
    });

    // Dispute Resolution Endpoints
    app.post('/initiate-dispute', async (req, res) => {
        const { productId, issue, details } = req.body;
        try {
            const tx = await disputeResolutionContract.initiateDispute(productId, issue, details);
            await tx.wait();
            res.json({ message: 'Dispute initiated successfully', transaction: tx });
        } catch (error) {
            console.error('Error in initiate-dispute:', error);
            res.status(500).send('Error initiating dispute');
        }
    });

    app.post('/resolve-dispute', async (req, res) => {
        const { disputeId, resolution } = req.body;
        try {
            const tx = await disputeResolutionContract.resolveDispute(disputeId, resolution);
            await tx.wait();
            res.json({ message: 'Dispute resolved successfully', transaction: tx });
        } catch (error) {
            console.error('Error in resolve-dispute:', error);
            res.status(500).send('Error resolving dispute');
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });

