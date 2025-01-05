const User = require("../models/User");
const bcrypt = require("bcrypt");

const saltRounds = 10;

async function createUser(req, res) {
    try {
        const { userName, userType, userPassword } = req.body;

        // Validate input fields
        if (!userName || !userPassword) {
            return res.status(400).json({
                error: "All fields (userName, userType, userPassword) are required.",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        // Create a new user
        const newUser = await User.create({
            userName,
            userType: "Admin",
            userPassword: hashedPassword,
            userStatus: "Active",
        });

        res.status(201).json(newUser);
    } catch (error) {
        // Handle Sequelize validation errors
        if (error.name === "SequelizeValidationError") {
            return res.status(400).json({
                error: "Validation error: Please check the provided data.",
            });
        }

        // Handle Sequelize unique constraint errors
        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                error: "A user with this username already exists.",
            });
        }

        // Handle other unexpected errors
        return res
            .status(500)
            .json({ error: `An error occurred: ${error.message}` });
    }
};

async function getAllUsers(req, res) {
    try {
        const user = await User.findAll();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { userName, userType, userPassword, userStatus } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(userPassword, saltRounds);

        await user.update({
            userName,
            userType,
            userPassword: hashedPassword,
            userStatus,
        });

        res.status(200).json(user);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
