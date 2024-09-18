import { SampleQueue } from '../../models/queueModels.js';
import { ProductCriterion } from '../../models/joinModels.js';
import Task from '../../models/taskModel.js';

import * as equipmentApi from './equipment.js';

export const addToQueue = async (task) => {
    try {
        const { sampleBatchId, inspectionOrder } = await getSampleDetails(task);

        await SampleQueue.create({
            taskId: task.id,
            dossierId: task.dossierId,
            sampleBatchId: sampleBatchId,
            position: inspectionOrder,
        });

        console.log('Task added to sample queue successfully');
    } catch (error) {
        console.error('Failed to add task to queue');
    }
}

const getSampleDetails = async (task) => {
    return ProductCriterion.findOne({
        where: {
            productId: task.productId,
            criterionId: task.criterionId,
        },
        attributes: ['sampleBatchId', 'inspectionOrder'],
    }).then(result => result.dataValues)
    .catch(error => {
        console.error('Failed to get sample details:', error);
        throw error;
    });
}

const requestSample = async (task) => {
    try {
        await SampleQueue.destroy({
            where: {
                taskId: task.id,
            }
        });

        await equipmentApi.requestEquipment(task);

        console.log('Sample requested successfully');
    } catch (error) {
        console.error('Failed to request sample:', error);
    }
}

export const releaseSample = async (task) => {
    try {
        await equipmentApi.releaseEquipment(task);

        console.log('Sample released successfully');

        const sampleDetails = await getSampleDetails(task);

        await SampleQueue.findAll({
            where: { 
                sampleBatchId: sampleDetails.sampleBatchId,
                dossierId: task.dossierId,
                position: sampleDetails.inspectionOrder + 1, // only allow next consecutive task to be released
            },
        }).then(async (nextPositions) => {
            // If there is a next task in the queue, request sample for it
            await Promise.all(nextPositions.map(async (nextPosition) => {
                const nextTask = await Task.findByPk(nextPosition.taskId);
                requestSample(nextTask);
            }));
        });

    } catch (error) {
        console.error('Failed to release sample:', error);
    }
}

export const requestSampleForFirstTasks = async (dossierId) => {
    const firstPositions = await SampleQueue.findAll({
        where: {
            position: 1,
            dossierId: dossierId,
        }
    });

    Promise.all(firstPositions.map(async (firstPosition) => {
        const task = await Task.findByPk(firstPosition.taskId);
        requestSample(task);
    })).catch(error => {
        console.error('Failed to request sample for first tasks:', error);
    });
}