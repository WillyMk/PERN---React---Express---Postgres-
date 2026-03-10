import sequelize from "../config/database.js";
import { Sequelize } from "sequelize";

const Student = sequelize.define("student", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  admissionNumber: { type: Sequelize.STRING, unique: true, allowNull: false },
  isBoarding: { type: Sequelize.BOOLEAN, defaultValue: false },
  graduates: { type: Sequelize.BOOLEAN, defaultValue: false },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  dormitoryId: {
    type: Sequelize.INTEGER,
    allowNull: true, // because only boarding students have dorms
  },

  classroomId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Define associations
Student.associate = (models) => {
  // Student belongs to User
  Student.belongsTo(models.User, {
    foreignKey: "userId",
    as: "user",
    attributes: ["id", "name", "email"],
  });

  // Student belongs to Dormitory (if boarding)
  Student.belongsTo(models.Dormitory, {
    foreignKey: "dormitoryId",
    as: "dormitory",
  });

  // Student belongs to ClassRoom
  Student.belongsTo(models.ClassRoom, {
    foreignKey: "classroomId",
    as: "classroom",
  });

  // Student has many Marks
  Student.hasMany(models.Marks, {
    foreignKey: "studentId",
    onDelete: "CASCADE",
    // as: "marks"
  });
};

export default Student;
