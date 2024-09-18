import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';

const Equipment = sq.define("equipment", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    notes: {
        type: DataTypes.STRING,
        allowNull: true
    },
    minRole: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['admin', 'trained', 'untrained']],
                msg: 'Value must be one of: admin, trained, untrained'
            }
        },
        defaultValue: 'untrained'
    },
    freeQuantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
},
{
    hooks: {
        beforeCreate: (instance) => {
            if (instance.freeQuantity === 0) {
                instance.freeQuantity = instance.quantity; // TODO: Check if this is the correct default value
            }
        }
    }
}
);


Equipment.sync(
    // {force: true}
    { alter: true }
)
.then(() => {
    console.log('Equipment model synced (no schema changes)');
})
.catch((error) => console.error('Error syncing model:', error));


export default Equipment;