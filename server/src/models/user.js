import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const User = sequelize.define("user", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false},
    email: { type: Sequelize.STRING, unique: true},
    password: { type: Sequelize.STRING, allowNull: false},
    role: { type: Sequelize.ENUM("student", "teacher", "admin"), defaultValue: "student" }
});

User.associate = (models) => {
    // User has one Teacher (if user is a teacher)
    User.hasOne(models.Teacher, { 
        foreignKey: "userId", 
        onDelete: "CASCADE"
    });
    
    // User has one Student (if user is a student)
    User.hasOne(models.Student, { 
        foreignKey: "userId", 
        onDelete: "CASCADE"
    });
};

export default User;