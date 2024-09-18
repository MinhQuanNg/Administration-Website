
import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';

const Product = sq.define("product", {
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

    collectionMethod: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    minSampleCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
}, 
// {
//   schema: 'public',
//   tableName: 'user'
// }
);

Product.sync(
  { alter: true }
)
  .then(() => {
    console.log('Product model synced (no schema changes)');
  })
  .catch((error) => console.error('Error syncing model:', error));

export default Product;