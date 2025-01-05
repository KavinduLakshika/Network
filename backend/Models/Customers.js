const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const Customer = sequelize.define("Customer", {
    cusId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cusName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusNIC: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusEmail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusSecondAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusTP: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusSecondTP: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusWhatsApp: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    referral: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    secondReferral: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    productCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cusStatus: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Active',
    },
},
    {
        tableName: "customers",
        timestamps: false,
    }
);

module.exports = Customer;