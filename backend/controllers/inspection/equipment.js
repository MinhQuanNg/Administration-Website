import Equipment from '../../models/equipmentModel.js';
import { EquipmentQueue } from '../../models/queueModels.js';
import Task from '../../models/taskModel.js';
import { sq } from '../../config/db.js';
import { ProductCriterion } from '../../models/joinModels.js';

export const requestEquipment = async (task) => {
    await sq.transaction(async (transaction) => {
        const taskId = task.id;

        try {
            const equipmentId = await getEquipmentId(transaction, task);
            if (!equipmentId) {
                console.log('No equipment found for task');
                await markTaskAsActive(transaction, taskId);
                return;
            };

            const equipment = await lockEquipment(transaction, equipmentId);

            if (equipment.freeQuantity > 0) {
                await decreaseFreeQuantity(transaction, equipment);
                await markTaskAsActive(transaction, taskId);
                console.log('Equipment allocated successfully');
            } else {
                await addToQueue(transaction, taskId, equipmentId);
                console.log('Added to queue');
            }
        } catch (error) {
            await transaction.rollback();
            console.error('Failed to request equipment:', error);
            return;
        }
    });
}

export const releaseEquipment = async (task, deletingTask = false) => {
    console.log('Releasing equipment for task', task.id);
    await sq.transaction(async (transaction) => {
        const taskId = task.id;

        try {
            const task = await findTaskById(transaction, taskId);

            if (!task.isActive) {
                console.log('No equipment allocated for task', taskId);
                return;
            };

            await markTaskAsInactive(transaction, task);

            const equipmentId = await getEquipmentId(transaction, task);

            if (!equipmentId) {
                console.log('No equipment found for task', taskId);
                return;
            };

            await increaseFreeQuantity(transaction, equipmentId);

            if (!deletingTask) {
                const nextTaskInQueue = await findNextTaskInQueue(transaction, equipmentId);

                if (nextTaskInQueue) {
                    await allocateEquipmentToTask(transaction, nextTaskInQueue);
                }
            }

            console.log('Equipment released successfully for', taskId);
        } catch (error) {
            await transaction.rollback();
            console.error('Failed to release equipment:', error);
        }
    });
}


// Helper functions

const getEquipmentId = async (transaction, task) => {
    try {
        const result = await ProductCriterion.findOne({
            where: {
                productId: task.productId,
                criterionId: task.criterionId
            },
            attributes: ['equipmentId'],
            transaction // Ensure this query is part of the transaction
        });

        return result ? result.dataValues.equipmentId : null;
    } catch (error) {
        console.error('Failed to get equipment ID:', error);
        throw error; // Re-throw the error to trigger transaction rollback
    }
}

const lockEquipment = async (transaction, equipmentId) => {
    return await Equipment.findByPk(equipmentId, {
        lock: transaction.LOCK.UPDATE,
        transaction
    });
}

const decreaseFreeQuantity = async (transaction, equipment) => {
    await equipment.update({ freeQuantity: equipment.freeQuantity - 1 }, { transaction });
}

const markTaskAsActive = async (transaction, taskId) => {
    await Task.update(
        { isActive: true },
        { where: { id: taskId }, transaction }
    );
}

const addToQueue = async (transaction, taskId, equipmentId) => {
    const queuePosition = await EquipmentQueue.max('position', {
        where: { equipmentId: equipmentId },
        transaction
    }) || 0;

    await EquipmentQueue.create({
        taskId: taskId,
        equipmentId: equipmentId,
        position: queuePosition + 1
    }, { transaction });
}

const findTaskById = async (transaction, taskId) => {
    const task = await Task.findByPk(taskId, { transaction });
    if (!task) throw new Error('Task not found');
    return task;
}

const markTaskAsInactive = async (transaction, task) => {
    await task.update({ isActive: false }, { transaction });
}

const increaseFreeQuantity = async (transaction, equipmentId) => {
    const equipment = await Equipment.findByPk(equipmentId, { transaction });
    await equipment.update({ freeQuantity: equipment.freeQuantity + 1 }, { transaction });
}

const findNextTaskInQueue = async (transaction, equipmentId) => {
    return await EquipmentQueue.findOne({
        where: { equipmentId: equipmentId },
        order: [['position', 'ASC']],
        transaction
    });
}

const allocateEquipmentToTask = async (transaction, nextTaskInQueue) => {
    const equipment = await lockEquipment(transaction, nextTaskInQueue.equipmentId);

    if (equipment.freeQuantity > 0) {
        await decreaseFreeQuantity(transaction, equipment);
        await markTaskAsActive(transaction, nextTaskInQueue.taskId);
        console.log('Equipment allocated successfully to', nextTaskInQueue.taskId);

        await EquipmentQueue.destroy({ where: { taskId: nextTaskInQueue.taskId }, transaction });
    }
}