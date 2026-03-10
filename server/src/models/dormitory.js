import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const Dormitory = sequelize.define("dormitory", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false},
    capacity: { type: Sequelize.INTEGER, allowNull: false},
})

// Define associations
Dormitory.associate = (models) => {
    // Dormitory has many Students
    Dormitory.hasMany(models.Student, { 
        foreignKey: "dormitoryId", 
        onDelete: "SET NULL",
        as: "residents" 
    });
};

export default Dormitory;