
import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';
import User from './userModel.js';

const Dossier = sq.define("dossier", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  
    referenceId: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'reference_id',
    },

    branch: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'branch',
    },

    intakeEmployee: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        columnName: 'intake_employee',
    },

    collectionDeadline: {
        type: DataTypes.DATE,
        allowNull: false,
        columnName: 'collection_deadline',
    },
    
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
        columnName: 'dossier_deadline',
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'overall_status',
        defaultValue: 'Chưa bắt đầu',
    },

    images: {
        type: DataTypes.ARRAY(DataTypes.BLOB),
        allowNull: true,
        columnName: 'image',
    },

    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        columnName: 'completedAt',
    },
});

// Define the association
Dossier.belongsTo(User, {
    as: 'intakeEmployeeDetails',
    foreignKey: 'intakeEmployee'
});
User.hasMany(Dossier, {
    as: 'dossiers',
    foreignKey: 'intakeEmployee'
});

Dossier.sync(
    {alter: true}
)
  .then(() => {
    console.log('Dossier model synced (no schema changes)');
  })
  .catch((error) => console.error('Error syncing model:', error));

export default Dossier;