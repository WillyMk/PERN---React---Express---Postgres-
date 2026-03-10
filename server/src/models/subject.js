import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const Subject = sequelize.define("subject", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false},
});

// Define associations
Subject.associate = (models) => {
    // Subject belongs to many Teachers (Many-to-Many through TeacherSubject)
    Subject.belongsToMany(models.Teacher, { 
        through: "TeacherSubject", 
        foreignKey: "subjectId",
        as: "teachers" 
    });
    
    // Subject has many Marks
    Subject.hasMany(models.Marks, { 
        foreignKey: "subjectId", 
        onDelete: "CASCADE",
        as: "marks" 
    });
};

export default Subject;