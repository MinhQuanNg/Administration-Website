import asyncHandler from 'express-async-handler';
import User from '../../models/userModel.js';
import Dossier from '../../models/dossierModel.js';
import Product from '../../models/productModel.js';
import Criterion from '../../models/criterionModel.js';
import Task from '../../models/taskModel.js';
import { Assignment, ProductCriterion } from '../../models/joinModels.js';
import { Op } from '@sequelize/core';

import * as sampleApi from './sample.js';

import { STATUS, DATA_ENTRY_DURATION } from 'common/constants/database.js'
import Equipment from '../../models/equipmentModel.js';

export const getProducts = asyncHandler(async (req, res) => {
  Product.findAll({
      attributes: ['name', 'id']
  }).then((products) => {
      res.status(200).json(products)
  }).catch((error) => {
      res.status(400).json({ message: 'No matching product\n' + error })
  });
})

export const getDossiers = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const dossierOptions = {
    include: [
      {
        model: User,
        as: 'intakeEmployeeDetails',
        attributes: ['firstName', 'lastName', 'photo']
      },
      {
        model: Product,
        through: {
          attributes: ['sampleCount']
        },
        attributes: ['id', 'name'],
      }
    ]
  };

  if (id) {
    try {
      const dossier = await Dossier.findByPk(id, dossierOptions);

      await updateDossierData(dossier);

      res.status(200).json(dossier);
    } catch (error) {
      res.status(400).json({ message: 'No matching dossier\n' + error });
    }
  } else {
    try {
      const dossiers = await Dossier.findAll({
        where: {
          ...req.query
        },
        include: dossierOptions.include,
      });

      const updatedDossiers = await Promise.all(dossiers.map(async (dossier) => {
        await updateDossierData(dossier);
        return dossier;
      }));

      if (updatedDossiers.length === 1) {
        res.status(200).json(updatedDossiers[0]);
      } else {
        res.status(200).json(updatedDossiers);
      }
    } catch (error) {
      res.status(400).json({ message: 'No matching dossier\n' + error });
    }
  }
})

export const createDossier = asyncHandler(async (req, res) => {
  const { products, ...dossierData } = req.body;

  dossierData.intakeEmployee = req.user; // id extracted from token
  const dossier = await Dossier.create(dossierData);

  const productInstances = await Product.findAll({
    where: {
      id: {
        [Op.in]: products.map(product => product.id)
      }
    },
    include: {
      model: Criterion,
      through: {
        attributes: []
      },
      attributes: ['id', 'name']
    }
  });

  await Promise.all(productInstances.map(async (product) => {
    await dossier.addProduct(product.id, { through: { sampleCount: products.find(product => product.id).sampleCount } });
}));

  return Promise.all(productInstances.map(async (product) => {
    const criteria = await product.getCriteria();
    return Promise.all(criteria.map(async (criterion) => {
      const task = await Task.create({
        dossierId: dossier.id,
        productId: product.id,
        criterionId: criterion.id,
      });
  
      await sampleApi.addToQueue(task);
    }));
  })).then(async () => {
    await sampleApi.requestSampleForFirstTasks(dossier.id);

    res.status(201).json({ message: 'Dossier created' });
  }).catch((error) => {
    res.status(400).json({ message: 'Failed to create dossier:\n' + error });
  })
})

export const deleteDossier = asyncHandler(async (req, res) => {
  Dossier.findByPk(req.params.id)
  .then(async (dossier) => {
      await dossier.destroy();
      res.json({ message: 'Dossier deleted' });
  }).catch((error) => {
      res.status(404).json({ message: 'Dossier not found.' });
  })
})

export const getUsers = asyncHandler(async (req, res) => {
  const attributes = ['id', 'firstName', 'lastName', 'photo']
  const { id } = req.query;

  if (id) {
      return User.findByPk(id, {
        attributes: attributes
      })
      .then((user) => {
          res.status(200).json(user);
      }).catch((error) => {
          res.status(404).json({ message: 'User not found' });
      })
  }

  User.findAll({
      attributes: attributes,
      where: {
          ...req.query
      }
  })
  .then((users) => {
      res.status(200).json(users);
  }).catch((error) => {
      res.status(400).json({ message: 'No matching user\n' + error });
  })
})

