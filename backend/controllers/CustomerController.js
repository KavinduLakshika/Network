const Customer = require("../models/Customers")


//create customer
async function createCustomer(req, res) {
    try {
        const { cusName, cusNIC, cusEmail, cusAddress, cusSecondAddress, cusTP, cusSecondTP, cusWhatsApp, referral, secondReferral, productCode } = req.body;

        const existingCustomer = await Customer.findOne({
            where: { cusEmail, cusNIC },
        });

        const newCustomer = await Customer.create({
            cusName,
            cusNIC,
            cusEmail,
            cusAddress,
            cusSecondAddress,
            cusTP,
            cusSecondTP,
            cusWhatsApp,
            referral,
            secondReferral,
            productCode,
            cusStatus: "Active",
        });

        res.status(201).json(newCustomer);
    } catch (error) {
        if (res) {
            if (error.name === "SequelizeValidationError") {
                return res.status(400).json({
                    error: "Validation error: Please check the provided data.",
                });
            }
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({
                    error:
                        "Duplicate field value: A customer with this email or NIC already exists.",
                });
            }
            // Handle other unexpected errors
            return res
                .status(500)
                .json({ error: `An error occurred: ${error.message}` });
        } else {
            throw error;
        }
    }
};

// Get all customers
async function getAllCustomers(req, res) {
    try {
        const customers = await Customer.findAll();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single customer by ID
async function getCustomerById(req, res) {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a customer
async function updateCustomer(req, res) {
    try {
        const { id } = req.params;
        const { cusName, cusNIC, cusEmail, cusAddress, cusSecondAddress, cusTP, cusSecondTP, cusWhatsApp, referral, secondReferral, productCode, cusStatus } = req.body;

        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        await customer.update({
            cusName,
            cusNIC,
            cusEmail,
            cusAddress,
            cusSecondAddress,
            cusTP,
            cusSecondTP,
            cusWhatsApp,
            referral,
            secondReferral,
            productCode,
            cusStatus,
        });

        res.status(200).json(customer);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a customer
async function deleteCustomer(req, res) {
    try {
        const { id } = req.params;
        const customer = await Customer.findByPk(id);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        await customer.destroy();
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};