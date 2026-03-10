import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const Teacher = sequelize.define("teacher", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    employeeNumber: { type: Sequelize.STRING, unique: true},
     userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
})

// Define associations
Teacher.associate = (models) => {
    // Teacher belongs to User
    Teacher.belongsTo(models.User, { 
        foreignKey: "userId",
        as: "user",
        attributes: ['id', 'name', "email"]
    });
    
    // Teacher has many Subjects (Many-to-Many through TeacherSubject)
    Teacher.belongsToMany(models.Subject, { 
        through: "TeacherSubject", 
        foreignKey: "teacherId",
        as: "subjects" 
    });
    
    // Teacher has many Duties (Many-to-Many through TeacherDutyAssignment)
    Teacher.belongsToMany(models.TeacherDuty, { 
        through: "TeacherDutyAssignment", 
        foreignKey: "teacherId",
        as: "duties" 
    });
    
    // Teacher has many ClassRooms (Many-to-Many through TeacherClassRoom)
    Teacher.belongsToMany(models.ClassRoom, { 
        through: "TeacherClassRoom", 
        foreignKey: "teacherId",
        as: "assignedClasses" 
    });
};

export default Teacher;