export const getTasks = asyncHandler(async (req, res) => {
  const { user, id, ...otherQueryParams } = req.query;

  const taskOptions = {
    include: [
      {
        model: User,
        through: { model: Assignment, attributes: ['createdAt'] },
        attributes: ['id', 'firstName', 'lastName', 'photo'],
        order: [['Assignment', 'createdAt', 'ASC']],
        ...(user && { where: { id: user } }) // Conditionally add the where clause
      },
      {
        model: Criterion,
        as: 'criterionDetails',
        attributes: ['name']
      },
      {
        model: Product,
        as: 'productDetails',
        attributes: ['name']
      }
    ]
  };

  const getProductCriterion = async (task) => {
    const product_criterion = await ProductCriterion.findOne({
      where: {
        productId: task.productId,
        criterionId: task.criterionId
      },
      include: {
          model: Equipment,
          attributes: ['code', 'minRole']
      },
      attributes: ['sampleBatchId', 'inspectionOrder', 'maxAssignees', 'duration']
    });

    return product_criterion;
  };

  if (id) {
    return Task.findByPk(id, taskOptions)
      .then(async (task) => {
        task.dataValues.criterionSpecs = await getProductCriterion(task);
        res.status(200).json([task]);
      }).catch((error) => {
        res.status(400).json({ message: 'No matching task\n' + error });
      })
  }

  const whereClause = { ...otherQueryParams };
  Task.findAll({
    where: whereClause,
    include: taskOptions.include
  }).then(async (tasks) => {
      await Promise.all(tasks.map(async (task) => {
        task.dataValues.criterionSpecs = await getProductCriterion(task);
      }));
      res.status(200).json(tasks);
  }).catch((error) => {
    res.status(400).json({ message: 'No matching task\n' + error });
  });
})

export const checkUnstartedTasks = asyncHandler(async (req, res) => {
  const { user } = req.query;

  Task.count({
    where: {
      status: STATUS.NOT_STARTED,
      isActive: true,
    },
    include: {
      model: User,
      through: {
        model: Assignment,
        attributes: []
      },
      where: {
        id: user
      }
    }
  }).then((count) => {
    if (count > 0) {
      // timestamp response to trigger notification hook on frontend
      res.status(200).json({ hasUnstartedTasks: true, timestamp: new Date() });
    } else {
      res.status(200).json({ hasUnstartedTasks: false });
    }
  }).catch((error) => {
    console.log(error);
    res.status(400).json({ message: 'Failed to count unstarted tasks\n' + error });
  });
})

export const addTaskAssignees = asyncHandler(async (req, res) => {
  const { dossierId, taskId, assignees } = req.body;

  const addAssignees = async (tasks) => {
    try {
      await Promise.all(tasks.map(async (task) => {
        await task.addUsers(assignees);
      }));
      res.status(200).json({ message: 'Assignees added' });
    } catch (error) {
      res.status(400).json({ message: 'Assignees not added\n' + error });
    }
  };

  if (dossierId) {
    const tasks = await Task.findAll({
      where: {
        dossierId: dossierId
      }
    });
    await addAssignees(tasks);
  } else if (Array.isArray(taskId)) {
    const tasks = await Task.findAll({
      where: {
        id: {
          [Op.in]: taskId
        }
      }
    });
    await addAssignees(tasks);
  } else {
    const task = await Task.findByPk(taskId);
    await task.addUsers(assignees).then(() => {
      res.status(200).json({ message: 'Assignees added' });
    }).catch((error) => {
      res.status(400).json({ message: 'Assignees not added\n' + error });
    });
  }
});

export const removeTaskAssignee = asyncHandler(async (req, res) => {
  const { dossierId, taskId, assignee } = req.body;

  if (dossierId) {
    const tasks = await Task.findAll({
      where: {
          dossierId: dossierId
      }
    })

    tasks.map(async (task) => {
      Assignment.destroy({
        where: {
          taskId: task.id,
          userId: assignee
        }
      })
    })
  } else {
    Assignment.destroy({
      where: {
        taskId: taskId,
        userId: assignee
      }
    })
  }

  res.status(200).json({ message: 'Assignee removed' });
})

export const updateDossierStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  updateDossierStatusHelper(id, status)
  .then(() => {
      res.status(200).json({ message: 'Dossier status updated' })
  }).catch((error) => {
      res.status(404).json({ message: 'Dossier not found' })
  })
})

const getTaskDuration = async (task) => {
  const { duration } = await ProductCriterion.findOne({
    where: {
      productId: task.productId,
      criterionId: task.criterionId
    }
  });

  return duration;
}

