import { Sequelize } from "sequelize";
import sequelize from "../config/database.js";

const Marks = sequelize.define("marks", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  examName: { type: Sequelize.STRING, allowNull: false },
  score: { type: Sequelize.FLOAT, allowNull: false },
  studentId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  subjectId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  termId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

// Define associations
Marks.associate = (models) => {
  // Marks belongs to Student
  Marks.belongsTo(models.Student, {
    foreignKey: "studentId",
  });

  // Marks belongs to Subject
  Marks.belongsTo(models.Subject, {
    foreignKey: "subjectId",
  });

  // Marks belongs to AcademicTerm
  Marks.belongsTo(models.AcademicTerm, {
    foreignKey: "termId",
  });
};

export default Marks;
