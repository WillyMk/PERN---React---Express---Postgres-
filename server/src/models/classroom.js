import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const ClassRoom = sequelize.define("classroom", {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: { type: Sequelize.STRING, allowNull: false},
    level: { type: Sequelize.INTEGER, allowNull: false},
    capacity: { type: Sequelize.INTEGER, allowNull: false}
})

// Define associations
ClassRoom.associate = (models) => {
    // ClassRoom has many Students
    ClassRoom.hasMany(models.Student, { 
        foreignKey: "classroomId", 
        onDelete: "SET NULL",
        as: "students" 
    });
    
    // ClassRoom belongs to many Teachers (Many-to-Many through TeacherClassRoom)
    ClassRoom.belongsToMany(models.Teacher, { 
        through: "TeacherClassRoom", 
        foreignKey: "classroomId",
        as: "teachers" 
    });
};

export default ClassRoom;