export const updateTaskStatus = asyncHandler(async (req, res) => {
  const { id, status } = req.body;

  Task.findByPk(id)
  .then(async (task) => {
      await task.update({ status: status, 
        ...(status === STATUS.COMPLETED && { completedAt: new Date() })
      });

      if (status === STATUS.COMPLETED) {
        await sampleApi.releaseSample(task);
      } else if (status === STATUS.PENDING) {
        const now = new Date();
        const totalDurationInMilis = (await getTaskDuration(task) + DATA_ENTRY_DURATION) * 60000;
        const deadline = new Date(now.getTime() + totalDurationInMilis);

        await task.update({ 
          deadline: deadline,
          startedAt: now
        });

        setTimeout(() => {
          Task.findByPk(id).then((task) => {
            if (task.status === STATUS.PENDING) {
              task.update({ status: STATUS.LATE });
            }
          });          
        }, totalDurationInMilis);
      }

      // update dossier status if all tasks are completed
      Task.findAll({
          where: {
              dossierId: task.dossierId
          }
      }).then(async (tasks) => {
          const newStatus = getNewStatus(tasks);
          
          updateDossierStatusHelper(task.dossierId, newStatus).then(() => {
              res.status(200).json({ message: 'Task and dossier statuses updated', refetch: true });
          })
      }).catch((error) => {
          res.status(400).json('Failed to update task or dossier', error);
      })
  }).catch((error) => {
      return res.status(404).json({ message: 'Task not updated', error });
  })
})

const getNewStatus = (tasks) => {
  const dossierLate = tasks.some(task => task.status === STATUS.LATE);
  if (dossierLate) {
    return STATUS.LATE
  }
  
  const dossierCompleted = tasks.every(task => task.status === STATUS.COMPLETED);
  if (dossierCompleted) {
    return STATUS.COMPLETED;
  }
  
  const dossierStarted = tasks.some(task => task.status !== STATUS.NOT_STARTED);
  if (dossierStarted) {
    return STATUS.PENDING;
  } else {
    return STATUS.NOT_STARTED;
  }
}

const updateDossierStatusHelper = async (dossierId, status) => {
  Dossier.findByPk(dossierId)
  .then((dossier) => {
      if (status != dossier.status)
        dossier.update({ status: status, completedAt: status === STATUS.COMPLETED ? new Date() : null })
  }).catch((error) => {
      throw new Error('Dossier not found')
  })
}

export const updateTask = asyncHandler(async (req, res) => {
  if (req.body.assignees) {
    req.body.taskId = req.params.id;
    return addTaskAssignees(req, res);
  }

  if (req.body.status) {
    return updateTaskStatus(req, res);
  }

  Task.findByPk(req.params.id)
  .then((task) => {
      task.update(req.body)
      res.json({ message: 'Task updated' })
  }).catch((error) => {
      res.status(404).json({ message: 'Task not found' })
  })
})

export const updateDossier = asyncHandler(async (req, res) => {
  if (req.body.assignees) {
    req.body.dossierId = req.params.id;
    return addTaskAssignees(req, res);
  }

  if (req.body.status) {
    return updateDossierStatus(req, res);
  }

  Dossier.findByPk(req.params.id)
  .then((dossier) => {
      dossier.update(req.body)
      res.json({ message: 'Dossier updated' })
  }).catch((error) => {
      res.status(404).json({ message: 'Dossier not found' })
  })
})

const calculateTaskCounts = async (dossierId) => {
  const taskCount = await Task.count({
    where: {
      dossierId: dossierId
    }
  });

  const completedTaskCount = await Task.count({
    where: {
      dossierId: dossierId,
      status: STATUS.COMPLETED
    }
  });

  const pendingTaskCount = await Task.count({
    where: {
      dossierId: dossierId,
      status: STATUS.PENDING
    }
  });

  return { taskCount, completedTaskCount, pendingTaskCount };
}

const updateDossierData = async (dossier) => {
  async function fetchAssignedUsers(dossierId) {
    const users = await User.findAll({
      include: {
        model: Task,
        through: {
          model: Assignment,
        },
        where: {
          dossierId: dossierId
        },
        attributes: []
      },
      attributes: ['id', 'firstName', 'lastName', 'photo'],
      order: [[Task, Assignment, 'createdAt', 'ASC']]
    });

    return users;
  }

  const users = await fetchAssignedUsers(dossier.id);
  dossier.dataValues.assignees = users;

  const taskCounts = await calculateTaskCounts(dossier.id);
  dossier.dataValues.progress = taskCounts;
}