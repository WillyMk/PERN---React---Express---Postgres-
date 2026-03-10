import Sequelize from "sequelize";
import sequelize from "../config/database.js";

const AcademicTerm = sequelize.define('semester', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    year: { type: Sequelize.INTEGER, allowNull: false, unique: false},
    term: { type: Sequelize.ENUM("TERM 1", "TERM 2", "TERM 3"), allowNull: false}
    
});

// Define associations
AcademicTerm.associate = (models) => {
    // AcademicTerm has many Marks
    AcademicTerm.hasMany(models.Marks, { 
        foreignKey: "termId", 
        onDelete: "CASCADE",
        // as: "marks" 
    });
};

export default AcademicTerm;