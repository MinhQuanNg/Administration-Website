import { sq } from './config/db.js';
import { createAccount } from './utils/createAccount.js';

const testDbConnection = async () => {
  try {
    await sq.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

// testDbConnection();

createAccount({
  id: 127,
  username: 'gojo',
  password: 'gojo123',
  role: 'trained',
  firstName: 'Satoru',
  lastName: 'Gojo'
})