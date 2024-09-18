
import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';
import Dossier from './dossierModel.js';
import Product from './productModel.js';
import Criterion from './criterionModel.js';

const Task = sq.define("task", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  
    dossierId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Dossier,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        columnName: 'dossier_id',
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        columnName: 'product_id',
    },

    criterionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Criterion,
            key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        columnName: 'criterion',
    },

    status: {
        type: DataTypes.STRING,
        allowNull: false,
        columnName: 'status',
        defaultValue: 'Chưa bắt đầu',
    },

    startedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        columnName: 'startedAt',
    },
    
    completedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        columnName: 'completedAt',
    },

    images: {
        type: DataTypes.ARRAY(DataTypes.BLOB),
        allowNull: true,
        columnName: 'images',
    },

    notes: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        columnName: 'notes',
    },

    deadline: {
        type: DataTypes.DATE,
        allowNull: true,
        columnName: 'deadline',
    },

    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        columnName: 'isActive',
        defaultValue: false,
    }
},
{
    hooks: {
        beforeDestroy: async (task, options) => {
            // import here to avoid circular dependency
            const { releaseEquipment } = await import('../controllers/inspection/equipment.js');
            
            // pass true to indicate that task is being deleted
            await releaseEquipment(task, true);
        }
    }
}
);

// Define associations
Task.belongsTo(Dossier, { foreignKey: 'dossierId', as: 'dossierDetails' });
Task.belongsTo(Product, { foreignKey: 'productId', as: 'productDetails' });
Task.belongsTo(Criterion, { foreignKey: 'criterionId', as: 'criterionDetails' });

Dossier.hasMany(Task, { foreignKey: 'dossierId', sourceKey: 'id' });
Product.hasMany(Task, { foreignKey: 'productId', sourceKey: 'id' });
Criterion.hasMany(Task, { foreignKey: 'criterionId', sourceKey: 'id' });

Dossier.addHook('beforeDestroy', async (dossier, options) => {
    // Fetch all tasks associated with the dossier
    const tasks = await Task.findAll({ where: { dossierId: dossier.id } });

    // Delete each task individually to trigger beforeDestroy hook
    await Promise.all(tasks.map(async (task) => {
        await task.destroy();
        console.log('Task destroyed', task.id);
    }));
});

Task.sync(
    // {force: true}
    { alter: true }
)
  .then(() => {
    console.log('Task model synced (no schema changes)');
  })
  .catch((error) => console.error('Error syncing model:', error));


export default Task;