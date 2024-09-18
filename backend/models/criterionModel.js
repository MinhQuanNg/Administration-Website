
import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';

const Criterion = sq.define("criterion", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    requirementLevel: {
      type: DataTypes.TEXT,
      allowNull: false,
    },    

    method: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
}, 
{
    schema: 'public',
    tableName: 'criteria'
}
);

Criterion.sync(
    { alter: true }
)
  .then(() => {
    console.log('Criterion model synced (no schema changes)');
  })
  .catch((error) => console.error('Error syncing model:', error));

export default Criterion;