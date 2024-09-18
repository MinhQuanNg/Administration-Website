import { sq } from '../config/db.js'
import { DataTypes } from '@sequelize/core';
import User from './userModel.js'
import Task from './taskModel.js'
import Product from './productModel.js'
import Criterion from './criterionModel.js'
import Dossier from './dossierModel.js'
import Equipment from './equipmentModel.js'

export const Assignment = sq.define('assignment', {
    taskId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
});

export const ProductCriterion = sq.define('product_criterion', {
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    criterionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    equipmentId: {
        type: DataTypes.INTEGER,
        references: {
            model: Equipment,
            key: 'id'
        },
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
        allowNull: true
    },
    sampleBatchId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    inspectionOrder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    maxAssignees: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duration: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: false,
        defaultValue: 30
    },
}, {
    tableName: 'product_criteria'
});

export const DossierProduct = sq.define('dossier_product', {
    dossierId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    productId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    sampleCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
});
  
Task.belongsToMany(User, {
    through: Assignment,
    foreignKey: {
        name: 'taskId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    otherKey: {
        name: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});
User.belongsToMany(Task, {
    through: Assignment,
    foreignKey: {
        name: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    otherKey: {
        name: 'taskId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

Product.belongsToMany(Criterion, {
    through: ProductCriterion,
    foreignKey: {
        name: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    otherKey: {
        name: 'criterionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});
Criterion.belongsToMany(Product, {
    through: ProductCriterion,
    foreignKey: {
        name: 'criterionId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    otherKey: {
        name: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

Dossier.belongsToMany(Product, {
    through: DossierProduct,
    foreignKey: {
        name: 'dossierId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    otherKey: {
        name: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});
Product.belongsToMany(Dossier, {
    through: DossierProduct,
    foreignKey: {
        name: 'productId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    },
    otherKey: {
        name: 'dossierId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    }
});

ProductCriterion.belongsTo(Equipment, {
    foreignKey: {
        name: 'equipmentId',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    }
});

Equipment.hasMany(ProductCriterion, {
    foreignKey: {
        name: 'equipmentId',
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
    }
});

Assignment.sync({alter: true});
ProductCriterion.sync({alter: true});
DossierProduct.sync({alter: true});