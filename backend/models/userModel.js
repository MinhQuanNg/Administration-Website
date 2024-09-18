
import { sq } from '../config/db.js';
import { DataTypes } from '@sequelize/core';
import bcrypt from 'bcrypt';

const User = sq.define("user", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
    },

    passhash: {
      type: DataTypes.STRING,
    },

    role: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: {
            args: [['admin', 'trained', 'untrained']],
            msg: 'Value must be one of: admin, trained, untrained'
        }
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    photo: {
      type: DataTypes.BLOB,
      allowNull: true,
    },
}, 
// {
//   schema: 'public',
//   tableName: 'user'
// }
);

User.sync(
  {
    alter: true,
  }
)
  .then(() => {
    console.log('User model synced (no schema changes)');
  })
  .catch((error) => console.error('Error syncing model:', error));

User.prototype.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.passhash);
}

export default User