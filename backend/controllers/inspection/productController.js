import asyncHandler from 'express-async-handler'
// import { ProductCriterion } from '../../models/joinModels.js'
import Product from '../../models/productModel.js'

export const getRequiredSampleCount = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // const sampleCount = await ProductCriterion.count({
    //     distinct: true,
    //     col: 'sampleBatchId',
    //     where: { productId: id },
    // });

    const { minSampleCount } = await Product.findByPk(id);

    res.status(200).json({ sampleCount: minSampleCount });
});