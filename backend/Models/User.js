const { DataTypes } = require("sequelize");
const sequelize = require("../dbConfig");

const User = sequelize.define("User",
    {
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userPassword: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userStatus: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "users",
        timestamps: false,
    }
);

module.exports = User;