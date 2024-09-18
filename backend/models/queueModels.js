import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';
import Task from './taskModel.js';
import Equipment from './equipmentModel.js';

const EquipmentQueue = sq.define('equipment_queue', {
    taskId: {
        primaryKey: true,
        type: DataTypes.INTEGER, 
        references: { 
            model: Task, 
            key: 'id' 
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    equipmentId: { 
        type: DataTypes.INTEGER, 
        references: { 
            model: Equipment, 
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    position: { type: DataTypes.INTEGER, allowNull: false }
});

EquipmentQueue.sync({ alter: true })
.then(() => {
    console.log('EquipmentQueue model synced (no schema changes)');
}).catch((error) => console.error('Error syncing model:', error));


const SampleQueue = sq.define('sample_queue', {
    taskId: { 
        primaryKey: true,
        type: DataTypes.INTEGER, 
        references: { 
            model: Task, 
            key: 'id' 
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    dossierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sampleBatchId: { 
        type: DataTypes.INTEGER, 
        allowNull: false 
    },
    position: { type: DataTypes.INTEGER, allowNull: false }
});

SampleQueue.sync({ alter: true })
.then(() => {
    console.log('SampleQueue model synced (no schema changes)');
}).catch((error) => console.error('Error syncing model:', error));


export { EquipmentQueue, SampleQueue };