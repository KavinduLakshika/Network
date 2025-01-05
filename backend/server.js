const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sequelize = require("./dbConfig");

const CustomerController = require("./controllers/CustomerController");
const UserController = require("./controllers/UserController");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

//customer routes
app.post('/customer', CustomerController.createCustomer);
app.get('/customers', CustomerController.getAllCustomers);
app.get('/customer/:id', CustomerController.getCustomerById);
app.put('/customer/:id', CustomerController.updateCustomer);
app.delete('/customer/:id', CustomerController.deleteCustomer);

//user routes
app.post('/user', UserController.createUser);
app.get('/users', UserController.getAllUsers);
app.get('/user/:id', UserController.getUserById);
app.put('/user/:id', UserController.updateUser);
app.delete('/user/:id', UserController.deleteUser);
app.post("/userLogin", UserController.userLogin);

// Sync the database
sequelize
    .sync()
    .then(() => {
        console.log("Database synchronized");
    })
    .catch((err) => {
        console.error("Error synchronizing database:", err);
    });

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});