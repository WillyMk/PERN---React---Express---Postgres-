import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const TeacherDuty = sequelize.define("teacherDuty", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    day: { type: Sequelize.ENUM("Monday", "Tuesday", "Wednesday", "Thursday", "Friday"), allowNull: false }
});

// Define associations
TeacherDuty.associate = (models) => {
    // TeacherDuty belongs to many Teachers (Many-to-Many through TeacherDutyAssignment)
    TeacherDuty.belongsToMany(models.Teacher, { 
        through: "TeacherDutyAssignment", 
        foreignKey: "dutyId",
        as: "assignedTeachers" 
    });
};

export default TeacherDuty;