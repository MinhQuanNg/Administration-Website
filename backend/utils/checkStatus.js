import cron from 'node-cron';
import Dossier from '../models/dossierModel.js';
import Task from '../models/taskModel.js';
import { STATUS } from 'common/constants/database.js'
import { Op } from '@sequelize/core'

// Function to check status
const checkStatus = async () => {
  try {
    const currentDate = new Date();

    // Check Task status
    const tasks = await Task.findAll({
        where: {
            status: {
                [Op.ne]: STATUS.COMPLETED
            }
        },
        include: {
            model: Dossier,
            as: 'dossier',
            // include id to update dossier status
            attributes: ['id', 'status', 'deadline']
        }});
    
    tasks.forEach(task => {
      const { status: overallStatus, deadline: overallDeadline} = task.dossier;
      
      console.log(`Task ${task.id} deadline: ${task.deadline}, overall deadline: ${overallDeadline}`);
      if (task.deadline && task.deadline < currentDate || overallDeadline < currentDate) {
        console.log(`Task ${task.id} is not completed by the deadline.`);
        task.update({
            status: STATUS.LATE
        })

        // Update dossier status
        if (overallStatus != STATUS.LATE) {
          task.dossier.update({
              status: STATUS.LATE
          })
        }
      }
    });
  } catch (error) {
    console.error('Error checking status:', error);
  }
};

export const startStatusCheckScheduler = () => {
  // Schedule the checkStatus function to run every day at midnight
  // cron.schedule('* * * * *', () => { // for testing, run every minute
  cron.schedule('0 0 * * *', () => {
    console.log('Running daily status check...');
    checkStatus();
  });

  console.log('Status check scheduler started.');
};